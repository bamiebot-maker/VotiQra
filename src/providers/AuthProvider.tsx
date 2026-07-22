import type { Session } from '@supabase/supabase-js';
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile, Voter } from '@/types/supabase';

type AuthContextValue = {
  session: Session | null;
  profile: Profile | null;
  voter: Voter | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (fullName: string, email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshAccess: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [voter, setVoter] = useState<Voter | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAccess = useCallback(async (activeSession: Session | null): Promise<void> => {
    if (!activeSession?.user) {
      setProfile(null);
      setVoter(null);
      return;
    }
    const userId = activeSession.user.id;
    const [{ data: profileData }, { data: voterData }] = await Promise.all([
      supabase.from('profiles').select('id,email,full_name,platform_role').eq('id', userId).maybeSingle(),
      supabase.from('voters').select('id,organization_id,auth_user_id,email,phone,full_name,status').eq('auth_user_id', userId).limit(1).maybeSingle(),
    ]);
    setProfile(profileData as Profile | null);
    setVoter(voterData as Voter | null);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await loadAccess(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      void loadAccess(nextSession);
    });
    return () => listener.subscription.unsubscribe();
  }, [loadAccess]);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    profile,
    voter,
    loading,
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      return error?.message ?? null;
    },
    signUp: async (fullName, email, password) => {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: fullName.trim() } },
      });
      return error?.message ?? null;
    },
    signOut: async () => { await supabase.auth.signOut(); },
    refreshAccess: async () => { await loadAccess(session); },
  }), [loadAccess, loading, profile, session, voter]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
