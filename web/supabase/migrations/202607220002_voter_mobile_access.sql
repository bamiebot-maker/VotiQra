-- Votiqra mobile voter access RPCs
-- Run after 202607220001_initial_votiqra.sql.

begin;

create or replace function public.claim_voter_by_email()
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare matched public.voters%rowtype;
declare user_email text;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select lower(email) into user_email from public.profiles where id=auth.uid();
  if user_email is null or user_email='' then raise exception 'Your account has no verified email'; end if;

  select * into matched from public.voters
  where lower(email)=user_email
    and status in ('invited','eligible')
    and (auth_user_id is null or auth_user_id=auth.uid())
  order by created_at desc limit 1 for update;
  if not found then return null; end if;

  update public.voters set auth_user_id=auth.uid(), status='eligible', verified_at=coalesce(verified_at,now()) where id=matched.id;
  insert into public.audit_logs(organization_id,actor_id,action,entity_type,entity_id)
  values(matched.organization_id,auth.uid(),'voter.email_claimed','voter',matched.id::text);
  return jsonb_build_object('voter_id',matched.id,'election_id',null,'organization_id',matched.organization_id,'message','Your approved voter identity is connected.');
end;
$$;

create or replace function public.claim_voter_token(raw_token text)
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare matched_token public.voter_tokens%rowtype;
declare matched_voter public.voters%rowtype;
declare normalized text;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  normalized := upper(regexp_replace(trim(coalesce(raw_token,'')),'[^A-Za-z0-9]','','g'));
  if length(normalized)<6 then raise exception 'Invalid voting token'; end if;

  select * into matched_token from public.voter_tokens
  where token_hash=encode(digest(normalized,'sha256'),'hex')
    and used_at is null and revoked_at is null and (expires_at is null or expires_at>now())
  for update;
  if not found or matched_token.voter_id is null then raise exception 'Token is invalid, expired, or already used'; end if;

  select * into matched_voter from public.voters where id=matched_token.voter_id for update;
  if matched_voter.auth_user_id is not null and matched_voter.auth_user_id<>auth.uid() then raise exception 'Token belongs to another voter account'; end if;
  if matched_voter.status='suspended' then raise exception 'This voter has been suspended'; end if;

  update public.voters set auth_user_id=auth.uid(),status='eligible',verified_at=coalesce(verified_at,now()) where id=matched_voter.id;
  insert into public.election_voters(election_id,voter_id,is_eligible) values(matched_token.election_id,matched_voter.id,true)
  on conflict(election_id,voter_id) do update set is_eligible=true;
  update public.voter_tokens set used_at=now() where id=matched_token.id;
  insert into public.audit_logs(organization_id,actor_id,action,entity_type,entity_id,metadata)
  values(matched_voter.organization_id,auth.uid(),'voter.token_claimed','election',matched_token.election_id::text,jsonb_build_object('voter_id',matched_voter.id));
  return jsonb_build_object('voter_id',matched_voter.id,'election_id',matched_token.election_id,'organization_id',matched_voter.organization_id,'message','Voting access verified.');
end;
$$;

revoke execute on function public.claim_voter_by_email() from public,anon;
grant execute on function public.claim_voter_by_email() to authenticated;
revoke execute on function public.claim_voter_token(text) from public,anon;
grant execute on function public.claim_voter_token(text) to authenticated;

-- A linked voter may read the public identity of their own organization.
drop policy if exists organizations_voter_read on public.organizations;
create policy organizations_voter_read on public.organizations for select using (
  exists (
    select 1 from public.voters v
    where v.organization_id=organizations.id and v.auth_user_id=auth.uid()
  )
);

-- Voting completion belongs to an election, not to the voter globally. Keeping the
-- voter eligible allows the same approved identity to participate in future elections.
create or replace function public.cast_ballot(target_election uuid, selections jsonb)
returns table(receipt_code text, submitted_at timestamptz)
language plpgsql security definer set search_path = public
as $$
declare voter_record public.voters%rowtype; ballot_id uuid; election_record public.elections%rowtype;
declare item jsonb; pos_id uuid; cand_id uuid; expected_positions integer; selected_positions integer;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into election_record from public.elections where id=target_election for update;
  if not found or election_record.status <> 'live' then raise exception 'Election is not live'; end if;
  if election_record.starts_at is not null and now() < election_record.starts_at then raise exception 'Election has not started'; end if;
  if election_record.ends_at is not null and now() >= election_record.ends_at then raise exception 'Election has ended'; end if;

  select v.* into voter_record from public.voters v
  join public.election_voters ev on ev.voter_id=v.id and ev.election_id=target_election
  where v.organization_id=election_record.organization_id and v.auth_user_id=auth.uid()
    and v.status in ('eligible','voted') and ev.is_eligible for update of v;
  if not found then raise exception 'You are not eligible for this election'; end if;
  if exists(select 1 from public.ballots where election_id=target_election and voter_id=voter_record.id)
    then raise exception 'Vote already submitted'; end if;
  if jsonb_typeof(selections) <> 'array' then raise exception 'Selections must be an array'; end if;

  select count(*) into expected_positions from public.positions where election_id=target_election;
  select count(distinct (x->>'position_id')) into selected_positions from jsonb_array_elements(selections) x;
  if not election_record.allow_abstain and selected_positions <> expected_positions
    then raise exception 'A selection is required for every position'; end if;

  insert into public.ballots(election_id, voter_id) values(target_election, voter_record.id)
  returning id, ballots.receipt_code, ballots.submitted_at into ballot_id, receipt_code, submitted_at;

  for item in select * from jsonb_array_elements(selections) loop
    pos_id := (item->>'position_id')::uuid;
    cand_id := nullif(item->>'candidate_id','')::uuid;
    if not exists(select 1 from public.positions where id=pos_id and election_id=target_election)
      then raise exception 'Invalid position'; end if;
    if cand_id is not null and not exists(select 1 from public.candidates where id=cand_id and position_id=pos_id and is_active)
      then raise exception 'Invalid candidate'; end if;
    if cand_id is null and not election_record.allow_abstain then raise exception 'Abstention is disabled'; end if;
    insert into public.votes(ballot_id,election_id,position_id,candidate_id)
    values(ballot_id,target_election,pos_id,cand_id);
  end loop;

  update public.election_voters set voted_at=now()
  where election_id=target_election and voter_id=voter_record.id;
  insert into public.audit_logs(organization_id, actor_id, action, entity_type, entity_id, metadata)
  values(election_record.organization_id, auth.uid(), 'ballot.submitted', 'election', target_election::text,
    jsonb_build_object('receipt_code', receipt_code));
  return next;
end;
$$;

revoke execute on function public.cast_ballot(uuid,jsonb) from public,anon;
grant execute on function public.cast_ballot(uuid,jsonb) to authenticated;

commit;
