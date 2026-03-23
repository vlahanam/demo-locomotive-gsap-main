"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles.module.css";
import SlideText from "../SlideText";
import FloatingImages from "../FloatingImages";

gsap.registerPlugin(ScrollTrigger);

const floatingImages = [
  {
    src: "/images/story-1/waterfall.jpg",
    width: 260,
    height: 360,
    top: "8%",
    right: "4%",
    rotation: 6,
    fromX: 300,
    fromY: -100,
    parallaxSpeed: 0.4,
  },
  {
    src: "/images/story-1/cat-ba.jpg",
    width: 240,
    height: 170,
    bottom: "15%",
    left: "5%",
    rotation: -4,
    fromX: -250,
    fromY: 200,
    delay: 0.3,
    parallaxSpeed: 0.55,
  },
  {
    src: "/images/story-1/thanh-pho-ho-chi-minh.jpg",
    width: 200,
    height: 140,
    top: "25%",
    left: "6%",
    rotation: -7,
    fromX: -200,
    fromY: -60,
    delay: 0.5,
    parallaxSpeed: 0.35,
  },
];

const PageFour = React.forwardRef<HTMLDivElement, object>(
  function TransitionSection(_, ref) {
    const bgRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (!bgRef.current) return;
      gsap.set(bgRef.current, { scale: 1.2 });
    }, []);

    return (
      <div className={styles.section} ref={ref}>
        <div
          ref={bgRef}
          className={styles.slideBg}
          style={{ backgroundImage: "url('/images/story-1/suong-mu.jpg')" }}
        />
        <div className={styles.slideOverlay} />

        <FloatingImages images={floatingImages} />

        <SlideText
          title="Sương Mù"
          subtitle="Huyền bí giữa thiên nhiên"
          description="Cuối hành trình, sương mù ôm lấy mọi thứ. Ranh giới giữa thực và mơ tan biến — chỉ còn lại cảm giác bình yên vô tận."
        />
      </div>
    );
  },
);

export default PageFour;
