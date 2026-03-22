# Plan: Add 4K Images & Backgrounds to StoryOne Slides

**Created**: 2026-03-22
**Status**: Completed
**Scope**: Replace 6 placeholder colored divs with high-quality travel photographs

---

## Summary

Integrate 8 available JPEGs (1-2.2MB each) from `public/images/story-1/` into StoryOne's 4 page components. Use CSS `background-image` approach (not Next.js Image) because these are decorative backgrounds inside GSAP-animated containers with `will-change: transform`. Add gradient overlay on PageOne for text readability.

## Decision: CSS background-image over Next.js Image

- Next.js `<Image>` requires explicit width/height or `fill` + relative parent -- adds wrapper complexity
- GSAP transforms + `will-change: transform` on parent containers can conflict with Image layout
- `background-image` with `background-size: cover` is simpler, zero risk to animation pipeline
- Trade-off: no automatic WebP/AVIF optimization -- acceptable for demo project

---

## Phases

| # | Phase | File | Status |
|---|-------|------|--------|
| 1 | Image Integration Setup | [phase-01](./phase-01-image-integration-setup.md) | DONE |
| 2 | Page Image Replacement | [phase-02](./phase-02-page-image-replacement.md) | DONE |
| 3 | Visual Polish | [phase-03](./phase-03-visual-polish.md) | DONE |

## Image Assignment

| Location | Image | Rationale |
|----------|-------|-----------|
| PageOne | ha-noi.jpg (2.2MB) | Vietnamese strategy text theme |
| PageTwo | cau-vang.jpg (1.6MB) | Iconic landmark, visual impact |
| PageThree panel 1 | vinh-ha-long.jpg (1.4MB) | Ha Long Bay |
| PageThree panel 2 | nhat-ban.jpg (1.2MB) | Japan |
| PageThree panel 3 | nui-tuyet.jpg (1.6MB) | Snow mountains |
| PageFour | suong-mu.jpg (2.0MB) | Fog/mist transition feel |
| Reserved | cat-ba.jpg, thanh-pho-ho-chi-minh.jpg | Future use |

## Files to Modify

- `src/components/StoryOne/pages/PageOne.tsx`
- `src/components/StoryOne/pages/PageTwo.tsx`
- `src/components/StoryOne/pages/PageThree.tsx`
- `src/components/StoryOne/pages/PageFour.tsx`

## Constraints (Non-Negotiable)

- Preserve `w-[70vw] h-[70vh]` on all image containers
- Preserve all GSAP ScrollTrigger animations untouched
- Preserve AnimatedText in PageOne
- Preserve component refs and forwardRef patterns
- Keep `will-change: transform` on `.horizontal` and `.box2`
