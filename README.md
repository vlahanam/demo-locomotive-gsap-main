# demo-locomotive-gsap

A Next.js demo showcasing scroll-driven animation using **Locomotive Scroll v5** and **GSAP ScrollTrigger**. The primary demonstration is a horizontal scroll section with a diagonal cinematic transition into the next section.

## Tech Stack

| Package | Version |
|---|---|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| GSAP | 3.14.2 |
| Locomotive Scroll | 5.0.1 |
| Tailwind CSS | 4.x |
| TypeScript | 5.x |

## Features

- Locomotive Scroll v5 initialized client-side via dynamic import (SSR-safe)
- GSAP ScrollTrigger horizontal scroll (3-panel) with `pin` + `scrub`
- Diagonal scene fly-out / next-section fly-in transition (Phase 2 + Phase 3)
- CSS Modules for scoped component styles
- Tailwind CSS v4 with PostCSS

## Project Structure

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css        # Tailwind v4 import + CSS custom properties
│   ├── layout.tsx         # Root layout, Geist font, overflow:hidden body
│   └── page.tsx           # Client entry; initializes LocomotiveScroll, renders StoryOne
└── components/
    └── StoryOne/
        ├── index.tsx      # GSAP ScrollTrigger horizontal + transition logic
        └── styles.module.css  # Scoped CSS: .container, .section, .horizontal, .box2

public/
└── images/
    └── story-1/           # 8 travel photo assets (Vietnam, Japan)
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the Animation Works

`StoryOne` uses `useLayoutEffect` + `gsap.context` for safe cleanup.

**Phase 1 – Horizontal scroll** (duration: 1 unit)
Translates all 3 `.box2` panels left via `xPercent`.

**Phase 2 – Scene fly-out** (duration: 0.1 unit)
The entire horizontal container moves off-screen diagonally (`x: -400, y: -400`).

**Phase 3 – Next section fly-in** (duration: 0.1 unit, overlaps Phase 2)
Section 4 slides from its offset start position (`x: 400, y: 300`) to `0,0`.

ScrollTrigger config:
- `trigger`: `.container` (Section 3)
- `pin: true`, `scrub: true`
- `end`: `+= totalWidth * 2`
- `markers: true` (dev mode, visible in browser)

## Configuration Notes

- `next.config.ts` allows dev origin `mckayla-nonsymbiotical-sabra.ngrok-free.dev` (ngrok tunnel)
- Body has `overflow: hidden` — Locomotive Scroll manages scroll
- `tsconfig.json` path alias `@/*` maps to project root

## Development

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # production server
pnpm lint     # ESLint (Next.js + TypeScript rules)
```

## Known Issues / Dev Notes

- `markers: true` in ScrollTrigger is active — remove for production
- No image assets are used in `StoryOne` yet; placeholder colored divs are rendered instead
- `public/images/story-1/` contains 8 travel photos available for future use
