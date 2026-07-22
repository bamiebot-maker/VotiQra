"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase-browser";
import { AppLogo } from "./AppLogo";

type Profile = { full_name: string | null; email: string; platform_role: "user" | "super_admin" };

export function PortalShell({ children, superAdmin = false }: { children: React.ReactNode; superAdmin?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      const { data: row } = await supabase.from("profiles").select("full_name,email,platform_role").eq("id", data.user.id).single();
      if (!row) return router.replace("/login");
      if (superAdmin && row.platform_role !== "super_admin") return router.replace("/app");
      setProfile(row as Profile);
      setReady(true);
    });
  }, [pathname, router, superAdmin]);

  async function signOut() {
    await getSupabase().auth.signOut();
    router.replace("/login");
  }

  if (!ready) return <main className="portal-loading"><span className="loader" /><p>Securing your workspace…</p></main>;

  const links = superAdmin
    ? [["/super-admin", "Overview"], ["/super-admin/organizations", "Organizations"], ["/super-admin/payments", "Payments"], ["/super-admin/audit", "Audit logs"]]
    : [["/app", "Overview"], ["/app/elections", "Elections"], ["/app/voters", "Voters"], ["/app/results", "Results"], ["/app/settings", "Settings"]];

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <AppLogo />
        <div className="workspace-label"><small>{superAdmin ? "PLATFORM" : "ORGANIZATION"}</small><strong>{superAdmin ? "Votiqra Control" : "Your workspace"}</strong></div>
        <nav>{links.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}</nav>
        <div className="portal-user"><span>{(profile?.full_name || profile?.email || "U").slice(0, 1).toUpperCase()}</span><div><strong>{profile?.full_name || "Account"}</strong><small>{profile?.email}</small></div><button onClick={signOut} aria-label="Sign out">↗</button></div>
      </aside>
      <div className="portal-main">{children}</div>
    </div>
  );
}
