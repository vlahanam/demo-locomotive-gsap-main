# Phase 01b: Architecture

← [Back to phase index](./phase-01-component-split.md)

---

## Component Tree (Post-Refactor)

```
<StoryOne>                          ← index.tsx (refs + GSAP only)
  <div className={styles.container}>
    <HeroSection />                 ← Section 1, self-contained fade-in
    <PlaceholderSection />          ← Section 2
    <HorizontalScroll               ← Section 3
      ref={containerRef}
      horizontalRef={horizontalRef}
    />
    <TransitionSection              ← Section 4
      ref={nextSectionRef}
    />
    <PlaceholderSection />          ← Section 5
  </div>
</StoryOne>
```

---

## Interface Definitions

```tsx
// HeroSection.tsx — no props
// Owns: text ref, gsap.from fade-in, Section 1 JSX
export default function HeroSection(): JSX.Element

// PlaceholderSection.tsx — no props
// Pure visual: section div + inner gray placeholder
export default function PlaceholderSection(): JSX.Element

// HorizontalScroll.tsx
interface HorizontalScrollProps {
  horizontalRef: React.RefObject<HTMLDivElement | null>;
}
// containerRef forwarded to outer .section div
const HorizontalScroll = React.forwardRef<HTMLDivElement, HorizontalScrollProps>(
  function HorizontalScroll({ horizontalRef }, ref)
)
export default HorizontalScroll;

// TransitionSection.tsx — no named props
// nextSectionRef forwarded to section div
const TransitionSection = React.forwardRef<HTMLDivElement, object>(
  function TransitionSection(_, ref)
)
export default TransitionSection;
```

---

## index.tsx Shape (Post-Refactor)

```tsx
"use client";
import { useLayoutEffect, useRef } from "react";
import styles from "./styles.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./HeroSection";
import PlaceholderSection from "./PlaceholderSection";
import HorizontalScroll from "./HorizontalScroll";
import TransitionSection from "./TransitionSection";

gsap.registerPlugin(ScrollTrigger);

export default function StoryOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!horizontalRef.current || !containerRef.current || !nextSectionRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(horizontalRef.current!.children);
      gsap.set(nextSectionRef.current, { x: 400, y: 300 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true, scrub: true,
          start: "top top",
          end: () => `+=${horizontalRef.current!.offsetWidth * 2}`,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      tl.to(sections, { xPercent: -100 * (sections.length - 1), ease: "none", duration: 1 });
      tl.to(horizontalRef.current, { x: -400, y: -400, ease: "none", duration: 0.1 });
      tl.to(nextSectionRef.current, { x: 0, y: 0, ease: "none", duration: 0.1 }, "-=0.1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container}>
      <HeroSection />
      <PlaceholderSection />
      <HorizontalScroll ref={containerRef} horizontalRef={horizontalRef} />
      <TransitionSection ref={nextSectionRef} />
      <PlaceholderSection />
    </div>
  );
}
```

---

## File Dependency Graph (Post-Refactor)

```
index.tsx
  ├── HeroSection.tsx
  │     ├── gsap
  │     └── ./styles.module.css
  ├── PlaceholderSection.tsx
  │     └── ./styles.module.css
  ├── HorizontalScroll.tsx
  │     └── ./styles.module.css
  ├── TransitionSection.tsx
  │     └── ./styles.module.css
  ├── gsap
  ├── gsap/ScrollTrigger
  └── ./styles.module.css
```
