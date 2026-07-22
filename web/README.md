# Votiqra Web

Production web platform for Votiqra: landing page, pricing, Supabase authentication, organization onboarding, organization admin portal, and protected super-admin portal.

## Vercel deployment

1. Import `bamiebot-maker/VotiQra` into Vercel.
2. Set **Root Directory** to `web`.
3. Keep Framework Preset as **Next.js**.
4. Add every variable shown in `.env.example` under Project Settings > Environment Variables.
5. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the assigned production domain and redeploy.
6. Add the production domain and `https://your-domain.com/**` to Supabase Authentication > URL Configuration.

The Paystack secret key is server-only and must never be placed in `NEXT_PUBLIC_*`, the mobile app, or GitHub.
