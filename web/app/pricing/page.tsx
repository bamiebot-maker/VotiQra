/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pay-per-election pricing for secure Votiqra elections, from 1,000 voters to enterprise-scale organizations.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  { name: "Starter", price: "₦20,000", voters: "Up to 1,000 voters", note: "Ideal for clubs and small associations", featured: false },
  { name: "Growth", price: "₦35,000", voters: "Up to 3,000 voters", note: "For unions, schools and growing bodies", featured: false },
  { name: "Professional", price: "₦50,000", voters: "Up to 5,000 voters", note: "For major institutional elections", featured: true },
  { name: "Enterprise", price: "Custom", voters: "More than 5,000 voters", note: "Tailored capacity and priority support", featured: false },
];

export default function PricingPage() {
  return <main className="pricing-page"><header className="inner-nav"><a className="brand" href="/"><img src="/votiqra-logo.svg" alt=""/>votiqra</a><nav><a href="/#features">Features</a><a href="/#security">Security</a><a href="/pricing" aria-current="page">Pricing</a></nav><a className="button small" href="/#pricing">Create election</a></header><section className="pricing-hero"><span>TRANSPARENT PRICING</span><h1>One election.<br/>One clear price.</h1><p>Pay only when you are ready to launch. No monthly commitment and no hidden platform fee.</p></section><section className="pricing-detail-grid">{plans.map(p=><article className={p.featured?"featured-plan":""} key={p.name}>{p.featured&&<span className="recommended">RECOMMENDED</span>}<small>{p.name.toUpperCase()}</small><h2>{p.price}</h2><strong>{p.voters}</strong><p>{p.note}</p><ul><li>Unlimited positions and candidates</li><li>CSV voter upload and secure tokens</li><li>Organization-controlled verification</li><li>Live turnout and vote totals</li><li>Tamper-evident audit trail</li><li>Certified result export</li></ul><a className={p.featured?"button":"outline-button"} href="mailto:hello@votiqra.com?subject=Votiqra%20plan%20enquiry">{p.name==="Enterprise"?"Contact sales":"Choose plan"}</a></article>)}</section><section className="topup"><div><span>EXTRA CAPACITY</span><h2>Grow without changing plans.</h2><p>Add eligible voters from ₦8 per voter with a ₦10,000 minimum top-up. Enterprise volume pricing is quoted separately.</p></div><a className="button" href="mailto:hello@votiqra.com?subject=Votiqra%20capacity%20enquiry">Request capacity →</a></section><section className="faq"><div className="section-title"><span>PRICING FAQ</span><h2>Questions, answered.</h2></div><div><article><h3>Is this a monthly subscription?</h3><p>No. Each plan covers one election event. This keeps costs predictable for organizations that vote periodically.</p></article><article><h3>When do we pay?</h3><p>Build and test your election first, then pay securely through Paystack before launching the live ballot.</p></article><article><h3>Can we increase voter capacity?</h3><p>Yes. Purchase a capacity top-up before the election starts. Limits cannot be reduced after launch.</p></article><article><h3>Are payment charges included?</h3><p>The displayed price is the organization’s plan price. Any applicable payment processing is handled during checkout.</p></article></div></section><footer className="compact-footer"><a className="brand" href="/"><img src="/votiqra-logo.svg" alt=""/>votiqra</a><p>Nigeria — serving organizations globally</p><div><a href="#" aria-label="X">𝕏</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="WhatsApp">◉</a></div><small>© 2026 Votiqra</small></footer></main>;
}
