# Votiqra Web

Production web platform for Votiqra: landing page, pricing, Supabase authentication, organization onboarding, organization admin portal, and protected super-admin portal.

## Vercel deployment

1. Import `bamiebot-maker/VotiQra` into Vercel.
2. Set **Root Directory** to `web`.
3. Keep Framework Preset as **Next.js**.
4. Add every variable shown in `.env.example` under Project Settings > Environment Variables.
5. Set `NEXT_PUBLIC_SITE_URL` to the production domain shown in `.env.example` and deploy.
6. Set the Supabase Site URL to `https://voti-qra.vercel.app` and add `https://voti-qra.vercel.app/**` under Authentication > URL Configuration.

The Paystack secret key is server-only and must never be placed in `NEXT_PUBLIC_*`, the mobile app, or GitHub.
