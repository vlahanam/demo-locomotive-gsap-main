# Code Standards & Codebase Structure

**Last Updated**: 2026-03-22
**Version**: 0.1.0
**Applies To**: demo-locomotive-gsap

---

## Overview

Standards for this Next.js + GSAP + Locomotive Scroll demo project. Small scope; standards are intentionally lean.

---

## Core Principles

- **KISS**: Minimal abstraction; animation logic lives in one component
- **YAGNI**: No over-engineering; no hooks library, no state management, no router complexity
- **DRY**: Shared styles via CSS Modules; Tailwind utilities for one-off spacing

---

## Directory & File Organization

```
src/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles, Tailwind import
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Route pages
└── components/
    └── [ComponentName]/  # PascalCase directory per component
        ├── index.tsx     # Component implementation
        └── styles.module.css  # Scoped styles (optional)
```

- One directory per component under `components/`
- Entry file always `index.tsx`
- Co-locate CSS Module with component

---

## Naming Conventions

### Files & Directories
- **Components**: PascalCase directory (`StoryOne/`)
- **Non-component files**: camelCase or kebab-case (`globals.css`, `next.config.ts`)
- **CSS Modules**: `styles.module.css` co-located with component

### TypeScript
- **Components**: PascalCase function (`export default function StoryOne()`)
- **Variables / refs**: camelCase (`containerRef`, `horizontalRef`, `totalWidth`)
- **Types**: PascalCase (`Metadata`, `NextConfig`)

### CSS Class Names (CSS Modules)
- camelCase in module (`.box2`, `.horizontal`, `.container`, `.section`)
- Applied via `styles.className` pattern

---

## TypeScript Standards

- `strict: true` — all strict checks enabled
- `noEmit: true` — tsc is type-checker only; Next.js compiles
- Prefer explicit ref types: `useRef<HTMLDivElement | null>(null)`
- Use `Readonly<{}>` for props that should not mutate (pattern from layout.tsx)

---

## React / Next.js Patterns

### Client Components
- Mark with `"use client"` directive at top of file
- Required for: `useEffect`, `useLayoutEffect`, `useRef`, GSAP, LocomotiveScroll

### Server Components (default)
- `layout.tsx` runs as server component — safe for metadata export
- No browser APIs in server components

### SSR-Safe Library Init
```tsx
// Correct: dynamic import inside useEffect
useEffect(() => {
  (async () => {
    const LocomotiveScroll = (await import("locomotive-scroll")).default;
    new LocomotiveScroll();
  })();
}, []);
```

### GSAP + React
```tsx
// Correct: useLayoutEffect + gsap.context for scoped cleanup
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // animation code
  }, containerRef);
  return () => ctx.revert();
}, []);
```

---

## GSAP Standards

- Always register plugins before use: `gsap.registerPlugin(ScrollTrigger)`
- Use `gsap.context()` tied to a container ref for scoped cleanup
- Use `gsap.utils.toArray<HTMLElement>(selector)` for typed element arrays
- Timeline position parameter `"-=0.1"` used to overlap phases
- `invalidateOnRefresh: true` on ScrollTrigger for responsive layouts

---

## CSS Standards

### globals.css
- Tailwind v4 import: `@import "tailwindcss"`
- CSS custom properties in `:root` for theme tokens
- `@theme inline` block for Tailwind token mapping
- Dark mode via `@media (prefers-color-scheme: dark)`

### CSS Modules
- Use for layout structure that GSAP references
- Avoid mixing Tailwind utilities and CSS Module for the same property
- `.section { height: 100vh }` is critical — do not override with Tailwind `h-screen` simultaneously

### Tailwind v4
- Utility-first for spacing, flex alignment, colors
- Inline in JSX `className`: `flex items-center justify-center`
- Arbitrary values: `w-[70vw] h-[70vh]`

---

## Animation Architecture

### ScrollTrigger Pin Pattern
```
containerRef (Section 3 div)
  └── horizontalRef (flex row of panels)
        ├── .box2 (panel 1 - red)
        ├── .box2 (panel 2 - blue)
        └── .box2 (panel 3 - green)
```
- `pin: true` locks the viewport during scroll
- `scrub: true` ties animation progress to scroll position
- `end: += totalWidth * 2` — extra scroll room for Phase 2 + 3

### Three-Phase Timeline
| Phase | Target | Animation | Duration |
|-------|--------|-----------|---------|
| 1 | `.box2` children | `xPercent: -100 * (n-1)` | 1 unit |
| 2 | `horizontalRef` | `x: -400, y: -400` | 0.1 unit |
| 3 | `nextSectionRef` | `x: 0, y: 0` (from 400, 300) | 0.1 unit, overlaps Phase 2 |

---

## Error Handling

- Guard refs with null checks before animation setup:
  ```tsx
  if (!horizontalRef.current || !containerRef.current || !nextSectionRef.current) return;
  ```
- No async error handling needed (no network calls)

---

## Import Order Convention

```tsx
"use client";                        // directive first
import { useLayoutEffect, useRef } from "react";  // React
import styles from "./styles.module.css";           // local styles
import gsap from "gsap";                           // 3rd party libs
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

---

## Git Standards

- Conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `chore`, `refactor`
- No debug artifacts committed (`markers: true` must be removed)

---

## Pre-Deploy Checklist

- Remove `markers: true` from ScrollTrigger config
- Verify no console.log statements
- Run `pnpm build` — zero errors
- Run `pnpm lint` — zero warnings/errors
- Test on mobile viewport (horizontal scroll behavior)

---

## References

- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Locomotive Scroll v5](https://locomotivescroll.github.io/locomotive-scroll/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Project Overview PDR](./project-overview-pdr.md)
- [System Architecture](./system-architecture.md)
