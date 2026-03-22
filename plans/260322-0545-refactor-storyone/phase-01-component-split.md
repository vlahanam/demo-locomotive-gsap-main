# Phase 01: Component Split — Index

**Status**: Pending | **Priority**: Medium | **Date**: 2026-03-22

## Description

Split `src/components/StoryOne/index.tsx` into 4 sub-components. `index.tsx` becomes a thin orchestrator holding only refs and GSAP timeline logic.

## Sub-Documents

| File | Contents |
|------|----------|
| [phase-01a-context-and-insights.md](./phase-01a-context-and-insights.md) | Context links, key insights, requirements |
| [phase-01b-architecture.md](./phase-01b-architecture.md) | Component tree, interface definitions, index.tsx shape |
| [phase-01c-implementation-steps.md](./phase-01c-implementation-steps.md) | Ordered steps, todo list, success criteria, risks, next steps |

## Target Structure

```
src/components/StoryOne/
├── index.tsx              # Orchestrator: refs + GSAP timeline only
├── styles.module.css      # Shared styles (unchanged)
├── HeroSection.tsx        # Section 1: text + self-contained fade-in
├── PlaceholderSection.tsx # Reusable plain section (sections 2 & 5)
├── HorizontalScroll.tsx   # Section 3: forwardRef (containerRef + horizontalRef)
└── TransitionSection.tsx  # Section 4: forwardRef (nextSectionRef)
```
