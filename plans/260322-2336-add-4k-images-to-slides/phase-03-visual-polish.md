# Phase 03: Visual Polish

**Status**: DONE
**Estimated effort**: Small (< 30 min)

---

## Context

- [plan.md](./plan.md)
- [Phase 02](./phase-02-page-image-replacement.md)

## Overview

Add gradient overlays for text readability on PageOne, optional rounded corners, and section background color adjustments to complement the photographs.

## Key Insights

1. PageOne has red text (`text-red-500 text-3xl`) over ha-noi.jpg -- high risk of unreadable text
2. AnimatedText animates `xPercent`, `opacity`, `blur` -- gradient overlay must be a sibling/wrapper, not on the text element itself
3. Container `.container` has `background: aliceblue` -- may want to change to dark bg for better photo framing
4. PageFour is a transition section -- subtle vignette could enhance the fog image feel

## Requirements

- PageOne: gradient overlay from dark bottom to transparent top (text is at top-left area)
- Text color update: `text-red-500` may need to become white/light for contrast
- Container background: consider changing `aliceblue` to a dark neutral
- All overlays must not interfere with GSAP animations or pointer events

## Architecture

### PageOne Gradient Overlay

Add an absolutely positioned overlay div inside the image container, before the AnimatedText children:

```tsx
<div className="w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat bg-[url('/images/story-1/ha-noi.jpg')] relative">
  {/* Gradient overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
  {/* Existing AnimatedText children */}
  <div className="relative z-10">
    {textLeft.map(...)}
  </div>
</div>
```

Key: `relative` on parent, `absolute inset-0` on overlay, `relative z-10` on text wrapper.

### Text Color Adjustment

Change `text-red-500` to `text-white` or `text-white/90` for readability over dark gradient.

### Container Background (Optional)

In `styles.module.css`, change:
```css
.container { background-color: aliceblue; }
```
To:
```css
.container { background-color: #0a0a0a; }
```
Dark background frames the 70vw/70vh image panels with cinematic black bars.

## Related Code Files

- `src/components/StoryOne/pages/PageOne.tsx` -- gradient overlay + text color
- `src/components/StoryOne/styles.module.css` -- container background color
- `src/app/globals.css` -- verify no conflicting global styles

## Implementation Steps

### Step 1: PageOne gradient overlay

1. Add `relative` to the image container div
2. Insert gradient overlay div as first child: `absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent`
3. Wrap AnimatedText elements in `relative z-10` div
4. AnimatedText `<p>` ref is on the text itself -- wrapping parent div does not affect GSAP animation

### Step 2: Text color

Update AnimatedText `<p>` className:
```tsx
// Before
<p ref={textRef} className="text-red-500 text-3xl">

// After
<p ref={textRef} className="text-white text-3xl font-semibold drop-shadow-lg">
```

`drop-shadow-lg` adds extra readability over varied image areas.

### Step 3: Container background (optional)

Change `.container` background from `aliceblue` to dark neutral (`#0a0a0a` or `#1a1a1a`).

### Step 4: Visual QA

- Scroll through all sections
- Check text readability on PageOne at different scroll positions
- Verify gradient does not interfere with AnimatedText GSAP animations (xPercent, opacity, blur)
- Check dark container background looks good between sections

## Todo

- [ ] Add gradient overlay to PageOne
- [ ] Update text color to white with drop-shadow
- [ ] (Optional) Update container background to dark color
- [ ] Run `pnpm build` -- zero errors
- [ ] Visual QA: text readability at all scroll positions
- [ ] Verify AnimatedText animations still work (xPercent, opacity, blur)
- [ ] Run `pnpm lint` -- zero errors

## Success Criteria

- PageOne text is readable over ha-noi.jpg at all scroll positions
- Gradient overlay does not block GSAP text animations
- Dark container background creates cinematic framing (if applied)
- Zero build/lint errors
- All animations preserved

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Gradient overlay blocks text GSAP animation | Low | High | Overlay is sibling, text has `z-10`; GSAP targets `textRef` directly |
| `relative` on image div breaks layout | Low | Medium | Container is flex-centered; `relative` does not affect flex behavior |
| Dark container bg clashes with section backgrounds | Low | Low | Can revert to `aliceblue` or use `#1a1a1a` (softer) |
| `drop-shadow-lg` performance on animated text | Low | Low | Single text element; negligible GPU cost |

## Security Considerations

- No security implications -- purely visual CSS changes

## Next Steps

After Phase 03 completion:
- Remove `markers: true` from ScrollTrigger configs (PageOne.tsx line 51, index.tsx line 41)
- Update `docs/codebase-summary.md` to reflect image integration
- Consider lazy-loading images for production optimization (future enhancement)
