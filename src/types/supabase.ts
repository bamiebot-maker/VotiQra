export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  platform_role: 'user' | 'super_admin';
};

export type Voter = {
  id: string;
  organization_id: string;
  auth_user_id: string | null;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  status: 'invited' | 'eligible' | 'suspended' | 'voted';
};

export type Election = {
  id: string;
  organization_id: string;
  title: string;
  description: string | null;
  status: 'draft' | 'scheduled' | 'live' | 'paused' | 'closed' | 'archived';
  starts_at: string | null;
  ends_at: string | null;
  organization_name?: string;
  voted_at?: string | null;
};

export type ClaimAccessResult = {
  voter_id: string;
  election_id: string | null;
  organization_id: string;
  message: string;
};
