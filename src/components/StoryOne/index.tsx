"use client";
import { useLayoutEffect, useRef } from "react";
import styles from "./styles.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StoryOne() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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

      const totalWidth = horizontalRef.current!.offsetWidth;

      // 👉 Section 4 bắt đầu lệch chéo
      gsap.set(nextSectionRef.current, {
        x: 400,
        y: 300,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true,
          start: "top top",
          end: "+=" + totalWidth * 2,
          markers: true,
          invalidateOnRefresh: true,
        },
      });

      // 🔥 Phase 1: Horizontal
      tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        duration: 1,
      });

      // 🔥 Phase 2: CẢ SCENE bay chéo
      tl.to(horizontalRef.current, {
        x: -400,
        y: -400,
        ease: "none",
        duration: 0.1,
      });

      // 🔥 Phase 3: Section 4 bay chéo vào
      tl.to(
        nextSectionRef.current,
        {
          x: 0,
          y: 0,
          ease: "none",
          duration: 0.1,
        },
        "-=0.1", // overlap để mượt
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container}>
      {/* Section 1 */}
      <div className={`${styles.section} flex items-center justify-center`}>
        <div className={styles.box1}>
          <div className="w-[70vw] h-[70vh] bg-gray-300"></div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={`${styles.section} flex items-center justify-center`}>
        <div className={styles.box1}>
          <div className="w-[70vw] h-[70vh] bg-gray-300"></div>
        </div>
      </div>

      {/* Section 3: Horizontal */}
      <div className={styles.section} ref={containerRef}>
        <div className={styles.horizontal} ref={horizontalRef}>
          <div className={styles.box2}>
            <div className="w-[70vw] h-[70vh] bg-red-500"></div>
          </div>

          <div className={styles.box2}>
            <div className="w-[70vw] h-[70vh] bg-blue-500"></div>
          </div>

          {/* 👇 GIỮ NGUYÊN box cuối */}
          <div className={styles.box2}>
            <div className="w-[70vw] h-[70vh] bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div
        className={`${styles.section} flex items-center justify-center`}
        ref={nextSectionRef}
      >
        <div className={styles.box1}>
          <div className="w-[70vw] h-[70vh] bg-gray-300"></div>
        </div>
      </div> 

      {/* Section 5 */}
      <div className={`${styles.section} flex items-center justify-center`}>
        <div className={styles.box1}>
          <div className="w-[70vw] h-[70vh] bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
