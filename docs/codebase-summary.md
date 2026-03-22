# Codebase Summary

**Last Updated**: 2026-03-22
**Version**: 0.1.0
**Project**: demo-locomotive-gsap

---

## Overview

Minimal Next.js 16 / React 19 demo integrating Locomotive Scroll v5 and GSAP ScrollTrigger. One page, one feature component (`StoryOne`), no backend, no database, no API routes.

---

## Project Structure

```
demo-locomotive-gsap-main/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css          # Tailwind v4 import, CSS custom properties, dark mode vars
│   │   ├── layout.tsx           # Root layout: Geist fonts, h-full, overflow:hidden body
│   │   └── page.tsx             # Home page: LocomotiveScroll init + <StoryOne />
│   └── components/
│       └── StoryOne/
│           ├── index.tsx        # GSAP ScrollTrigger animation (horizontal + transition)
│           └── styles.module.css  # Scoped styles: .container .section .horizontal .box2
├── public/
│   ├── images/story-1/          # 8 travel JPEGs (unused placeholders)
│   └── *.svg                    # Next.js default SVGs
├── docs/                        # Project documentation (this directory)
├── next.config.ts               # allowedDevOrigins for ngrok
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml               # Lock file
├── pnpm-workspace.yaml          # pnpm workspace config
├── postcss.config.mjs           # @tailwindcss/postcss plugin
├── tsconfig.json                # TypeScript strict config, @/* path alias
├── eslint.config.mjs            # ESLint flat config (Next.js + TypeScript)
├── CLAUDE.md                    # Claude Code project instructions
└── README.md                    # Project overview
```

---

## Source Files

### `src/app/layout.tsx`
Root layout component.
- Loads Geist Sans and Geist Mono from `next/font/google`
- Applies `h-full antialiased` to `<html>`, `min-h-full flex flex-col overflow-hidden` to `<body>`
- `overflow: hidden` is required for Locomotive Scroll scroll container management

### `src/app/page.tsx`
Home page — marked `"use client"`.
- Dynamically imports `locomotive-scroll` inside `useEffect` (prevents SSR execution)
- Instantiates `new LocomotiveScroll()` with default config
- Renders `<StoryOne />`

### `src/components/StoryOne/index.tsx`
Core animation component — marked `"use client"`.
- Three refs: `containerRef` (Section 3 trigger), `horizontalRef` (sliding panels), `nextSectionRef` (Section 4)
- Uses `useLayoutEffect` + `gsap.context` for effect scope and cleanup
- Registers `ScrollTrigger` plugin
- Initial state: Section 4 offset to `{ x: 400, y: 300 }` via `gsap.set`
- GSAP timeline pinned to `containerRef`, `scrub: true`, `end: += totalWidth * 2`
  - Phase 1: All `.box2` children slide `xPercent: -100 * (n-1)` (horizontal carousel)
  - Phase 2: `horizontalRef` flies off diagonally `{ x: -400, y: -400 }`
  - Phase 3: `nextSectionRef` flies in from offset to `{ x: 0, y: 0 }` (overlaps Phase 2 by `-=0.1`)
- Returns 5 sections stacked vertically; Section 3 is the horizontal container

### `src/components/StoryOne/styles.module.css`
Component-scoped CSS:
- `.container` — `width: 100%; background: aliceblue`
- `.section` — `height: 100vh; position: relative; overflow: hidden`
- `.horizontal` — `display: flex; height: 100%` (horizontal scroll container)
- `.box2` — `min-width: 100vw; height: 100vh; flex-shrink: 0; display: flex; align-items: center; justify-content: center`

### `src/app/globals.css`
- `@import "tailwindcss"` (Tailwind v4 syntax)
- CSS custom properties: `--background` / `--foreground`
- `@theme inline` block mapping to Tailwind tokens
- Dark mode via `prefers-color-scheme` media query

---

## Dependencies

### Runtime (production)
| Package | Version | Purpose |
|---------|---------|---------|
| gsap | ^3.14.2 | Animation engine + ScrollTrigger |
| locomotive-scroll | ^5.0.1 | Native scroll behavior |
| next | 16.2.1 | React framework |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM renderer |

### Dev
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4 | Utility CSS |
| @tailwindcss/postcss | ^4 | PostCSS integration |
| typescript | ^5 | Type checking |
| @types/react | ^19 | React types |
| @types/react-dom | ^19 | ReactDOM types |
| @types/node | ^20 | Node types |
| eslint | ^9 | Linter |
| eslint-config-next | 16.2.1 | Next.js lint rules |

---

## Configuration

### `tsconfig.json`
- Target: ES2017, strict mode, `noEmit: true`
- Module resolution: `bundler`
- Path alias: `@/*` → `./src` (root)
- Incremental compilation enabled

### `next.config.ts`
- `allowedDevOrigins`: ngrok tunnel domain whitelisted

### `postcss.config.mjs`
- Single plugin: `@tailwindcss/postcss`

### `eslint.config.mjs`
- Flat config style
- Extends `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Overrides default Next.js ignores to exclude `.next/`, `out/`, `build/`, `next-env.d.ts`

---

## Static Assets

`public/images/story-1/` contains 8 travel photographs (Vietnamese and Japanese locations):
- `cat-ba.jpg`, `cau-vang.jpg`, `ha-noi.jpg`, `nhat-ban.jpg`
- `nui-tuyet.jpg`, `suong-mu.jpg`, `thanh-pho-ho-chi-minh.jpg`, `vinh-ha-long.jpg`

These are not yet used in the component; colored placeholder divs are rendered instead.

---

## Scripts

```bash
pnpm dev      # Next.js dev server (turbo)
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # ESLint
```

---

## Key Patterns

1. **SSR-safe library init**: Locomotive Scroll loaded via `await import()` inside `useEffect` — never runs on server
2. **GSAP context scoping**: `gsap.context(() => { ... }, containerRef)` + `ctx.revert()` cleanup prevents memory leaks
3. **Timeline overlap**: Phase 3 uses `"-=0.1"` position parameter to overlap with Phase 2 for smooth diagonal handoff
4. **CSS Module + Tailwind coexistence**: Layout structure in `.module.css`, utility styles inline via `className`

---

## Unresolved / Known Issues

- `markers: true` left active in ScrollTrigger — must remove before production
- Section 4 images not wired up (placeholder `bg-gray-300` divs)
- LocomotiveScroll instance not stored in ref — cannot be explicitly destroyed
