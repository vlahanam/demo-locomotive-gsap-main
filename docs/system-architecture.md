# System Architecture

**Last Updated**: 2026-03-22
**Version**: 0.1.0
**Project**: demo-locomotive-gsap

---

## Overview

Single-page Next.js application. No backend, no API, no database. Architecture is purely frontend: Next.js App Router renders one route (`/`) which initializes two scroll libraries and renders one animated component.

---

## Application Layers

```
Browser
  └── Next.js App Router
        ├── layout.tsx          (Server Component — fonts, body config)
        └── page.tsx            (Client Component — scroll init, composition)
              └── <StoryOne />  (Client Component — GSAP animation)
```

---

## Component Architecture

### Root Layout (`layout.tsx`)
- **Type**: Server Component (default in App Router)
- **Responsibilities**: HTML shell, Geist font variables, body CSS classes
- **Key constraint**: `overflow: hidden` on body — required for Locomotive Scroll

### Home Page (`page.tsx`)
- **Type**: Client Component (`"use client"`)
- **Responsibilities**:
  - LocomotiveScroll initialization (SSR-safe, dynamic import in `useEffect`)
  - Renders `<StoryOne />` inside `<main>`
- **Side effects**: One `useEffect` for scroll library boot

### StoryOne Component (`components/StoryOne/index.tsx`)
- **Type**: Client Component (`"use client"`)
- **Responsibilities**: All GSAP animation, DOM structure for scroll demo
- **Refs**:
  - `containerRef` → Section 3 `div` (ScrollTrigger trigger + pin target)
  - `horizontalRef` → Flex container holding horizontal panels (Phase 1 + 2 target)
  - `nextSectionRef` → Section 4 `div` (Phase 3 target)

---

## Scroll Architecture

Two libraries coexist with distinct roles:

| Library | Role | Init Location |
|---------|------|---------------|
| Locomotive Scroll v5 | Native scroll enhancement, smooth deceleration | `page.tsx` useEffect |
| GSAP ScrollTrigger | Scroll-driven animation timeline, pin + scrub | `StoryOne` useLayoutEffect |

Locomotive Scroll uses the native scroll events; GSAP ScrollTrigger hooks into those same events via its own listener. They are compatible in Locomotive Scroll v5 (native scroll mode, no custom scroll hijacking).

---

## Animation State Machine

```
Initial State
  Section 4: gsap.set({ x: 400, y: 300 })   ← offset off-screen

Scroll begins (ScrollTrigger activates at "top top")
  │
  ├─ Phase 1 [0 → 1]: Horizontal carousel
  │    horizontalRef.children → xPercent: -100 * (n-1)
  │    (panels slide left, user sees each panel)
  │
  ├─ Phase 2 [1 → 1.1]: Scene fly-out
  │    horizontalRef → x: -400, y: -400
  │    (entire horizontal stage exits diagonally)
  │
  └─ Phase 3 [1 → 1.1]: Next section fly-in  ← overlaps Phase 2
       nextSectionRef → x: 0, y: 0
       (Section 4 slides in from diagonal offset)

End State: Section 4 visible, Sections 1-3 off-screen
```

ScrollTrigger config:
- `start`: `"top top"` (Section 3 hits viewport top)
- `end`: `+= totalWidth * 2` (dynamically computed from `horizontalRef.offsetWidth`)
- `pin: true`, `scrub: true`, `invalidateOnRefresh: true`

---

## Data Flow

No state management. All interaction is through the DOM and GSAP's internal state.

```
User scroll event
  → Browser native scroll
  → Locomotive Scroll (passive enhancement)
  → GSAP ScrollTrigger listener
  → Timeline progress updates
  → DOM transforms (xPercent, x, y)
  → Visual animation
```

---

## File Dependency Graph

```
page.tsx
  ├── locomotive-scroll (dynamic import)
  └── components/StoryOne/index.tsx
        ├── gsap
        ├── gsap/ScrollTrigger
        └── ./styles.module.css

layout.tsx
  ├── next/font/google (Geist, Geist_Mono)
  └── ./globals.css
```

---

## Build & Runtime

### Build Pipeline
```
pnpm build
  → TypeScript type check (tsc --noEmit)
  → Next.js compilation (SWC + PostCSS)
  → Static asset optimization
  → Output: .next/
```

### CSS Pipeline
```
globals.css → PostCSS → @tailwindcss/postcss → Tailwind v4 output
styles.module.css → Next.js CSS Modules → scoped class names
```

### Runtime Initialization Order
```
1. HTML shell delivered (server)
2. React hydration (client)
3. layout.tsx body styles applied
4. page.tsx mounts → useEffect fires → LocomotiveScroll initialized
5. StoryOne mounts → useLayoutEffect fires → GSAP context created
6. ScrollTrigger registers, timeline built, gsap.set positions Section 4
```

---

## Deployment Architecture

### Target Environments
- **Development**: `pnpm dev` (Next.js dev server, hot reload)
- **Production**: Vercel or any Node.js host via `pnpm build && pnpm start`
- **Dev tunnel**: ngrok (`mckayla-nonsymbiotical-sabra.ngrok-free.dev` whitelisted in `next.config.ts`)

### Static Assets
`public/images/story-1/` — 8 JPEG images served statically, not yet referenced in component code.

---

## Security Considerations

- No user input, no forms, no authentication
- ngrok dev origin whitelist is dev-only and should be removed for production
- No environment secrets required

---

## Scalability Notes

This is a demo. If extended:
- Additional "stories" should follow the `StoryOne` pattern (one component dir per story)
- `gsap.context` ensures animations are isolated per component instance
- Locomotive Scroll instance should be stored in a ref and `.destroy()`'d on unmount if multiple pages are added

---

## References

- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [Project Overview PDR](./project-overview-pdr.md)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Locomotive Scroll v5](https://locomotivescroll.github.io/locomotive-scroll/)
