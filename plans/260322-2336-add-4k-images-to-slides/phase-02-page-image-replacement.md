# Phase 02: Page Image Replacement

**Status**: DONE
**Estimated effort**: Small (< 30 min)

**Implementation Note**: Used inline `style={{ backgroundImage }}` instead of Tailwind `bg-[url()]` because Tailwind v4 has issues resolving empty url() patterns from plan markdown files.

---

## Context

- [plan.md](./plan.md)
- [Phase 01](./phase-01-image-integration-setup.md)

## Overview

Replace all 6 placeholder colored divs with background images across PageOne through PageFour. Each change is a className swap -- no structural modifications.

## Key Insights

1. PageOne has AnimatedText children inside the div -- must keep children, just change bg
2. PageTwo is a self-closing div -- swap to open/close if needed (not required for bg)
3. PageThree has 3 panels -- each gets a different image
4. PageFour uses forwardRef -- ref is on the section wrapper, not the image div; safe to modify

## Requirements

- 6 divs updated with background images
- Exact same dimensions preserved (`w-[70vw] h-[70vh]`)
- All Tailwind classes: `bg-cover bg-center bg-no-repeat`
- PageOne text must remain readable (gradient overlay in Phase 03)
- PageThree structure unchanged: `.box2` > image div

## Architecture

No architecture change. Pure className string modification on existing elements.

## Related Code Files

| File | Current | Target Image |
|------|---------|-------------|
| `src/components/StoryOne/pages/PageOne.tsx:18` | `bg-gray-300` | `ha-noi.jpg` |
| `src/components/StoryOne/pages/PageTwo.tsx:6` | `bg-gray-300` | `cau-vang.jpg` |
| `src/components/StoryOne/pages/PageThree.tsx:14` | `bg-red-500` | `vinh-ha-long.jpg` |
| `src/components/StoryOne/pages/PageThree.tsx:17` | `bg-blue-500` | `nhat-ban.jpg` |
| `src/components/StoryOne/pages/PageThree.tsx:20` | `bg-green-500` | `nui-tuyet.jpg` |
| `src/components/StoryOne/pages/PageFour.tsx:12` | `bg-gray-300` | `suong-mu.jpg` |

## Implementation Steps

### Step 1: PageOne.tsx (line 18)

Replace:
```tsx
<div className="w-[70vw] h-[70vh] bg-gray-300">
```
With:
```tsx
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat bg-[url('/images/story-1/ha-noi.jpg')]">
```
Keep AnimatedText children unchanged.

### Step 2: PageTwo.tsx (line 6)

Replace:
```tsx
<div className="w-[70vw] h-[70vh] bg-gray-300" />
```
With:
```tsx
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat bg-[url('/images/story-1/cau-vang.jpg')]" />
```

### Step 3: PageThree.tsx (lines 14, 17, 20)

Replace each panel:
```tsx
// Panel 1
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat bg-[url('/images/story-1/vinh-ha-long.jpg')]" />

// Panel 2
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat bg-[url('/images/story-1/nhat-ban.jpg')]" />

// Panel 3
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat bg-[url('/images/story-1/nui-tuyet.jpg')]" />
```

### Step 4: PageFour.tsx (line 12)

Replace:
```tsx
<div className="w-[70vw] h-[70vh] bg-gray-300" />
```
With:
```tsx
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat bg-[url('/images/story-1/suong-mu.jpg')]" />
```

### Step 5: Verify

- `pnpm build` -- no compile errors
- Manual scroll through all sections -- images display, animations work

## Todo

- [ ] Update PageOne.tsx
- [ ] Update PageTwo.tsx
- [ ] Update PageThree.tsx (3 panels)
- [ ] Update PageFour.tsx
- [ ] Run `pnpm build` -- zero errors
- [ ] Visual QA: scroll all 5 sections, verify images render with cover
- [ ] Verify horizontal scroll animation on PageThree panels
- [ ] Verify diagonal transition PageThree -> PageFour

## Success Criteria

- All 6 placeholder colors replaced with images
- Images fill containers with `object-fit: cover` behavior
- Zero GSAP animation regressions
- Zero build errors
- Horizontal scroll shows 3 different landscape photos
- Diagonal transition still works with image backgrounds

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Tailwind `bg-[url()]` not compiling in v4 | Low | Medium | Fallback to inline `style={{ backgroundImage: 'url(...)' }}` |
| Images not covering full div area | Low | Low | `bg-cover bg-center` handles all aspect ratios |
| GSAP horizontal scroll jank from heavy images | Low | Medium | Images are 1-2MB; browser caches after first load |
| PageOne text unreadable over busy image | High | Medium | Addressed in Phase 03 with gradient overlay |

## Security Considerations

- No external URLs -- all images from local public directory
- No dynamic paths -- all hardcoded strings

## Next Steps

Proceed to [Phase 03](./phase-03-visual-polish.md) for gradient overlays and visual refinements.
