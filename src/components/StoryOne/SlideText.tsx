"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

interface SlideTextProps {
  title: string;
  subtitle: string;
  description?: string;
  horizontal?: boolean;
  intro?: boolean;
}

export default function SlideText({
  title,
  subtitle,
  description,
  horizontal = false,
  intro = false,
}: SlideTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current)
      return;

    const elements = [titleRef.current, subtitleRef.current];
    if (descRef.current) elements.push(descRef.current);
    if (lineRef.current) elements.push(lineRef.current);

    if (intro) {
      // Stagger character animation for title
      const titleChars = titleRef.current.querySelectorAll(".char");
      if (titleChars.length > 0) {
        gsap.set(titleChars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          transformOrigin: "50% 50% -30px",
        });
        gsap.to(titleChars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
          delay: 0.3,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          filter: "blur(20px)",
        });
        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          delay: 0.3,
          ease: "power4.out",
        });
      }

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 60,
        filter: "blur(15px)",
      });
      gsap.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      });

      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 40 });
        gsap.to(descRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.2,
          ease: "power2.out",
        });
      }

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
        gsap.to(lineRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          delay: 1,
          ease: "power2.out",
        });
      }

      // OUT on scroll
      const ctx = gsap.context(() => {
        const allEls = [titleRef.current, subtitleRef.current];
        if (descRef.current) allEls.push(descRef.current);
        if (lineRef.current) allEls.push(lineRef.current);

        gsap.fromTo(
          allEls,
          { y: 0, opacity: 1, filter: "blur(0px)" },
          {
            y: -150,
            opacity: 0,
            filter: "blur(12px)",
            ease: "power2.in",
            stagger: 0.05,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "bottom 85%",
              end: "bottom 25%",
              scrub: 0.8,
            },
          },
        );
      }, containerRef);

      return () => ctx.revert();
    }

    // Set initial hidden state
    gsap.set(elements, {
      opacity: 0,
      y: 100,
      filter: "blur(12px)",
    });

    if (horizontal) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              gsap.to(titleRef.current, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
              });
              gsap.to(subtitleRef.current, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                delay: 0.15,
                ease: "power3.out",
              });
              if (descRef.current) {
                gsap.to(descRef.current, {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 1,
                  delay: 0.3,
                  ease: "power3.out",
                });
              }
            } else if (!entry.isIntersecting) {
              gsap.to(elements, {
                y: -60,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.5,
                stagger: 0.05,
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

    // Vertical scroll slides
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 0.8,
        },
      });

      // IN phase
      tl.to(
        titleRef.current,
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power3.out" },
        0,
      );
      tl.to(
        subtitleRef.current,
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power3.out" },
        0.05,
      );
      if (descRef.current) {
        tl.to(
          descRef.current,
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power3.out" },
          0.1,
        );
      }

      // HOLD
      tl.to({}, { duration: 0.35 });

      // OUT phase
      tl.to(titleRef.current, {
        y: -120,
        opacity: 0,
        filter: "blur(16px)",
        duration: 0.25,
        ease: "power3.in",
      });
      tl.to(
        subtitleRef.current,
        { y: -80, opacity: 0, filter: "blur(12px)", duration: 0.25, ease: "power3.in" },
        "<0.05",
      );
      if (descRef.current) {
        tl.to(
          descRef.current,
          { y: -60, opacity: 0, filter: "blur(8px)", duration: 0.2, ease: "power3.in" },
          "<0.05",
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [horizontal, intro]);

  // Split title into characters for intro animation
  const renderTitle = () => {
    if (intro) {
      return (
        <h2 className={styles.slideTitle} ref={titleRef} style={{ perspective: "600px" }}>
          {title.split("").map((char, i) => (
            <span key={i} className="char" style={{ display: "inline-block" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      );
    }
    return (
      <h2 className={styles.slideTitle} ref={titleRef}>
        {title}
      </h2>
    );
  };

  return (
    <div className={styles.slideText} ref={containerRef}>
      {renderTitle()}
      {description && <div className={styles.decorLine} ref={lineRef} />}
      <p className={styles.slideSubtitle} ref={subtitleRef}>
        {subtitle}
      </p>
      {description && (
        <p className={styles.slideDescription} ref={descRef}>
          {description}
        </p>
      )}
    </div>
  );
}
