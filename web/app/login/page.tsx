"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { AppLogo } from "@/components/AppLogo";
import { getSupabase } from "@/lib/supabase-browser";

function LoginContent() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { getSupabase().auth.getSession().then(({ data }) => { if (data.session) routeUser(data.session.user.id); }); }, []);

  async function routeUser(userId: string) {
    const supabase = getSupabase();
    const { data: profile } = await supabase.from("profiles").select("platform_role").eq("id", userId).single();
    if (profile?.platform_role === "super_admin") return router.replace("/super-admin");
    const { count } = await supabase.from("organization_members").select("organization_id", { count: "exact", head: true }).eq("user_id", userId);
    router.replace(search.get("next") || (count ? "/app" : "/onboarding"));
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setLoading(true);
    const { data, error: authError } = await getSupabase().auth.signInWithPassword({ email: email.trim(), password });
    if (authError || !data.user) { setError(authError?.message || "Unable to sign in"); setLoading(false); return; }
    await routeUser(data.user.id);
  }

  return <main className="auth-page">
    <section className="auth-story"><AppLogo /><div><span className="auth-kicker">EVERY VOICE. VERIFIED.</span><h1>Welcome back to fair elections.</h1><p>Manage voters, run secure ballots and publish transparent results from one trusted workspace.</p></div><small>Protected by Supabase Auth and tenant-level access controls.</small></section>
    <section className="auth-form-wrap"><form className="auth-card" onSubmit={submit}><div className="mobile-logo"><AppLogo dark /></div><span className="step-label">SECURE SIGN IN</span><h2>Access your workspace</h2><p>Use the email registered with your organization.</p>{error && <div className="form-error">{error}</div>}<label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@organization.com" autoComplete="email" required /></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="current-password" required /></label><div className="form-row"><label className="check"><input type="checkbox" /> Remember me</label><Link href="/forgot-password">Forgot password?</Link></div><button className="button wide" disabled={loading}>{loading ? "Signing in…" : "Sign in securely"}</button><p className="auth-switch">New to Votiqra? <Link href="/register">Create an organization</Link></p></form></section>
  </main>;
}

export default function LoginPage() {
  return <Suspense fallback={<main className="portal-loading"><span className="loader" /><p>Preparing secure sign in…</p></main>}><LoginContent /></Suspense>;
}
