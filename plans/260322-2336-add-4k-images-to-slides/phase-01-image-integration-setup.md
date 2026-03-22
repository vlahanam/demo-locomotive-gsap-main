# Phase 01: Image Integration Setup

**Status**: DONE
**Estimated effort**: Small (< 30 min)

---

## Context

- [plan.md](./plan.md)
- [docs/code-standards.md](/docs/code-standards.md)
- [docs/codebase-summary.md](/docs/codebase-summary.md)

## Overview

Define the approach for rendering background images inside GSAP-animated containers. CSS `background-image` chosen over Next.js Image for simplicity and zero animation risk.

## Key Insights

1. All 6 target divs use inline Tailwind: `w-[70vw] h-[70vh] bg-{color}`
2. Images are in `public/images/story-1/` -- served at `/images/story-1/{name}.jpg`
3. Tailwind v4 supports arbitrary `bg-[url()]` values inline
4. No wrapper component needed -- just swap Tailwind classes on existing divs

## Requirements

- Replace `bg-gray-300`, `bg-red-500`, `bg-blue-500`, `bg-green-500` with background images
- Use `object-fit: cover` equivalent (`bg-cover bg-center`)
- Maintain identical box dimensions
- Zero changes to GSAP config or ScrollTrigger

## Architecture

**Approach**: Inline Tailwind arbitrary values

```tsx
// Before
<div className="w-[70vw] h-[70vh] bg-gray-300" />

// After
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-[url('/images/story-1/cau-vang.jpg')]" />
```

This is the simplest approach. No new components, no CSS Module changes, no imports.

**Alternative considered**: CSS Module classes with `background-image` -- rejected as YAGNI; inline Tailwind is sufficient for 6 static image assignments.

**Alternative considered**: Next.js `<Image fill>` -- rejected because:
- Requires `position: relative` parent wrapper
- `fill` mode uses `position: absolute` which may interfere with flex centering in `.box2`
- Extra DOM nesting risks breaking GSAP `children` selector in PageThree

## Related Code Files

- `src/components/StoryOne/pages/PageOne.tsx` -- has AnimatedText children inside the div
- `src/components/StoryOne/pages/PageTwo.tsx` -- simple empty div
- `src/components/StoryOne/pages/PageThree.tsx` -- 3 panels inside horizontal scroll
- `src/components/StoryOne/pages/PageFour.tsx` -- forwardRef transition section

## Implementation Steps

1. Verify all 8 images load correctly at `/images/story-1/{name}.jpg` via browser
2. Define image-to-page mapping constant (or just inline -- 6 occurrences is fine)
3. Proceed to Phase 02 for actual replacement

## Todo

- [ ] Verify images accessible via dev server
- [ ] Confirm Tailwind v4 `bg-[url()]` syntax works with local paths
- [ ] Proceed to Phase 02

## Success Criteria

- Images load from `/images/story-1/` path in dev server
- Tailwind `bg-[url()]` compiles without error
- No new dependencies added

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Tailwind v4 arbitrary URL syntax issue | Low | Low | Fallback to inline `style={{ backgroundImage }}` |
| Large image files (1-2.2MB) slow page load | Medium | Low | Acceptable for demo; could add lazy loading later |

## Security Considerations

- Images served from public directory -- no auth needed, no external URLs
- No user-supplied image paths

## Next Steps

Proceed to [Phase 02](./phase-02-page-image-replacement.md) for actual class replacement in all 4 page files.
