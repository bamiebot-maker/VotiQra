-- Votiqra initial production schema
-- Run once in a fresh Supabase project from Dashboard > SQL Editor.

begin;

create extension if not exists pgcrypto;

create type public.platform_role as enum ('user', 'super_admin');
create type public.organization_role as enum ('owner', 'admin', 'observer');
create type public.organization_status as enum ('pending', 'active', 'suspended');
create type public.subscription_status as enum ('free', 'pending', 'active', 'past_due', 'expired', 'cancelled');
create type public.election_status as enum ('draft', 'scheduled', 'live', 'paused', 'closed', 'archived');
create type public.voter_status as enum ('invited', 'eligible', 'suspended', 'voted');
create type public.result_visibility as enum ('hidden', 'live', 'after_vote', 'after_close');
create type public.payment_status as enum ('initialized', 'success', 'failed', 'abandoned', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  avatar_url text,
  platform_role public.platform_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.plans (
  id text primary key,
  name text not null,
  price_kobo bigint not null check (price_kobo >= 0),
  voter_limit integer not null check (voter_limit > 0),
  election_limit integer not null check (election_limit > 0),
  position_limit integer not null check (position_limit > 0),
  candidates_per_position_limit integer not null check (candidates_per_position_limit >= 2),
  csv_export boolean not null default false,
  custom_branding boolean not null default false,
  priority_support boolean not null default false,
  is_public boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.plans
  (id, name, price_kobo, voter_limit, election_limit, position_limit, candidates_per_position_limit, csv_export, custom_branding, priority_support, sort_order)
values
  ('free', 'Free', 0, 50, 1, 2, 2, false, false, false, 10),
  ('starter', 'Starter', 2000000, 1000, 1, 25, 20, true, false, false, 20),
  ('growth', 'Growth', 3500000, 3000, 1, 50, 30, true, true, false, 30),
  ('professional', 'Professional', 5000000, 5000, 2, 100, 50, true, true, true, 40),
  ('enterprise', 'Enterprise', 0, 100000000, 1000, 1000, 1000, true, true, true, 50);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  logo_url text,
  primary_color text default '#10B981',
  status public.organization_status not null default 'active',
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.organization_role not null default 'admin',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  plan_id text not null references public.plans(id),
  status public.subscription_status not null,
  voter_limit integer not null check (voter_limit > 0),
  election_limit integer not null check (election_limit > 0),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  paystack_customer_code text,
  paystack_subscription_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index subscriptions_one_current_idx on public.subscriptions (organization_id)
  where status in ('free', 'pending', 'active', 'past_due');

create table public.elections (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  description text,
  status public.election_status not null default 'draft',
  starts_at timestamptz,
  ends_at timestamptz,
  result_visibility public.result_visibility not null default 'after_vote',
  allow_abstain boolean not null default false,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create table public.positions (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0,
  max_selections integer not null default 1 check (max_selections > 0),
  created_at timestamptz not null default now(),
  unique (election_id, title)
);

create table public.candidates (
  id uuid primary key default gen_random_uuid(),
  position_id uuid not null references public.positions(id) on delete cascade,
  name text not null,
  bio text,
  photo_url text,
  manifesto text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.voters (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  auth_user_id uuid references public.profiles(id) on delete set null,
  external_id text,
  email text,
  phone text,
  full_name text,
  status public.voter_status not null default 'invited',
  verified_by uuid references public.profiles(id),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (email is not null or phone is not null or external_id is not null)
);
create unique index voters_org_external_idx on public.voters (organization_id, external_id) where external_id is not null;
create unique index voters_org_email_idx on public.voters (organization_id, lower(email)) where email is not null;
create unique index voters_org_phone_idx on public.voters (organization_id, phone) where phone is not null;
create unique index voters_org_auth_idx on public.voters (organization_id, auth_user_id) where auth_user_id is not null;

create table public.election_voters (
  election_id uuid not null references public.elections(id) on delete cascade,
  voter_id uuid not null references public.voters(id) on delete cascade,
  is_eligible boolean not null default true,
  voted_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (election_id, voter_id)
);

create table public.voter_tokens (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete cascade,
  voter_id uuid references public.voters(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz,
  used_at timestamptz,
  revoked_at timestamptz,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.ballots (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete restrict,
  voter_id uuid not null references public.voters(id) on delete restrict,
  receipt_code text not null unique default encode(gen_random_bytes(12), 'hex'),
  submitted_at timestamptz not null default now(),
  unique (election_id, voter_id)
);

create table public.votes (
  id bigint generated always as identity primary key,
  ballot_id uuid not null references public.ballots(id) on delete restrict,
  election_id uuid not null references public.elections(id) on delete restrict,
  position_id uuid not null references public.positions(id) on delete restrict,
  candidate_id uuid references public.candidates(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique (ballot_id, position_id)
);

create table public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  plan_id text not null references public.plans(id),
  reference text not null unique,
  amount_kobo bigint not null check (amount_kobo >= 0),
  currency text not null default 'NGN',
  status public.payment_status not null default 'initialized',
  customer_email text not null,
  paystack_transaction_id bigint,
  paid_at timestamptz,
  verified_at timestamptz,
  raw_response jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_key text not null,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  error text,
  created_at timestamptz not null default now(),
  unique (provider, event_key)
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  organization_id uuid references public.organizations(id) on delete set null,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index elections_org_idx on public.elections (organization_id, status);
create index positions_election_idx on public.positions (election_id, sort_order);
create index candidates_position_idx on public.candidates (position_id, sort_order);
create index voters_org_idx on public.voters (organization_id, status);
create index election_voters_voter_idx on public.election_voters (voter_id, election_id);
create index votes_results_idx on public.votes (election_id, position_id, candidate_id);
create index audit_logs_org_idx on public.audit_logs (organization_id, created_at desc);

create or replace function public.set_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

create or replace function public.prevent_platform_role_escalation() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.platform_role is distinct from old.platform_role
    and auth.uid() is not null
    and not public.is_super_admin()
  then
    raise exception 'Only a super admin can change platform roles';
  end if;
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger organizations_updated_at before update on public.organizations for each row execute function public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();
create trigger elections_updated_at before update on public.elections for each row execute function public.set_updated_at();
create trigger voters_updated_at before update on public.voters for each row execute function public.set_updated_at();
create trigger payments_updated_at before update on public.payment_transactions for each row execute function public.set_updated_at();

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, platform_role)
  values (
    new.id,
    lower(coalesce(new.email, '')),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    case when lower(coalesce(new.email, '')) = 'bamiebot@gmail.com'
      then 'super_admin'::public.platform_role else 'user'::public.platform_role end
  );
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_super_admin() returns boolean
language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and platform_role = 'super_admin') $$;

create trigger protect_platform_role before update on public.profiles
for each row execute function public.prevent_platform_role_escalation();

create or replace function public.has_org_role(org_id uuid, allowed public.organization_role[]) returns boolean
language sql stable security definer set search_path = public
as $$
  select public.is_super_admin() or exists(
    select 1 from public.organization_members
    where organization_id = org_id and user_id = auth.uid() and role = any(allowed)
  )
$$;

create or replace function public.register_organization(org_name text, org_slug text)
returns uuid language plpgsql security definer set search_path = public
as $$
declare new_org_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if org_name is null or length(trim(org_name)) < 2 then raise exception 'Organization name is required'; end if;
  if org_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then raise exception 'Invalid organization slug'; end if;

  insert into public.organizations(name, slug, created_by)
  values (trim(org_name), lower(org_slug), auth.uid()) returning id into new_org_id;
  insert into public.organization_members(organization_id, user_id, role)
  values (new_org_id, auth.uid(), 'owner');
  insert into public.subscriptions(organization_id, plan_id, status, voter_limit, election_limit)
  values (new_org_id, 'free', 'free', 50, 1);
  insert into public.audit_logs(organization_id, actor_id, action, entity_type, entity_id)
  values (new_org_id, auth.uid(), 'organization.created', 'organization', new_org_id::text);
  return new_org_id;
end;
$$;

create or replace function public.enforce_plan_limits() returns trigger
language plpgsql security definer set search_path = public
as $$
declare org_id uuid; plan public.plans%rowtype; current_count integer;
begin
  if tg_table_name = 'elections' then
    org_id := new.organization_id;
  elsif tg_table_name = 'voters' then
    org_id := new.organization_id;
  elsif tg_table_name = 'positions' then
    select e.organization_id into org_id from public.elections e where e.id = new.election_id;
  elsif tg_table_name = 'candidates' then
    select e.organization_id into org_id from public.positions p join public.elections e on e.id=p.election_id where p.id=new.position_id;
  end if;

  select p.* into plan from public.subscriptions s join public.plans p on p.id=s.plan_id
  where s.organization_id=org_id and s.status in ('free','active') order by s.created_at desc limit 1;
  if plan.id is null then raise exception 'No active plan'; end if;

  if tg_table_name = 'voters' then
    select count(*) into current_count from public.voters where organization_id=org_id;
    if current_count >= (select voter_limit from public.subscriptions where organization_id=org_id and status in ('free','active') order by created_at desc limit 1)
      then raise exception 'Voter limit reached'; end if;
  elsif tg_table_name = 'elections' then
    select count(*) into current_count from public.elections where organization_id=org_id and status <> 'archived';
    if current_count >= (select election_limit from public.subscriptions where organization_id=org_id and status in ('free','active') order by created_at desc limit 1)
      then raise exception 'Election limit reached'; end if;
  elsif tg_table_name = 'positions' then
    select count(*) into current_count from public.positions where election_id=new.election_id;
    if current_count >= plan.position_limit then raise exception 'Position limit reached'; end if;
  elsif tg_table_name = 'candidates' then
    select count(*) into current_count from public.candidates where position_id=new.position_id;
    if current_count >= plan.candidates_per_position_limit then raise exception 'Candidate limit reached'; end if;
  end if;
  return new;
end;
$$;
create trigger enforce_election_limit before insert on public.elections for each row execute function public.enforce_plan_limits();
create trigger enforce_voter_limit before insert on public.voters for each row execute function public.enforce_plan_limits();
create trigger enforce_position_limit before insert on public.positions for each row execute function public.enforce_plan_limits();
create trigger enforce_candidate_limit before insert on public.candidates for each row execute function public.enforce_plan_limits();

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
    and v.status='eligible' and ev.is_eligible for update of v;
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

  update public.election_voters set voted_at=now() where election_id=target_election and voter_id=voter_record.id;
  update public.voters set status='voted' where id=voter_record.id;
  insert into public.audit_logs(organization_id, actor_id, action, entity_type, entity_id, metadata)
  values(election_record.organization_id, auth.uid(), 'ballot.submitted', 'election', target_election::text,
    jsonb_build_object('receipt_code', receipt_code));
  return next;
end;
$$;

create or replace function public.election_results(target_election uuid)
returns table(position_id uuid, position_title text, candidate_id uuid, candidate_name text, vote_count bigint)
language plpgsql stable security definer set search_path = public
as $$
declare e public.elections%rowtype; has_voted boolean;
begin
  select * into e from public.elections where id=target_election;
  if not found then raise exception 'Election not found'; end if;
  select exists(select 1 from public.ballots b join public.voters v on v.id=b.voter_id
    where b.election_id=target_election and v.auth_user_id=auth.uid()) into has_voted;
  if not public.has_org_role(e.organization_id, array['owner','admin','observer']::public.organization_role[])
    and not (e.result_visibility='live' and e.status='live')
    and not (e.result_visibility='after_vote' and has_voted)
    and not (e.result_visibility='after_close' and e.status in ('closed','archived'))
    then raise exception 'Results are not available'; end if;
  return query select p.id,p.title,c.id,c.name,count(v.id)
  from public.positions p join public.candidates c on c.position_id=p.id
  left join public.votes v on v.candidate_id=c.id and v.election_id=target_election
  where p.election_id=target_election group by p.id,p.title,c.id,c.name,p.sort_order,c.sort_order
  order by p.sort_order,c.sort_order;
end;
$$;

alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.subscriptions enable row level security;
alter table public.elections enable row level security;
alter table public.positions enable row level security;
alter table public.candidates enable row level security;
alter table public.voters enable row level security;
alter table public.election_voters enable row level security;
alter table public.voter_tokens enable row level security;
alter table public.ballots enable row level security;
alter table public.votes enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.webhook_events enable row level security;
alter table public.audit_logs enable row level security;

create policy profiles_self_read on public.profiles for select using (id=auth.uid() or public.is_super_admin());
create policy profiles_self_update on public.profiles for update using (id=auth.uid()) with check (id=auth.uid());
create policy plans_public_read on public.plans for select using (is_public or public.is_super_admin());
create policy org_member_read on public.organizations for select using (public.has_org_role(id,array['owner','admin','observer']::public.organization_role[]));
create policy org_admin_update on public.organizations for update using (public.has_org_role(id,array['owner','admin']::public.organization_role[]));
create policy memberships_member_read on public.organization_members for select using (public.has_org_role(organization_id,array['owner','admin','observer']::public.organization_role[]));
create policy memberships_admin_manage on public.organization_members for all using (public.has_org_role(organization_id,array['owner','admin']::public.organization_role[])) with check (public.has_org_role(organization_id,array['owner','admin']::public.organization_role[]));
create policy subscriptions_member_read on public.subscriptions for select using (public.has_org_role(organization_id,array['owner','admin','observer']::public.organization_role[]));
create policy elections_org_read on public.elections for select using (public.has_org_role(organization_id,array['owner','admin','observer']::public.organization_role[]) or exists(select 1 from public.voters v where v.organization_id=elections.organization_id and v.auth_user_id=auth.uid()));
create policy elections_admin_manage on public.elections for all using (public.has_org_role(organization_id,array['owner','admin']::public.organization_role[])) with check (public.has_org_role(organization_id,array['owner','admin']::public.organization_role[]));
create policy positions_read on public.positions for select using (exists(select 1 from public.elections e where e.id=election_id and (public.has_org_role(e.organization_id,array['owner','admin','observer']::public.organization_role[]) or exists(select 1 from public.voters v where v.organization_id=e.organization_id and v.auth_user_id=auth.uid()))));
create policy positions_admin_manage on public.positions for all using (exists(select 1 from public.elections e where e.id=election_id and public.has_org_role(e.organization_id,array['owner','admin']::public.organization_role[]))) with check (exists(select 1 from public.elections e where e.id=election_id and public.has_org_role(e.organization_id,array['owner','admin']::public.organization_role[])));
create policy candidates_read on public.candidates for select using (exists(select 1 from public.positions p join public.elections e on e.id=p.election_id where p.id=position_id and (public.has_org_role(e.organization_id,array['owner','admin','observer']::public.organization_role[]) or exists(select 1 from public.voters v where v.organization_id=e.organization_id and v.auth_user_id=auth.uid()))));
create policy candidates_admin_manage on public.candidates for all using (exists(select 1 from public.positions p join public.elections e on e.id=p.election_id where p.id=position_id and public.has_org_role(e.organization_id,array['owner','admin']::public.organization_role[]))) with check (exists(select 1 from public.positions p join public.elections e on e.id=p.election_id where p.id=position_id and public.has_org_role(e.organization_id,array['owner','admin']::public.organization_role[])));
create policy voters_self_or_admin_read on public.voters for select using (auth_user_id=auth.uid() or public.has_org_role(organization_id,array['owner','admin','observer']::public.organization_role[]));
create policy voters_admin_manage on public.voters for all using (public.has_org_role(organization_id,array['owner','admin']::public.organization_role[])) with check (public.has_org_role(organization_id,array['owner','admin']::public.organization_role[]));
create policy election_voters_read on public.election_voters for select using (exists(select 1 from public.voters v where v.id=voter_id and (v.auth_user_id=auth.uid() or public.has_org_role(v.organization_id,array['owner','admin','observer']::public.organization_role[]))));
create policy election_voters_admin_manage on public.election_voters for all using (exists(select 1 from public.voters v where v.id=voter_id and public.has_org_role(v.organization_id,array['owner','admin']::public.organization_role[]))) with check (exists(select 1 from public.voters v where v.id=voter_id and public.has_org_role(v.organization_id,array['owner','admin']::public.organization_role[])));
create policy tokens_admin_manage on public.voter_tokens for all using (exists(select 1 from public.elections e where e.id=election_id and public.has_org_role(e.organization_id,array['owner','admin']::public.organization_role[]))) with check (exists(select 1 from public.elections e where e.id=election_id and public.has_org_role(e.organization_id,array['owner','admin']::public.organization_role[])));
create policy ballots_receipt_read on public.ballots for select using (exists(select 1 from public.voters v where v.id=voter_id and v.auth_user_id=auth.uid()) or exists(select 1 from public.elections e where e.id=election_id and public.has_org_role(e.organization_id,array['owner','admin','observer']::public.organization_role[])));
create policy payments_admin_read on public.payment_transactions for select using (public.has_org_role(organization_id,array['owner','admin']::public.organization_role[]) or public.is_super_admin());
create policy audit_admin_read on public.audit_logs for select using (public.has_org_role(organization_id,array['owner','admin','observer']::public.organization_role[]) or public.is_super_admin());

revoke all on public.ballots, public.votes, public.webhook_events from anon, authenticated;
revoke execute on function public.cast_ballot(uuid,jsonb) from public, anon;
grant execute on function public.cast_ballot(uuid,jsonb) to authenticated;
revoke execute on function public.register_organization(text,text) from public, anon;
grant execute on function public.register_organization(text,text) to authenticated;
revoke execute on function public.election_results(uuid) from public, anon;
grant execute on function public.election_results(uuid) to authenticated;

-- Backfill profiles, including the designated super admin, if Auth users already exist.
insert into public.profiles (id, email, full_name, platform_role)
select id, lower(coalesce(email, '')),
  coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name'),
  case when lower(coalesce(email, ''))='bamiebot@gmail.com'
    then 'super_admin'::public.platform_role else 'user'::public.platform_role end
from auth.users
on conflict (id) do update set
  email=excluded.email,
  platform_role=case when excluded.email='bamiebot@gmail.com'
    then 'super_admin'::public.platform_role else public.profiles.platform_role end;

commit;
