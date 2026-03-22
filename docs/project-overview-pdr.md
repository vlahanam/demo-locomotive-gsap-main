# Project Overview & Product Development Requirements (PDR)

**Project Name**: demo-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-22
**Status**: Active Demo / Proof-of-Concept
**Repository**: demo-locomotive-gsap-main (local)

---

## Executive Summary

A minimal Next.js application demonstrating the integration of **Locomotive Scroll v5** (native scroll) and **GSAP ScrollTrigger** to produce cinematic, scroll-driven animations. The core demo is a `StoryOne` component that presents a pinned horizontal scroll carousel followed by a diagonal fly-out/fly-in scene transition.

---

## Project Purpose

### Vision
Prove and document the integration pattern between Locomotive Scroll v5 and GSAP ScrollTrigger inside a Next.js 16 / React 19 app — a combination that historically required careful SSR-safe initialization.

### Mission
Provide a working, inspectable reference implementation for:
- Client-side-only LocomotiveScroll initialization (dynamic import, `useEffect`)
- GSAP ScrollTrigger horizontal scroll with `pin` and `scrub`
- Multi-phase scroll timeline: horizontal → diagonal fly-out → diagonal fly-in
- CSS Modules + Tailwind CSS v4 coexistence

### Intended Users
- Frontend developers exploring GSAP + Locomotive Scroll in Next.js
- Teams evaluating scroll animation libraries for production projects

---

## Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR-01 | LocomotiveScroll initialized client-side only (no SSR errors) | Done |
| FR-02 | GSAP ScrollTrigger pinned horizontal scroll (3 panels) | Done |
| FR-03 | Diagonal scene fly-out after horizontal scroll completes | Done |
| FR-04 | Diagonal fly-in of next section synchronized with fly-out | Done |
| FR-05 | `useLayoutEffect` + `gsap.context` for proper cleanup on unmount | Done |
| FR-06 | TypeScript strict mode | Done |
| FR-07 | Tailwind CSS v4 utility classes | Done |
| FR-08 | CSS Modules for component-scoped styles | Done |

---

## Non-Functional Requirements

| ID | Requirement | Note |
|----|-------------|------|
| NFR-01 | No SSR hydration errors | LocomotiveScroll loaded via dynamic import |
| NFR-02 | Smooth scrub animation | `scrub: true` on ScrollTrigger |
| NFR-03 | Clean GSAP context disposal | `ctx.revert()` in cleanup |
| NFR-04 | TypeScript strict compliance | `strict: true` in tsconfig |
| NFR-05 | Minimal dependencies | Only 2 runtime animation libs |

---

## Technical Constraints

- Next.js App Router (not Pages Router)
- React 19 strict mode — effects run twice in development
- `overflow: hidden` on body — Locomotive Scroll manages scrolling
- GSAP ScrollTrigger `markers: true` is intentionally left on for dev inspection
- ngrok dev origin whitelisted in `next.config.ts`

---

## Acceptance Criteria

- Page loads without hydration errors in Next.js development and production build
- Horizontal scroll pins Section 3 and moves 3 colored panels left
- After horizontal scroll, scene flies off diagonally
- Section 4 appears from diagonal offset and snaps to view
- Sections 1, 2, 4, 5 stack vertically; Section 3 is the pinned horizontal stage

---

## Scope

**In scope**: Single-page scroll animation demo, one story component.

**Out of scope**: Routing, authentication, data fetching, API routes, image optimization (placeholder divs used instead of actual images).

---

## Dependencies

### Runtime
- `gsap` ^3.14.2 — animation engine + ScrollTrigger plugin
- `locomotive-scroll` ^5.0.1 — native scroll enhancement
- `next` 16.2.1, `react` / `react-dom` 19.2.4

### Dev
- `tailwindcss` ^4, `@tailwindcss/postcss` ^4 — utility CSS
- `typescript` ^5, `@types/react` ^19, `@types/react-dom` ^19
- `eslint` ^9, `eslint-config-next` 16.2.1

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| GSAP version incompatibility with React 19 double-effect | Low | High | `gsap.context` + `useLayoutEffect` pattern |
| LocomotiveScroll conflicting with Next.js hydration | Low | High | Dynamic import in `useEffect` |
| ScrollTrigger markers in production | Medium | Low | Remove `markers: true` before deploy |

---

## Related Documentation

- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)
- [Project Roadmap](./project-roadmap.md)
