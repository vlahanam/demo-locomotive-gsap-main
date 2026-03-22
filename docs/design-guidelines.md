# Design Guidelines

**Last Updated**: 2026-03-22
**Project**: demo-locomotive-gsap

---

## Visual Design

### Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Background (light) | `#ffffff` | Body background |
| Foreground (light) | `#171717` | Body text |
| Background (dark) | `#0a0a0a` | Dark mode body |
| Foreground (dark) | `#ededed` | Dark mode text |
| Container bg | `aliceblue` | StoryOne outer container |
| Panel 1 | `bg-red-500` | Horizontal panel 1 |
| Panel 2 | `bg-blue-500` | Horizontal panel 2 |
| Panel 3 | `bg-green-500` | Horizontal panel 3 |
| Content placeholder | `bg-gray-300` | Non-horizontal sections |

Placeholder panel colors (red, blue, green) are dev aids — replace with real content for production.

### Typography

- **Sans**: Geist Sans (`--font-geist-sans`) via `next/font/google`
- **Mono**: Geist Mono (`--font-geist-mono`) via `next/font/google`
- Font variables applied to `<html>` element; body inherits via CSS custom properties

---

## Layout

### Full-Viewport Sections
Each `.section` is `height: 100vh`. Five sections total:

| Section | Content | Notes |
|---------|---------|-------|
| 1 | `70vw × 70vh` gray placeholder | Static |
| 2 | `70vw × 70vh` gray placeholder | Static |
| 3 | Horizontal carousel (3 panels) | GSAP pinned |
| 4 | `70vw × 70vh` gray placeholder | Animated fly-in target |
| 5 | `70vw × 70vh` gray placeholder | Static |

### Horizontal Panels (.box2)
- `min-width: 100vw` — each panel fills viewport width
- `flex-shrink: 0` — prevents compression
- Centered content with `align-items: center; justify-content: center`

### Overflow
- `body`: `overflow: hidden` — Locomotive Scroll manages scrolling
- `.section`: `overflow: hidden` — clips off-screen animated elements

---

## Animation Design

### Timing Principles
- `scrub: true` — animation speed matches user scroll speed (no fixed duration)
- Phase ratios: 91% horizontal, 9% transitions (10:1:1 duration ratio)
- Overlap (`"-=0.1"`) makes transition feel instantaneous — no gap between fly-out and fly-in

### Motion Direction
- Horizontal: panels move **left** (natural reading direction)
- Fly-out: scene exits **top-left** diagonal (`x: -400, y: -400`)
- Fly-in: new section enters from **bottom-right** offset (`x: 400, y: 300`)

The asymmetry (400,400 vs 400,300) creates a slight vertical compression that feels natural as content "arrives."

### Image Content (Planned)
Travel photos in `public/images/story-1/` — Vietnamese and Japanese locations. When wired up, they should:
- Use `next/image` with `fill` or explicit dimensions
- Match the `70vw × 70vh` placeholder dimensions
- Use `object-fit: cover` for consistent framing

---

## Responsive Considerations

- `100vw` / `100vh` values adapt to viewport automatically
- `70vw × 70vh` content blocks scale proportionally
- Horizontal scroll end point (`totalWidth * 2`) recomputed on refresh via `invalidateOnRefresh: true`
- Touch scroll behavior on mobile: test pinned ScrollTrigger carefully on iOS Safari

---

## Dark Mode

Automatic via `prefers-color-scheme: dark` media query. Only background/foreground vars change. Component placeholder colors (red, blue, green, gray) are not dark-mode-aware — acceptable for a demo.
