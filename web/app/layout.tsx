import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://votiqra.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Votiqra — Secure Online Voting for Organizations",
    template: "%s | Votiqra",
  },
  description: "Run secure, transparent online elections with verified voters, live totals, tamper-evident audit trails, and organization-controlled authentication.",
  keywords: ["online voting system", "secure election software", "digital voting Nigeria", "organization elections", "student union voting", "electronic voting platform"],
  authors: [{ name: "Votiqra" }],
  creator: "Votiqra",
  publisher: "Votiqra",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Votiqra",
    title: "Votiqra — Secure Online Voting for Organizations",
    description: "Create fair, transparent and auditable elections for associations, schools, unions, cooperatives and companies.",
    images: [{ url: "/hero-voter-group.png", width: 1586, height: 992, alt: "Organizations voting securely with Votiqra" }],
  },
  twitter: { card: "summary_large_image", title: "Votiqra — Every Voice. Verified.", description: "Secure online elections with verified voters and transparent results.", images: ["/hero-voter-group.png"] },
  other: {
    "theme-color": "#06251d",
  },
  icons: {
    icon: "/votiqra-logo.svg",
    shortcut: "/votiqra-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
