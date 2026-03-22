# Deployment Guide

**Last Updated**: 2026-03-22
**Project**: demo-locomotive-gsap

---

## Prerequisites

- Node.js >= 18.0.0
- pnpm (recommended) or npm/yarn

---

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Hot reload is active. GSAP `markers: true` visible in dev.

---

## Production Build

```bash
pnpm build    # compile + type-check
pnpm start    # serve on :3000
```

Before building for production:
1. Remove `markers: true` from `src/components/StoryOne/index.tsx`
2. Remove or scope the ngrok `allowedDevOrigins` in `next.config.ts`

---

## Vercel (Recommended)

1. Push repo to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Framework: Next.js (auto-detected)
4. No environment variables required
5. Deploy

Vercel handles `pnpm build` and serves the output automatically.

---

## Other Node.js Hosts

Any host supporting Node.js >= 18:

```bash
pnpm build
pnpm start          # default port 3000
PORT=8080 pnpm start  # custom port
```

---

## Static Export (Not Recommended)

This app uses `"use client"` with browser-only libraries. A static export (`next export`) would still work since there are no API routes or server-side data fetching, but `next start` is preferred for future-proofing.

---

## Environment Variables

None required for current functionality.

If extending the project, use `.env.local` for secrets (gitignored by Next.js default).

---

## ngrok Dev Tunnel

`next.config.ts` whitelists `mckayla-nonsymbiotical-sabra.ngrok-free.dev` as an allowed dev origin. This is for sharing the dev server via ngrok. Remove this for production deployments.

```bash
# Run ngrok against dev server
ngrok http 3000
```
