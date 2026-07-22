import Link from "next/link";

export function AppLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link className={`portal-brand ${dark ? "dark" : ""}`} href="/">
      <img src="/votiqra-logo.svg" alt="" />
      <span>votiqra</span>
    </Link>
  );
}
