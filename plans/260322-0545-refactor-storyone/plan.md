# Plan: Refactor StoryOne into Sub-Components

**Created**: 2026-03-22
**Branch**: main
**Status**: completed

---

## Goal

Split `src/components/StoryOne/index.tsx` (115 lines, monolithic) into focused sub-components. `index.tsx` becomes a thin orchestrator holding only refs and GSAP logic; markup is delegated to purpose-built components.

---

## Target Structure

```
src/components/StoryOne/
├── index.tsx              # Orchestrator: refs + GSAP timeline only
├── styles.module.css      # Shared styles (unchanged)
├── HeroSection.tsx        # Section 1: text content + self-contained fade-in
├── PlaceholderSection.tsx # Reusable plain section (sections 2 & 5)
├── HorizontalScroll.tsx   # Section 3: forwardRef (containerRef + horizontalRef)
└── TransitionSection.tsx  # Section 4: forwardRef (nextSectionRef)
```

---

## Phases

| # | Name | File | Status |
|---|------|------|--------|
| 1 | Component Split | [phase-01-component-split.md](./phase-01-component-split.md) | completed |

---

## Constraints

- Zero animation behavior changes
- `markers: true` preserved (not removed here — separate cleanup task)
- `gsap.context` scope stays bound to `containerRef` in `index.tsx`
- All new files: `"use client"`, TypeScript strict, CSS Modules via `styles`
