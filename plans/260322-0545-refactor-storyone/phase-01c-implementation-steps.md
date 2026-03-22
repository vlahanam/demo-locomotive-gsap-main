# Phase 01c: Implementation Steps

← [Back to phase index](./phase-01-component-split.md)

---

## Implementation Steps (Ordered)

### Step 1 — Create `HeroSection.tsx`

- Source lines: `index.tsx` lines 74–83
- Add `"use client"` directive
- Import `styles` from `./styles.module.css`; import `gsap`, `useLayoutEffect`, `useRef` from react
- Declare `text = useRef<HTMLParagraphElement>(null)`; apply to first `<p>` only
- `useLayoutEffect`: `gsap.context(() => gsap.from(text.current, { opacity: 0, x: -200, duration: 1, ease: "power3.out" }), sectionRef)` + cleanup `ctx.revert()`
- Return Section 1 JSX

### Step 2 — Create `PlaceholderSection.tsx`

- Source lines: `index.tsx` lines 85–87 (Section 2 pattern)
- Add `"use client"` directive
- Import `styles`
- No refs, no effects
- Return: `<div className={\`${styles.section} flex items-center justify-center\`}><div className="w-[70vw] h-[70vh] bg-gray-300" /></div>`

### Step 3 — Create `HorizontalScroll.tsx`

- Source lines: `index.tsx` lines 89–101
- Add `"use client"` directive
- Import `React`, `styles`
- Define `HorizontalScrollProps { horizontalRef: React.RefObject<HTMLDivElement | null> }`
- Wrap with `React.forwardRef<HTMLDivElement, HorizontalScrollProps>`
- Attach forwarded `ref` to outer `.section` div; attach `horizontalRef` to inner `.horizontal` div
- Render 3 `.box2` children unchanged
- No GSAP logic

### Step 4 — Create `TransitionSection.tsx`

- Source lines: `index.tsx` lines 103–108
- Add `"use client"` directive
- Import `React`, `styles`
- Wrap with `React.forwardRef<HTMLDivElement, object>`
- Attach forwarded `ref` to section div
- No GSAP logic

### Step 5 — Refactor `index.tsx`

- Remove `text` ref declaration
- Remove `gsap.from(text.current, ...)` call from `useLayoutEffect`
- Remove all JSX inside the container div; replace with 5 sub-component calls
- Add imports: `HeroSection`, `PlaceholderSection`, `HorizontalScroll`, `TransitionSection`
- Pass `ref={containerRef}` + `horizontalRef={horizontalRef}` to `HorizontalScroll`
- Pass `ref={nextSectionRef}` to `TransitionSection`
- Confirm null guard still covers `containerRef`, `horizontalRef`, `nextSectionRef`

### Step 6 — Verify

- `pnpm build` — zero type errors
- `pnpm lint` — zero warnings/errors
- Manual browser test: horizontal carousel, fly-out, fly-in all behave identically to pre-refactor

---

## Todo List

- [ ] Create `HeroSection.tsx`
- [ ] Create `PlaceholderSection.tsx`
- [ ] Create `HorizontalScroll.tsx`
- [ ] Create `TransitionSection.tsx`
- [ ] Refactor `index.tsx`
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] Manual browser test

---

## Success Criteria

- `index.tsx` contains no JSX markup (only refs, `useLayoutEffect`, sub-component renders)
- All 4 new files exist, are `"use client"`, TypeScript-strict
- `pnpm build` exits 0
- `pnpm lint` exits 0
- Scroll animation visually identical to pre-refactor

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `gsap.context` scope breaks | Low | High | `containerRef` stays in `index.tsx`; context root unchanged |
| `forwardRef` + named prop type error | Low | Low | Type as `React.RefObject<HTMLDivElement \| null>` matching `useRef` |
| `text` ref bug propagates | Already present | None | Out of scope; documented |
| Phase 3 `nextSectionRef` unreachable | Low | High | Direct ref access (not selector string) — context scope irrelevant |

---

## Security Considerations

N/A — pure UI refactor, no data, no input, no network.

---

## Next Steps

After phase complete:

1. Remove `markers: true` (pre-deploy per `docs/code-standards.md`)
2. Wire `public/images/story-1/` images to replace placeholder `bg-gray-300` divs
3. Fix `text` ref bug (single ref applied to two `<p>` elements)
4. Store LocomotiveScroll instance in ref + destroy on unmount (known issue in `docs/codebase-summary.md`)
