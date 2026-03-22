"use client";
import { useLayoutEffect, useRef } from "react";
import styles from "./styles.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import PageThree from "./pages/PageThree";
import PageFour from "./pages/PageFour";
import ParticleCanvas from "../ParticleCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function StoryOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (
      !horizontalRef.current ||
      !containerRef.current ||
      !nextSectionRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        horizontalRef.current!.children,
      );

      gsap.set(nextSectionRef.current, { x: 400, y: 300 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true,
          start: "top top",
          end: () => `+=${horizontalRef.current!.offsetWidth * 2}`,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        duration: 1,
      });

      tl.to(horizontalRef.current, {
        x: -400,
        y: -400,
        ease: "none",
        duration: 0.1,
      });

      tl.to(
        nextSectionRef.current,
        { x: 0, y: 0, ease: "none", duration: 0.1 },
        "-=0.1",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container}>
      <ParticleCanvas />
      <div className={styles.containerContent}>
        <PageOne />
        <PageTwo />
        <PageThree ref={containerRef} horizontalRef={horizontalRef} />
        <PageFour ref={nextSectionRef} />
      </div>
    </div>
  );
}
