# Phase 01a: Context & Key Insights

← [Back to phase index](./phase-01-component-split.md)

---

## Context Links

- Source: `src/components/StoryOne/index.tsx`
- Styles: `src/components/StoryOne/styles.module.css`
- Standards: `docs/code-standards.md`
- Architecture: `docs/system-architecture.md`
- Codebase: `docs/codebase-summary.md`

---

## Key Insights

### 1. GSAP Context Scope

`gsap.context(() => { ... }, containerRef)` scopes selector queries to `containerRef`'s subtree. `containerRef` must stay in `index.tsx` — the timeline is defined there and the scope root must be the same element passed to `HorizontalScroll` via `forwardRef`.

### 2. HorizontalScroll Needs Two Refs

The timeline targets `containerRef` (ScrollTrigger trigger/pin) and `horizontalRef` (Phase 1 + 2 animation). Two strategies considered:

- **Option A (chosen)**: `forwardRef` for `containerRef` (outer div) + named prop for `horizontalRef` (inner flex div). Explicit, typesafe, minimal.
- **Option B**: `useImperativeHandle` exposing both — unnecessary complexity (KISS violation).

### 3. HeroSection Self-Contained Animation

The `text` ref and `gsap.from(text.current, {...})` are independent of the main timeline and `containerRef` scope. `HeroSection` can own its own `useLayoutEffect + gsap.context` with no refs passed up to `index.tsx`.

### 4. `text` Ref Bug in Source (Out of Scope)

Current `index.tsx` applies `ref={text}` to two `<p>` elements — React only stores the last DOM node. Refactor preserves this behavior as-is; fixing is a separate task.

### 5. `markers: true` Preservation

Kept intentionally — removal is a separate pre-deploy task per `docs/code-standards.md`.

### 6. Phase 3 `nextSectionRef` is Scope-Safe

`nextSectionRef.current` is referenced directly in the timeline (not via GSAP selector string), so `gsap.context` scope is irrelevant for Phase 3. The ref living in `index.tsx` and being forwarded to `TransitionSection` is sufficient.

---

## Requirements

1. `index.tsx` must contain zero JSX markup beyond rendering 5 sub-components inside `.container`
2. All sub-components marked `"use client"`
3. No new CSS classes — reuse `styles.module.css` via import in each sub-component
4. Ref types: `useRef<HTMLDivElement>(null)` / `React.RefObject<HTMLDivElement | null>` — consistent with existing pattern
5. Animation behavior identical to current (zero regressions)
6. `pnpm build` and `pnpm lint` pass after refactor
