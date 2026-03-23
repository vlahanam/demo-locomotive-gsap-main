"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles.module.css";
import SlideText from "../SlideText";
import FloatingImages from "../FloatingImages";

gsap.registerPlugin(ScrollTrigger);

const floatingImages = [
  {
    src: "/images/story-1/cherry-blossom.jpg",
    width: 260,
    height: 180,
    top: "10%",
    left: "5%",
    rotation: -6,
    fromX: -300,
    fromY: -80,
    parallaxSpeed: 0.5,
  },
  {
    src: "/images/story-1/misty-mountain.jpg",
    width: 220,
    height: 300,
    top: "15%",
    right: "4%",
    rotation: 5,
    fromX: 250,
    fromY: -60,
    delay: 0.2,
    parallaxSpeed: 0.35,
  },
  {
    src: "/images/story-1/boat-river.jpg",
    width: 240,
    height: 170,
    bottom: "10%",
    left: "8%",
    rotation: 3,
    fromX: -200,
    fromY: 180,
    delay: 0.4,
    parallaxSpeed: 0.6,
  },
];

export default function PageTwo() {
  const bgRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!bgRef.current) return;
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.fromTo(
        bgRef.current,
        { y: 0, scale: 1.1 },
        {
          y: -80,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      if (chapterRef.current) {
        gsap.set(chapterRef.current, { opacity: 0, x: -80 });
        gsap.to(chapterRef.current, {
          opacity: 0.15,
          x: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapterRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.section}>
      <div
        ref={bgRef}
        className={styles.slideBg}
        style={{ backgroundImage: "url('/images/story-1/cau-vang.jpg')" }}
      />
      <div className={styles.slideOverlay} />

      <div ref={chapterRef} className={styles.chapterNumber}>02</div>

      <FloatingImages images={floatingImages} />

      <SlideText
        title="Cầu Vàng"
        subtitle="Bàn tay giữa mây trời"
        description="Đôi bàn tay khổng lồ nâng niu cây cầu vàng giữa lưng chừng núi. Đứng ở đây, ta không còn biết mình đang chạm đất hay đang bước trên mây."
      />
    </div>
  );
}
