"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PortalShell } from "@/components/PortalShell";
import { getSupabase } from "@/lib/supabase-browser";

type Stats = { org: string; plan: string; voters: number; elections: number; limit: number };
type Membership = { organization_id: string; organizations: { name: string } | null };
type Subscription = { voter_limit: number; plans: { name: string } | null };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ org: "Your organization", plan: "Free", voters: 0, elections: 0, limit: 50 });

  useEffect(() => {
    (async () => {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from("organization_members").select("organization_id,organizations(name)").eq("user_id", user.id).limit(1).single();
      const membership = data as unknown as Membership | null;
      if (!membership) return;

      const [{ count: voters }, { count: elections }, { data: subData }] = await Promise.all([
        supabase.from("voters").select("id", { count: "exact", head: true }).eq("organization_id", membership.organization_id),
        supabase.from("elections").select("id", { count: "exact", head: true }).eq("organization_id", membership.organization_id),
        supabase.from("subscriptions").select("voter_limit,plans(name)").eq("organization_id", membership.organization_id).in("status", ["free", "active"]).limit(1).single(),
      ]);
      const subscription = subData as unknown as Subscription | null;
      setStats({
        org: membership.organizations?.name || "Your organization",
        plan: subscription?.plans?.name || "Free",
        voters: voters || 0,
        elections: elections || 0,
        limit: subscription?.voter_limit || 50,
      });
    })();
  }, []);

  return <PortalShell><header className="dash-header"><div><span className="step-label">ORGANIZATION ADMIN</span><h1>{stats.org}</h1><p>Here&apos;s what&apos;s happening with your elections.</p></div><Link className="button" href="/app/elections/new">Create election <b>＋</b></Link></header><section className="stat-grid"><article><span>ELIGIBLE VOTERS</span><strong>{stats.voters}<small> / {stats.limit}</small></strong><div className="meter"><i style={{width:`${Math.min(100,stats.voters/stats.limit*100)}%`}}/></div></article><article><span>ELECTIONS</span><strong>{stats.elections}<small> active</small></strong><p>Free plan supports one election</p></article><article><span>PLAN</span><strong>{stats.plan}</strong><Link href="/pricing">View upgrade options →</Link></article><article className="secure-stat"><span>SECURITY</span><strong>Protected</strong><p>RLS policies and audit logging active</p></article></section><section className="dash-panels"><article><div className="panel-title"><div><span>RECENT ELECTIONS</span><h2>Election activity</h2></div><Link href="/app/elections">View all</Link></div><div className="empty-state"><span>✓</span><h3>Ready for your first election</h3><p>Create positions, add candidates and invite verified voters.</p><Link href="/app/elections/new">Create election</Link></div></article><article><div className="panel-title"><div><span>GET STARTED</span><h2>Setup checklist</h2></div><b>1 of 4</b></div><ol className="checklist"><li className="done">Create organization <b>✓</b></li><li>Set up an election <b>2</b></li><li>Upload eligible voters <b>3</b></li><li>Review and launch <b>4</b></li></ol></article></section></PortalShell>;
}
