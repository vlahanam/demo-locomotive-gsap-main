"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

interface FloatingImageConfig {
  src: string;
  width: number;
  height: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotation?: number;
  delay?: number;
  fromX?: number;
  fromY?: number;
  parallaxSpeed?: number;
}

interface FloatingImagesProps {
  images: FloatingImageConfig[];
  horizontal?: boolean;
}

export default function FloatingImages({ images, horizontal = false }: FloatingImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        const config = images[i];
        const fromX = config.fromX ?? (i % 2 === 0 ? -200 : 200);
        const fromY = config.fromY ?? 150;
        const rotation = config.rotation ?? (i % 2 === 0 ? -8 : 8);
        const delay = config.delay ?? i * 0.12;
        const parallaxSpeed = config.parallaxSpeed ?? 0.3 + i * 0.15;

        // Initial hidden state
        gsap.set(el, {
          opacity: 0,
          x: fromX,
          y: fromY,
          rotation: rotation * 2,
          scale: 0.6,
        });

        if (horizontal) {
          // IntersectionObserver for horizontal scroll panels
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                  gsap.to(el, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotation,
                    scale: 1,
                    duration: 1.2,
                    delay,
                    ease: "power3.out",
                  });
                } else if (!entry.isIntersecting) {
                  gsap.to(el, {
                    opacity: 0,
                    x: fromX * 0.5,
                    y: fromY * 0.3,
                    scale: 0.7,
                    duration: 0.5,
                    ease: "power2.in",
                  });
                }
              });
            },
            { threshold: [0, 0.2, 0.5] },
          );
          observer.observe(containerRef.current!);
          return;
        }

        // Vertical scroll — entrance
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          rotation,
          scale: 1,
          duration: 1.4,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Parallax on scroll
        gsap.to(el, {
          y: -100 * parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images, horizontal]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => { imageRefs.current[i] = el; }}
          className={styles.floatingImage}
          style={{
            width: img.width,
            height: img.height,
            top: img.top,
            left: img.left,
            right: img.right,
            bottom: img.bottom,
          }}
        >
          <img src={img.src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
