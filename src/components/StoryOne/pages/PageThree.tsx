"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles.module.css";
import SlideText from "../SlideText";
import FloatingImages from "../FloatingImages";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  horizontalRef: React.RefObject<HTMLDivElement | null>;
}

const slide1Images = [
  {
    src: "/images/story-1/boat-river.jpg",
    width: 200,
    height: 150,
    top: "8%",
    right: "6%",
    rotation: 5,
    fromX: 200,
    fromY: -100,
    parallaxSpeed: 0.3,
  },
  {
    src: "/images/story-1/sunset-ocean.jpg",
    width: 180,
    height: 240,
    bottom: "10%",
    left: "4%",
    rotation: -4,
    fromX: -200,
    fromY: 150,
    delay: 0.2,
    parallaxSpeed: 0.5,
  },
];

const slide2Images = [
  {
    src: "/images/story-1/cherry-blossom.jpg",
    width: 220,
    height: 160,
    top: "12%",
    left: "5%",
    rotation: -6,
    fromX: -250,
    fromY: -80,
    parallaxSpeed: 0.4,
  },
  {
    src: "/images/story-1/temple-fog.jpg",
    width: 200,
    height: 280,
    bottom: "8%",
    right: "5%",
    rotation: 4,
    fromX: 200,
    fromY: 120,
    delay: 0.15,
    parallaxSpeed: 0.35,
  },
];

const slide3Images = [
  {
    src: "/images/story-1/bamboo-forest.jpg",
    width: 240,
    height: 170,
    top: "10%",
    right: "4%",
    rotation: 7,
    fromX: 300,
    fromY: -60,
    parallaxSpeed: 0.45,
  },
  {
    src: "/images/story-1/mountain-lake.jpg",
    width: 190,
    height: 250,
    bottom: "12%",
    left: "6%",
    rotation: -5,
    fromX: -250,
    fromY: 100,
    delay: 0.2,
    parallaxSpeed: 0.5,
  },
];

const PageThree = React.forwardRef<HTMLDivElement, HorizontalScrollProps>(
  function HorizontalScroll({ horizontalRef }, ref) {
    const bg1Ref = useRef<HTMLDivElement>(null);
    const bg2Ref = useRef<HTMLDivElement>(null);
    const bg3Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const bgs = [bg1Ref.current, bg2Ref.current, bg3Ref.current];
      bgs.forEach((bg) => {
        if (bg) gsap.set(bg, { scale: 1.15 });
      });
    }, []);

    return (
      <div className={styles.section} ref={ref}>
        <div className={styles.horizontal} ref={horizontalRef}>
          {/* Slide 1: Vịnh Hạ Long */}
          <div className={styles.box2}>
            <div
              ref={bg1Ref}
              className={styles.slideBg}
              style={{ backgroundImage: "url('/images/story-1/vinh-ha-long.jpg')" }}
            />
            <div className={styles.slideOverlay} />
            <FloatingImages images={slide1Images} horizontal />
            <SlideText
              title="Vịnh Hạ Long"
              subtitle="Di sản thiên nhiên thế giới"
              description="Hàng nghìn đảo đá vôi nhô lên giữa mặt nước xanh ngọc. Mỗi hòn đảo là một bức tượng khổng lồ do thiên nhiên tạc nên qua triệu năm."
              horizontal
            />
          </div>

          {/* Slide 2: Nhật Bản */}
          <div className={styles.box2}>
            <div
              ref={bg2Ref}
              className={styles.slideBg}
              style={{ backgroundImage: "url('/images/story-1/nhat-ban.jpg')" }}
            />
            <div className={styles.slideOverlay} />
            <FloatingImages images={slide2Images} horizontal />
            <SlideText
              title="Nhật Bản"
              subtitle="Xứ sở hoa anh đào"
              description="Từ những ngôi chùa cổ kính đến ánh đèn neon rực rỡ — nơi truyền thống và hiện đại hòa quyện trong từng nhịp thở."
              horizontal
            />
          </div>

          {/* Slide 3: Núi Tuyết */}
          <div className={styles.box2}>
            <div
              ref={bg3Ref}
              className={styles.slideBg}
              style={{ backgroundImage: "url('/images/story-1/nui-tuyet.jpg')" }}
            />
            <div className={styles.slideOverlay} />
            <FloatingImages images={slide3Images} horizontal />
            <SlideText
              title="Núi Tuyết"
              subtitle="Đỉnh cao giữa trời mây"
              description="Trên độ cao ngàn mét, tuyết phủ trắng xóa. Không khí loãng, lạnh buốt — nhưng trái tim lại ấm lên bởi vẻ đẹp siêu thực."
              horizontal
            />
          </div>
        </div>
      </div>
    );
  },
);

export default PageThree;
