"use client";

import { useState } from "react";

const Shield = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4.5 5v6.1c0 5.1 3.2 9.3 7.5 10.9 4.3-1.6 7.5-5.8 7.5-10.9V5L12 2Z"/><path d="m8.7 12 2.1 2.1 4.6-4.7"/></svg>
);

const candidates = [
  { initials: "AN", name: "Ada Nwosu", role: "President", color: "#d7f3e7" },
  { initials: "TK", name: "Tunde Kola", role: "President", color: "#e8e2ff" },
  { initials: "ZM", name: "Zainab Musa", role: "President", color: "#ffe8d8" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState<"vote" | "confirm" | "done">("vote");

  const closeDemo = () => { setDemoOpen(false); setStep("vote"); };

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Votiqra home"><img src="/votiqra-logo.svg" alt=""/>votiqra</a>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open navigation">☰</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#features">Features</a><a href="#security">Security</a><a href="#how">How it works</a><a href="/pricing">Pricing</a>
        </nav>
        <div className="nav-actions"><a className="text-btn" href="/login">Sign in</a><a className="button small" href="/register">Create election</a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-gallery" aria-hidden="true"><div className="hero-frame frame-one"/><div className="hero-frame frame-two"/><div className="hero-frame frame-three"/></div>
        <div className="floating-ballots" aria-hidden="true">{["✓","●","✓","●","✓"].map((n,i)=><span key={i} style={{"--i":i} as React.CSSProperties}>{n}</span>)}</div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow"><Shield/> Trusted digital elections <i>LIVE</i></div>
          <h1>Every voice.<br/><em>Verified.</em></h1>
          <p>Run secure, transparent elections for any organization—from setup to certified results, all in one modern platform.</p>
          <div className="hero-actions"><a className="button" href="#pricing">Create an election <span>→</span></a><button className="watch" onClick={() => setDemoOpen(true)}><span>▶</span> Try voting demo</button></div>
          <div className="trust-row"><span><b>256-bit</b> encryption</span><span><b>One voter</b> one vote</span><span><b>Live totals</b> transparent turnout</span></div>
        </div>
        <div className="phone hero-phone" aria-label="Votiqra mobile ballot preview">
          <div className="phone-top"><span>9:41</span><span>● ◔ ▰</span></div>
          <div className="app-head"><span className="mini-mark">V</span><span>Student Union Election<br/><small>Voting ends in 02:14:32</small></span></div>
          <div className="progress"><i style={{width:"34%"}}/><span>1 of 3</span></div>
          <p className="position">PRESIDENT • LIVE</p><h3>Choose one candidate</h3>
          {candidates.slice(0,2).map((c,i)=><div className={i===0?"candidate chosen":"candidate"} key={c.name}><span style={{background:c.color}}>{c.initials}</span><div><b>{c.name}</b><small>View manifesto</small></div><i>{i===0?"✓":""}</i></div>)}
          <button className="app-button">Continue <span>→</span></button>
          <div className="secure-note"><Shield/> Your vote is encrypted and anonymous</div>
        </div>
        <div className="live-pill"><span/> 1,248 votes secured today</div>
      </section>

      <section className="proof"><p>Built for elections that matter</p><div><span>Student unions</span><span>Professional bodies</span><span>Cooperatives</span><span>Associations</span><span>Corporate boards</span></div></section>

      <section className="section" id="features">
        <div className="section-title"><span>ONE PLATFORM. EVERY ROLE.</span><h2>Designed for trust at every level.</h2><p>Purpose-built experiences for platform owners, election administrators, and every eligible voter.</p></div>
        <div className="role-grid">
          <article><i className="role-icon">⌘</i><span className="tag">SUPER ADMIN</span><h3>Control the platform</h3><p>Manage organizations, plans, voter limits, billing, system health, and immutable audit records.</p><ul><li>Organization oversight</li><li>Subscription controls</li><li>Global security monitoring</li></ul></article>
          <article className="featured"><i className="role-icon">◇</i><span className="tag">ORGANIZATION ADMIN</span><h3>Run elections simply</h3><p>Upload voters, create secure tokens, add positions and candidates, schedule polls, and certify results.</p><ul><li>Bulk voter import</li><li>Candidate & ballot builder</li><li>Live turnout—not live choices</li></ul></article>
          <article><i className="role-icon">✓</i><span className="tag">ELIGIBLE VOTER</span><h3>Vote with confidence</h3><p>Use the organization’s chosen verification method, vote once per position, and receive a private receipt.</p><ul><li>Organization-controlled verification</li><li>Guided position-by-position ballot</li><li>Live transparent totals</li></ul></article>
        </div>
      </section>

      <section className="security" id="security"><div><span className="section-kicker">SECURITY BY DESIGN</span><h2>Fairness isn’t a feature.<br/>It’s the foundation.</h2><p>Votiqra separates voter identity from ballot choices, applies tenant isolation, and records critical actions in tamper-evident audit logs.</p><div className="security-points"><span><Shield/><b>Strict eligibility</b><small>Only verified voters enter a ballot.</small></span><span><Shield/><b>Duplicate prevention</b><small>Single-use credentials stop repeat votes.</small></span><span><Shield/><b>Tenant isolation</b><small>Every organization’s data stays separated.</small></span><span><Shield/><b>Transparent audits</b><small>Critical election actions are traceable.</small></span></div></div><div className="audit-card"><div className="audit-head"><span><i/>Election integrity</span><b>Protected</b></div><div className="integrity-score"><strong>100%</strong><small>ballots verified</small></div><div className="audit-line"><span>Eligible voters</span><b>2,500</b></div><div className="audit-line"><span>Votes cast</span><b>1,842</b></div><div className="audit-line"><span>Duplicate attempts blocked</span><b>3</b></div><div className="audit-line"><span>Last audit checkpoint</span><b>Just now</b></div><p>✓ No vote data can be altered from this screen</p></div></section>

      <section className="section how" id="how"><div className="section-title"><span>FROM SETUP TO RESULTS</span><h2>Launch an election in four steps.</h2></div><div className="steps"><article><b>01</b><h3>Create your organization</h3><p>Choose a voter capacity plan and verify your organization.</p></article><article><b>02</b><h3>Build the election</h3><p>Add positions, candidates, schedules, and result rules.</p></article><article><b>03</b><h3>Invite eligible voters</h3><p>Upload a voter list or issue secure single-use tokens.</p></article><article><b>04</b><h3>Vote & certify</h3><p>Track turnout, close polls, audit, and publish certified results.</p></article></div></section>

      <section className="pricing-home" id="pricing"><div className="section-title"><span>SIMPLE PAY-PER-ELECTION PRICING</span><h2>Choose the capacity you need.</h2><p>Every plan includes secure ballots, organization-controlled verification, live totals, audit trails, and Paystack checkout.</p></div><div className="price-grid"><article><small>STARTER</small><h3>₦20,000</h3><p>Up to <b>1,000 voters</b></p><a className="price-cta" href="/pricing">Choose Starter →</a></article><article><small>GROWTH</small><h3>₦35,000</h3><p>Up to <b>3,000 voters</b></p><a className="price-cta" href="/pricing">Choose Growth →</a></article><article className="popular"><span>MOST POPULAR</span><small>PROFESSIONAL</small><h3>₦50,000</h3><p>Up to <b>5,000 voters</b></p><a className="button" href="/pricing">Choose Professional →</a></article><article><small>ENTERPRISE</small><h3>Custom</h3><p>More than <b>5,000 voters</b></p><a className="price-cta" href="/pricing">Contact sales →</a></article></div><p className="pricing-note">Need more capacity? Add voters from ₦8 each, subject to a ₦10,000 minimum top-up. <a href="/pricing">Compare every plan</a></p></section>

      <section className="download" id="download"><div><span>VOTING, RIGHT IN YOUR HAND</span><h2>The ballot goes where your voters go.</h2><p>Fast, accessible, and designed for secure participation on any modern phone.</p><div className="store-row"><button><b>◉</b><span>Download on the<strong>App Store</strong></span></button><button><b>▶</b><span>GET IT ON<strong>Google Play</strong></span></button></div></div><img src="/onboarding-voting.png" alt="People voting securely with the Votiqra mobile app"/></section>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#top"><img src="/votiqra-logo.svg" alt=""/>votiqra</a><p>Secure, transparent elections for every organization.</p><span>📍 Takur Site, Dutse, Jigawa State</span></div><div><h4>Product</h4><a href="#features">Features</a><a href="#security">Security</a><a href="/pricing">Pricing</a><a href="#download">Mobile app</a></div><div><h4>Company</h4><a href="#how">How it works</a><a href="mailto:bamiebot@gmail.com">Contact</a><a href="#">Privacy</a><a href="#">Terms</a></div><div><h4>Follow Votiqra</h4><div className="socials"><a href="https://x.com/bamietech_dev" target="_blank" rel="noreferrer" aria-label="Votiqra on X">𝕏</a><a href="https://wa.me/2349129324801" target="_blank" rel="noreferrer" aria-label="Contact Votiqra on WhatsApp">◉</a></div><p className="footer-contact">bamiebot@gmail.com</p></div></div><div className="footer-bottom"><small>© 2026 Votiqra. All rights reserved.</small><span>Built for fair elections.</span></div></footer>

      {demoOpen && <div className="modal-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&closeDemo()}><div className="demo-modal" role="dialog" aria-modal="true" aria-label="Voting demo"><button className="close" onClick={closeDemo}>×</button>{step==="vote"&&<><span className="tag">DEMO BALLOT • 1 OF 3</span><h2>Vote for President</h2><p>Select one candidate. You can review before submitting.</p><div className="demo-list">{candidates.map((c,i)=><button key={c.name} className={selected===i?"selected":""} onClick={()=>setSelected(i)}><span style={{background:c.color}}>{c.initials}</span><div><b>{c.name}</b><small>{c.role} candidate</small></div><i>{selected===i?"✓":""}</i></button>)}</div><button className="button wide" onClick={()=>setStep("confirm")}>Review choice →</button></>}{step==="confirm"&&<><span className="tag">CONFIRM YOUR CHOICE</span><h2>Ready to submit?</h2><p>Your demo vote for President:</p><div className="confirm-choice"><span style={{background:candidates[selected].color}}>{candidates[selected].initials}</span><b>{candidates[selected].name}</b></div><button className="button wide" onClick={()=>setStep("done")}>Submit demo vote</button><button className="back" onClick={()=>setStep("vote")}>← Change selection</button></>}{step==="done"&&<div className="done"><span>✓</span><h2>Vote recorded</h2><p>Your private receipt code is <b>VQ-8A21-F7</b>. It verifies inclusion without revealing your choice.</p><button className="button wide" onClick={closeDemo}>Done</button></div>}</div></div>}
    </main>
  );
}
