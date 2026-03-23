"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ProgressBar from "./ProgressBar";
import ParticleCanvas from "../ParticleCanvas";
import { slides, THUMB_SLOTS, THUMB_WIDTH, THUMB_HEIGHT } from "./slide-data";
import { enterEffects, applySlideTransition } from "./animation-effects";

// Timing (seconds)
const TITLE_IN = 1.4;
const TITLE_HOLD = 1.8;
const TITLE_OUT = 0.8;
const IMG_HOLD = 2.2;
const SLIDE_TRANSITION = 1.2;
const SHRINK_DUR = 0.8;
const CAPTION_DUR = 0.45;

export default function StoryOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const slideRefs = useRef<HTMLDivElement[]>([]);
  const bgRefs = useRef<HTMLDivElement[]>([]);
  const titleRefs = useRef<HTMLDivElement[]>([]);
  const subtitleRefs = useRef<HTMLDivElement[]>([]);
  const descRefs = useRef<HTMLDivElement[]>([]);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLDivElement[][]>(slides.map(() => []));
  const capRefs = useRef<HTMLDivElement[][]>(slides.map(() => []));
  const thumbRefs = useRef<HTMLDivElement[][]>(slides.map(() => []));

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    document.body.style.overflow = "hidden";

    slides.forEach((_, si) => {
      gsap.set(slideRefs.current[si], { opacity: 0, zIndex: 1 });
    });

    const master = gsap.timeline({
      repeat: -1,
      onUpdate() {
        if (progressRef.current) {
          progressRef.current.style.width = `${this.progress() * 100}%`;
        }
      },
    });

    slides.forEach((slide, si) => {
      const els = {
        slide: slideRefs.current[si],
        bg: bgRefs.current[si],
        title: titleRefs.current[si],
        subtitle: subtitleRefs.current[si],
        desc: descRefs.current[si],
        line: lineRefs.current[si],
        imgs: imgRefs.current[si],
        caps: capRefs.current[si],
        thumbs: thumbRefs.current[si],
      };
      if (!els.slide || !els.bg || !els.title) return;

      const tl = gsap.timeline();

      // Reset all elements
      tl.set(els.slide, { opacity: 1, zIndex: 10 });
      tl.set(els.imgs, { opacity: 0, x: 0, y: 0, scale: 1, rotation: 0, filter: "none", clipPath: "none" });
      tl.set(els.caps, { opacity: 0 });
      tl.set(els.thumbs, { opacity: 0 });

      // === PHASE 1: Background + Title ===
      tl.fromTo(els.bg, { scale: 1.2, opacity: 0 }, { scale: 1.05, opacity: 1, duration: TITLE_IN, ease: "power2.out" });
      tl.fromTo(els.title, { y: 80, opacity: 0, scale: 0.85, filter: "blur(16px)" }, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: TITLE_IN, ease: "power4.out" }, "<0.2");
      if (els.subtitle) tl.fromTo(els.subtitle, { y: 50, opacity: 0, filter: "blur(12px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out" }, "<0.3");
      if (els.line) tl.fromTo(els.line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "<0.2");
      if (els.desc) tl.fromTo(els.desc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.3");

      // Ken Burns hold
      tl.to(els.bg, { scale: 1.0, duration: TITLE_HOLD, ease: "none" });

      // === PHASE 2: Title exit ===
      const textEls = [els.title, els.subtitle, els.line, els.desc].filter(Boolean);
      tl.to(textEls, { y: -80, opacity: 0, filter: "blur(12px)", duration: TITLE_OUT, stagger: 0.06, ease: "power2.in" });

      // Dim background
      tl.to(els.bg, { filter: "brightness(0.25) blur(5px)", duration: 0.8, ease: "power2.inOut" }, ">-0.3");

      // === PHASE 3: Image showcase with thumbnail system ===
      els.imgs.forEach((imgEl, ii) => {
        if (!imgEl) return;
        const imgData = slide.images[ii];
        const capEl = els.caps[ii];
        const thumbEl = els.thumbs[ii];
        const isLast = ii === els.imgs.length - 1;

        if (ii > 0) {
          // SIMULTANEOUS: shrink prev image to thumbnail + fade prev caption + enter new image
          const prevImg = els.imgs[ii - 1];
          const prevCap = els.caps[ii - 1];
          const prevThumb = els.thumbs[ii - 1];

          // Shrink previous image to thumbnail slot
          if (prevImg) {
            const slot = THUMB_SLOTS[ii - 1];
            const isLeft = slot.left !== "auto";
            tl.to(prevImg, {
              width: THUMB_WIDTH,
              height: THUMB_HEIGHT,
              x: isLeft ? `-${(window.innerWidth / 2) - 30 - (THUMB_WIDTH / 2)}px` : `${(window.innerWidth / 2) - 30 - (THUMB_WIDTH / 2)}px`,
              y: `${parseFloat(slot.top) - 50}vh`,
              borderRadius: "10px",
              opacity: 0.5,
              duration: SHRINK_DUR,
              ease: "power3.inOut",
            });
          }
          // Show thumbnail at slot (permanent)
          if (prevThumb) {
            tl.to(prevThumb, { opacity: 1, duration: 0.3, ease: "power2.out" }, `<+${SHRINK_DUR * 0.7}`);
          }
          // Fade previous caption simultaneously
          if (prevCap) {
            tl.to(prevCap, { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" }, `<-${SHRINK_DUR * 0.7}`);
          }
          // Hide the flying image (thumbnail replica takes over)
          if (prevImg) {
            tl.set(prevImg, { opacity: 0 });
          }

          // Enter new image (overlapping with shrink)
          const enterFn = enterEffects[imgData.enterEffect];
          if (enterFn) enterFn(imgEl, tl, `<-${SHRINK_DUR * 0.4}`);
        } else {
          // First image — just enter
          const enterFn = enterEffects[imgData.enterEffect];
          if (enterFn) enterFn(imgEl, tl, ">+0.2");
        }

        // Caption enter
        if (capEl) {
          tl.fromTo(capEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: CAPTION_DUR, ease: "power3.out" }, ">-0.15");
        }

        // Hold
        tl.to({}, { duration: isLast ? IMG_HOLD * 0.5 : IMG_HOLD });
      });

      // Handle last image + its caption before slide transition
      const lastIdx = els.imgs.length - 1;
      const lastImg = els.imgs[lastIdx];
      const lastCap = els.caps[lastIdx];
      if (lastImg) tl.to(lastImg, { opacity: 0, scale: 0.9, duration: 0.5, ease: "power2.in" });
      if (lastCap) tl.to(lastCap, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<");
      // Fade all thumbnails
      tl.to(els.thumbs, { opacity: 0, duration: 0.4, stagger: 0.04, ease: "power2.in" }, "<");

      // === PHASE 4: Slide transition ===
      tl.to(els.bg, { filter: "none", duration: 0.01 });
      applySlideTransition(tl, slide.transition, els.slide, els.bg, SLIDE_TRANSITION);

      master.add(tl);
    });

    return () => {
      master.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#0a0a0a" }}>
      <ParticleCanvas />
      <ProgressBar ref={progressRef} />

      {slides.map((slide, si) => (
        <div
          key={slide.id}
          ref={(el) => { if (el) slideRefs.current[si] = el; }}
          style={{ position: "absolute", inset: 0, opacity: 0, zIndex: 1, overflow: "hidden" }}
        >
          {/* Background */}
          <div
            ref={(el) => { if (el) bgRefs.current[si] = el; }}
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url('${slide.background}')`,
              backgroundSize: "cover", backgroundPosition: "center",
              willChange: "transform, opacity, filter",
            }}
          />
          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.5) 100%)",
          }} />

          {/* Text layer */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 5, pointerEvents: "none", padding: "40px" }}>
            <h2
              ref={(el) => { if (el) titleRefs.current[si] = el; }}
              style={{
                color: "white", fontFamily: "var(--font-calligraphy), cursive",
                fontSize: "clamp(72px, 12vw, 180px)", fontWeight: 700,
                textShadow: "0 6px 40px rgba(0,0,0,0.8), 0 0 80px rgba(99,102,241,0.3)",
                textAlign: "center", lineHeight: 1.05, letterSpacing: "-2px", opacity: 0,
              }}
            >{slide.title}</h2>
            <div
              ref={(el) => { if (el) lineRefs.current[si] = el; }}
              style={{ width: "80px", height: "2px", background: "linear-gradient(to right, rgba(99,102,241,0.8), rgba(168,85,247,0.8))", margin: "20px auto 0", transformOrigin: "center" }}
            />
            <p
              ref={(el) => { if (el) subtitleRefs.current[si] = el; }}
              style={{
                color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-calligraphy), cursive",
                fontSize: "clamp(28px, 4vw, 64px)", fontWeight: 500,
                marginTop: "16px", textShadow: "0 4px 30px rgba(0,0,0,0.6)", textAlign: "center", opacity: 0,
              }}
            >{slide.subtitle}</p>
            <p
              ref={(el) => { if (el) descRefs.current[si] = el; }}
              style={{
                color: "rgba(255,255,255,0.7)", fontSize: "clamp(16px, 1.8vw, 24px)",
                fontWeight: 300, marginTop: "32px", maxWidth: "700px",
                textAlign: "center", lineHeight: 1.7,
                textShadow: "0 2px 15px rgba(0,0,0,0.5)", letterSpacing: "0.5px", opacity: 0,
              }}
            >{slide.description}</p>
          </div>

          {/* Thumbnail slots (permanent mini images on sides) */}
          {slide.images.slice(0, -1).map((img, ii) => {
            const slot = THUMB_SLOTS[ii];
            return (
              <div
                key={`thumb-${ii}`}
                ref={(el) => {
                  if (el) {
                    if (!thumbRefs.current[si]) thumbRefs.current[si] = [];
                    thumbRefs.current[si][ii] = el;
                  }
                }}
                style={{
                  position: "absolute",
                  top: slot.top,
                  left: slot.left,
                  right: slot.right,
                  width: THUMB_WIDTH,
                  height: THUMB_HEIGHT,
                  borderRadius: "10px",
                  overflow: "hidden",
                  opacity: 0,
                  zIndex: 12,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            );
          })}

          {/* Main image showcase layer */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 8, pointerEvents: "none" }}>
            {slide.images.map((img, ii) => (
              <div key={ii} style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  ref={(el) => {
                    if (el) {
                      if (!imgRefs.current[si]) imgRefs.current[si] = [];
                      imgRefs.current[si][ii] = el;
                    }
                  }}
                  style={{
                    width: "min(75vw, 1000px)", height: "min(62vh, 620px)",
                    borderRadius: "20px", overflow: "hidden",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(99,102,241,0.12)",
                    opacity: 0, willChange: "transform, opacity, filter, clip-path",
                  }}
                >
                  <img src={img.src} alt={img.caption} loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div
                  ref={(el) => {
                    if (el) {
                      if (!capRefs.current[si]) capRefs.current[si] = [];
                      capRefs.current[si][ii] = el;
                    }
                  }}
                  style={{ marginTop: "24px", textAlign: "center", opacity: 0 }}
                >
                  <p style={{
                    color: "white", fontFamily: "var(--font-calligraphy), cursive",
                    fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 600,
                    textShadow: "0 4px 20px rgba(0,0,0,0.6)",
                  }}>{img.caption}</p>
                  {img.subcaption && (
                    <p style={{
                      color: "rgba(255,255,255,0.6)", fontSize: "clamp(14px, 1.5vw, 20px)",
                      fontWeight: 300, marginTop: "8px",
                      textShadow: "0 2px 10px rgba(0,0,0,0.4)", letterSpacing: "0.5px",
                    }}>{img.subcaption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
