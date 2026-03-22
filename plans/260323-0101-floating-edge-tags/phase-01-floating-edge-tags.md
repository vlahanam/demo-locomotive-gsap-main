# Phase 01: Floating Edge Tags

**Status**: TODO
**Estimated effort**: Small (< 20 min)

---

## Context

- [plan.md](./plan.md)

## Overview

Add 5 absolutely positioned tag elements on PageOne's image container edges. Each tag straddles the border (half in, half out). CSS `@keyframes` for horizontal oscillation.

## Key Insights

1. PageOne container already has `relative` — can add `absolute` children directly
2. Tags sit outside overflow boundary — parent needs `overflow: visible` (currently inherited, not explicitly hidden on the image div)
3. CSS animation avoids GSAP conflict — different animation system entirely
4. Staggered `animation-delay` + different `animation-duration` = natural floating feel

## Requirements

- 5 tag elements: 3 left edge, 2 right edge
- Each ~120×40px, rounded corners, white text, colored background
- Horizontal float animation: translate X ±15px, duration 3-5s each
- `pointer-events: none` — decorative only
- Must not affect existing AnimatedText GSAP animations

## Architecture

### CSS Keyframes

```css
@keyframes floatX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(15px); }
}
```

### Tag Positioning

Tags use `position: absolute` with negative `left`/`right` values to straddle the container border. `top` as percentage for vertical placement.

### Tag Structure in JSX

```tsx
<span className={styles.edgeTag} style={{ top: '25%', left: '-60px', ... }}>
  Chiến lược
</span>
```

## Related Code Files

- `src/components/StoryOne/pages/PageOne.tsx:17-25` — image container div
- `src/components/StoryOne/styles.module.css` — add `.edgeTag` + `@keyframes floatX`

## Implementation Steps

### Step 1: Add CSS

In `styles.module.css`, add:

```css
.edgeTag {
  position: absolute;
  padding: 8px 20px;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  animation: floatX 4s ease-in-out infinite;
}

@keyframes floatX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(15px); }
}
```

### Step 2: Add tags to PageOne.tsx

Inside the `w-[70vw] h-[70vh]` container, after the gradient overlay and before the text wrapper, add 5 tag elements with inline styles for position and color. Each gets different `animationDuration` and `animationDelay`.

### Step 3: Ensure overflow visible

The image container div needs `overflow-visible` (or no overflow restriction) so tags extending outside the border are visible. Add `overflow-visible` Tailwind class if needed.

### Step 4: Build & verify

Run `pnpm build`, visual check tags float correctly.

## Todo

- [ ] Add `.edgeTag` class and `@keyframes floatX` to styles.module.css
- [ ] Add 5 tag elements to PageOne.tsx
- [ ] Ensure container allows overflow for tags
- [ ] Run `pnpm build` — zero errors
- [ ] Visual QA: tags float, don't break GSAP text animations

## Success Criteria

- 5 colored tags visible on slide edges
- Tags oscillate horizontally with natural staggered timing
- Existing GSAP animations unaffected
- Zero build errors

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Tags clipped by overflow:hidden on parent | Medium | Low | Add `overflow-visible` to image container |
| CSS animation conflicts with GSAP transform | Low | Low | Tags are separate elements, GSAP targets textRef only |

## Security Considerations

- No security implications — purely decorative CSS

## Next Steps

Build, verify, done. Single phase plan.
