# Plan: Floating Edge Tags on PageOne (Slide 1)

**Created**: 2026-03-23
**Status**: TODO
**Scope**: Add 5 colored tags on left/right edges of slide 1 with horizontal floating animation

---

## Summary

Add decorative tag elements positioned half-inside half-outside the `w-[70vw] h-[70vh]` container on PageOne. Tags oscillate horizontally via CSS keyframes. No GSAP involvement — purely CSS animation to avoid conflicts.

## Phases

| # | Phase | File | Status |
|---|-------|------|--------|
| 1 | Add floating edge tags | [phase-01](./phase-01-floating-edge-tags.md) | TODO |

## Tag Layout

| Position | Color | Text | Placement |
|----------|-------|------|-----------|
| Left, 25% from top | Red `#ef4444` | Chiến lược | `left: -60px` |
| Left, 50% from top | Orange `#f59e0b` | Thâm nhập | `left: -50px` |
| Left, 75% from top | Green `#22c55e` | Tình báo | `left: -55px` |
| Right, 15% from top | Blue `#60a5fa` | Phản gián | `right: -60px` |
| Right, 80% from top | Purple `#a78bfa` | Mật vụ | `right: -50px` |

## Files to Modify

- `src/components/StoryOne/pages/PageOne.tsx`
- `src/components/StoryOne/styles.module.css`

## Constraints

- Preserve existing GSAP animations, dimensions, structure
- Use CSS keyframes only (no GSAP for tags)
- Tags are decorative, `pointer-events: none`
