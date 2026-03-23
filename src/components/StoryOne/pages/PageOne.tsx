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
    src: "/images/story-1/lantern-festival.jpg",
    width: 280,
    height: 200,
    top: "8%",
    right: "5%",
    rotation: 6,
    fromX: 300,
    fromY: -100,
    delay: 0.5,
    parallaxSpeed: 0.4,
  },
  {
    src: "/images/story-1/old-town.jpg",
    width: 240,
    height: 170,
    bottom: "12%",
    left: "4%",
    rotation: -5,
    fromX: -250,
    fromY: 200,
    delay: 0.7,
    parallaxSpeed: 0.6,
  },
  {
    src: "/images/story-1/rice-terrace.jpg",
    width: 200,
    height: 280,
    top: "20%",
    left: "3%",
    rotation: -8,
    fromX: -300,
    fromY: -50,
    delay: 0.9,
    parallaxSpeed: 0.3,
  },
  {
    src: "/images/story-1/night-city.jpg",
    width: 220,
    height: 160,
    bottom: "18%",
    right: "8%",
    rotation: 4,
    fromX: 200,
    fromY: 150,
    delay: 1.1,
    parallaxSpeed: 0.5,
  },
];

export default function PageOne() {
  const bgRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!bgRef.current) return;
    const ctx = gsap.context(() => {
      // Ken Burns effect on background
      gsap.fromTo(
        bgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      // Chapter number fade
      if (chapterRef.current) {
        gsap.set(chapterRef.current, { opacity: 0, x: -100 });
        gsap.to(chapterRef.current, {
          opacity: 0.15,
          x: 0,
          duration: 2,
          delay: 0.5,
          ease: "power2.out",
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
        style={{ backgroundImage: "url('/images/story-1/ha-noi.jpg')" }}
      />
      <div className={styles.slideOverlay} />

      <div ref={chapterRef} className={styles.chapterNumber}>01</div>

      <FloatingImages images={floatingImages} />

      <SlideText
        title="Hà Nội"
        subtitle="Nơi câu chuyện bắt đầu"
        description="Giữa những con phố cổ rêu phong, mùi cà phê trứng quyện trong gió sớm — tôi nhận ra hành trình ngàn dặm luôn khởi đầu từ một bước chân nhỏ bé."
        intro
      />

      <div className={styles.scrollIndicator}>
        <span>Khám phá</span>
        <div className={styles.scrollLine} />
      </div>
    </div>
  );
}
