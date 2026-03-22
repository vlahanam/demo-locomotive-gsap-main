"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

interface SlideTextProps {
  title: string;
  subtitle: string;
  horizontal?: boolean;
  intro?: boolean;
}

export default function SlideText({
  title,
  subtitle,
  horizontal = false,
  intro = false,
}: SlideTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current)
      return;

    if (intro) {
      // First slide — fly in from sides on page load
      gsap.set(titleRef.current, {
        opacity: 0,
        x: -300,
        scale: 0.7,
        filter: "blur(20px)",
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        x: 300,
        scale: 0.7,
        filter: "blur(20px)",
      });

      // Title flies in from left
      gsap.to(titleRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        delay: 0.3,
        ease: "power4.out",
      });

      // Subtitle flies in from right
      gsap.to(subtitleRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        delay: 0.6,
        ease: "power4.out",
      });

      // OUT on scroll — scrub with fromTo so reverse works
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
          {
            x: -200,
            opacity: 0,
            scale: 0.85,
            filter: "blur(16px)",
            ease: "power2.in",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "bottom 80%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          },
        );
        gsap.fromTo(
          subtitleRef.current,
          { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
          {
            x: 200,
            opacity: 0,
            scale: 0.85,
            filter: "blur(12px)",
            ease: "power2.in",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "bottom 80%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          },
        );
      }, containerRef);

      return () => ctx.revert();
    }

    // Set initial hidden state
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 120,
      scale: 0.85,
      filter: "blur(16px)",
    });

    if (horizontal) {
      // For horizontal scroll panels — use IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              // Animate IN
              gsap.to(titleRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
              });
              gsap.to(subtitleRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                delay: 0.15,
                ease: "power3.out",
              });
            } else if (!entry.isIntersecting) {
              // Animate OUT
              gsap.to(titleRef.current, {
                y: -80,
                opacity: 0,
                scale: 0.9,
                filter: "blur(12px)",
                duration: 0.6,
                ease: "power2.in",
              });
              gsap.to(subtitleRef.current, {
                y: -50,
                opacity: 0,
                scale: 0.9,
                filter: "blur(8px)",
                duration: 0.6,
                delay: 0.05,
                ease: "power2.in",
              });
            }
          });
        },
        { threshold: [0, 0.3, 0.7] },
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }

    // For vertical scroll slides — use ScrollTrigger
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.8,
        },
      });

      // IN phase (0 → 0.25)
      tl.to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.25,
          ease: "power3.out",
        },
        0,
      );
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.25,
          ease: "power3.out",
        },
        0.08,
      );

      // Hold (0.25 → 0.65)
      tl.to({}, { duration: 0.4 });

      // OUT phase (0.65 → 1)
      tl.to(titleRef.current, {
        y: -120,
        opacity: 0,
        scale: 0.85,
        filter: "blur(16px)",
        duration: 0.25,
        ease: "power3.in",
      });
      tl.to(
        subtitleRef.current,
        {
          y: -80,
          opacity: 0,
          scale: 0.85,
          filter: "blur(12px)",
          duration: 0.25,
          ease: "power3.in",
        },
        "<0.05",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [horizontal]);

  return (
    <div className={styles.slideText} ref={containerRef}>
      <h2 className={styles.slideTitle} ref={titleRef}>
        {title}
      </h2>
      <p className={styles.slideSubtitle} ref={subtitleRef}>
        {subtitle}
      </p>
    </div>
  );
}
