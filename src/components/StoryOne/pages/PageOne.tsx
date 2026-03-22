"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles.module.css";

gsap.registerPlugin(ScrollTrigger);

type AnimatedTextProps = {
  children: React.ReactNode;
};

export default function PageOne() {
  const textLeft = ["Dùng địch đánh địch", "Đỉnh cao của chiến lược thâm nhập"];

  return (
    <div className={`${styles.section} flex items-center justify-center`}>
      <div className="w-[70vw] h-[70vh] bg-gray-300">
        {textLeft.map((phrase, index) => {
          return <AnimatedText key={index}>{phrase}</AnimatedText>;
        })}
      </div>
    </div>
  );
}

function AnimatedText({ children }: AnimatedTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        xPercent: -100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "expo.out",
      });

      gsap.to(textRef.current, {
        xPercent: -100,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
          markers: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <p ref={textRef} className="text-red-500 text-3xl">
        {children}
      </p>
    </div>
  );
}
