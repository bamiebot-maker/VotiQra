"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AppLogo } from "@/components/AppLogo";
import { getSupabase } from "@/lib/supabase-browser";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent) { e.preventDefault(); setError(""); setLoading(true); const { data, error: authError } = await getSupabase().auth.signUp({ email: form.email.trim(), password: form.password, options: { data: { full_name: form.name }, emailRedirectTo: `${location.origin}/onboarding` } }); if (authError) setError(authError.message); else setMessage(data.session ? "Account created. Continue to organization setup." : "Check your email to confirm your account, then sign in."); setLoading(false); }
  return <main className="auth-page"><section className="auth-story register-story"><AppLogo /><div><span className="auth-kicker">START FREE</span><h1>Your first 50 voters are on us.</h1><p>Create one election with up to two positions, verify eligible voters and share auditable results.</p></div><small>No card required • Upgrade only when you need more capacity</small></section><section className="auth-form-wrap"><form className="auth-card" onSubmit={submit}><div className="mobile-logo"><AppLogo dark /></div><span className="step-label">CREATE ACCOUNT</span><h2>Start your organization</h2><p>You&apos;ll name your organization on the next step.</p>{error && <div className="form-error">{error}</div>}{message && <div className="form-success">{message}</div>}<label>Your full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Organization administrator" required /></label><label>Work email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="admin@organization.com" required /></label><label>Create password<input type="password" minLength={8} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="8+ characters" required /></label><button className="button wide" disabled={loading}>{loading ? "Creating account…" : "Create free account"}</button><p className="terms">By continuing, you agree to the Terms and Privacy Policy.</p><p className="auth-switch">Already registered? <Link href="/login">Sign in</Link></p></form></section></main>;
}
