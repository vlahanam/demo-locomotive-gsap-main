# Project Roadmap

**Last Updated**: 2026-03-22
**Current Version**: 0.1.0
**Project**: demo-locomotive-gsap

---

## Status

Proof-of-concept demo. Core animation is working. Roadmap reflects potential improvements if the demo is extended into a production showcase.

---

## Phase 1: Core Demo (COMPLETE)

**Status**: Done

- LocomotiveScroll v5 initialized SSR-safe
- GSAP ScrollTrigger horizontal carousel (3 panels, pinned + scrubbed)
- Diagonal fly-out / fly-in transition (Phase 2 + 3 in timeline)
- Next.js 16 + React 19 + TypeScript strict
- Tailwind CSS v4 + CSS Modules setup

---

## Phase 2: Polish & Cleanup (PENDING)

Low-effort improvements to make demo production-presentable.

| Item | Priority | Notes |
|------|----------|-------|
| Remove `markers: true` from ScrollTrigger | High | Dev-only debug overlay |
| Wire up travel images from `public/images/story-1/` | Medium | Replace placeholder colored divs |
| Destroy LocomotiveScroll instance on unmount | Medium | Store in ref, call `.destroy()` |
| Add `next/image` usage for story images | Medium | Optimization + lazy loading |
| Update page metadata (`title`, `description`) | Low | Currently default create-next-app values |

---

## Phase 3: Extended Demos (OPTIONAL)

Additional story components if this becomes a multi-example showcase.

| Item | Notes |
|------|-------|
| `StoryTwo` — parallax layers | Multiple z-index layers scroll at different rates |
| `StoryThree` — text reveal | GSAP SplitText or manual char animation on scroll |
| `StoryFour` — video scrub | Video playback tied to scroll position |
| Navigation between stories | Smooth scroll-to anchors or page routing |

---

## Phase 4: Production Hardening (OPTIONAL)

If used as reference template:

| Item | Notes |
|------|-------|
| Remove ngrok dev origin from `next.config.ts` | Not needed in production |
| Add `NEXT_PUBLIC_*` env var pattern | For any configurable values |
| Accessibility: `prefers-reduced-motion` | Disable animations for users who opt out |
| Mobile responsiveness review | Pin + horizontal scroll behavior on touch devices |
| Lighthouse / Core Web Vitals pass | Ensure animation doesn't hurt LCP/CLS |

---

## Known Issues Backlog

| Issue | Severity | Phase |
|-------|----------|-------|
| `markers: true` visible in production if deployed as-is | High | Phase 2 |
| LocomotiveScroll instance leaked on unmount | Medium | Phase 2 |
| Placeholder `bg-gray-300` divs instead of real images | Low | Phase 2 |
| Page `<title>` still "Create Next App" | Low | Phase 2 |

---

## No Current Release Schedule

This is a demo/learning project. Phases 2–4 are discretionary improvements, not committed milestones.
