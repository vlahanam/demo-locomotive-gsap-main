import gsap from "gsap";

// ============================================================
// IMAGE ENTER EFFECTS — animate element INTO view
// Each function: (el, tl, position?) → adds tweens to timeline
// ============================================================

export function enterZoomBurst(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.fromTo(
    el,
    { scale: 0, opacity: 0, rotation: -15 },
    { scale: 1, opacity: 1, rotation: 0, duration: 1.0, ease: "back.out(2)" },
    pos,
  );
}

export function enterFlyUp(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.fromTo(
    el,
    { y: "100vh", opacity: 0, rotation: 8 },
    { y: 0, opacity: 1, rotation: 0, duration: 1.2, ease: "power3.out" },
    pos,
  );
}

export function enterFlyDown(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.fromTo(
    el,
    { y: "-100vh", opacity: 0, rotation: -6 },
    { y: 0, opacity: 1, rotation: 0, duration: 1.2, ease: "bounce.out" },
    pos,
  );
}

export function enterSpinIn(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.fromTo(
    el,
    { rotation: 360, scale: 0, opacity: 0 },
    { rotation: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
    pos,
  );
}

export function enterFlipBook(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.set(el, { transformPerspective: 1200, transformOrigin: "left center" });
  tl.fromTo(
    el,
    { rotateY: -180, opacity: 0 },
    { rotateY: 0, opacity: 1, duration: 1.3, ease: "power3.out" },
    pos,
  );
}

export function enterElasticPop(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.fromTo(
    el,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.4)" },
    pos,
  );
}

export function enterSlideLeft(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.fromTo(
    el,
    { x: "100vw", opacity: 0, rotation: 5 },
    { x: 0, opacity: 1, rotation: 0, duration: 1.0, ease: "power3.out" },
    pos,
  );
}

export function enterCurtainReveal(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.set(el, { opacity: 1 });
  tl.fromTo(
    el,
    { clipPath: "inset(0 50% 0 50%)" },
    { clipPath: "inset(0 0% 0 0%)", duration: 1.2, ease: "power3.inOut" },
    pos,
  );
}

export function enterCircleReveal(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.set(el, { opacity: 1 });
  tl.fromTo(
    el,
    { clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(75% at 50% 50%)", duration: 1.3, ease: "power2.out" },
    pos,
  );
}

export function enterDiamondReveal(el: HTMLElement, tl: gsap.core.Timeline, pos?: string) {
  tl.set(el, { opacity: 1 });
  tl.fromTo(
    el,
    { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
    { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", duration: 1.2, ease: "power2.out" },
    pos,
  );
}

// ============================================================
// EFFECT REGISTRY — map effect names to functions
// ============================================================

export type EnterEffect =
  | "zoomBurst" | "flyUp" | "flyDown" | "spinIn"
  | "flipBook" | "elasticPop" | "slideLeft"
  | "curtainReveal" | "circleReveal" | "diamondReveal";

type EffectFn = (el: HTMLElement, tl: gsap.core.Timeline, pos?: string) => void;

export const enterEffects: Record<EnterEffect, EffectFn> = {
  zoomBurst: enterZoomBurst,
  flyUp: enterFlyUp,
  flyDown: enterFlyDown,
  spinIn: enterSpinIn,
  flipBook: enterFlipBook,
  elasticPop: enterElasticPop,
  slideLeft: enterSlideLeft,
  curtainReveal: enterCurtainReveal,
  circleReveal: enterCircleReveal,
  diamondReveal: enterDiamondReveal,
};

// ============================================================
// SLIDE TRANSITION EFFECTS
// ============================================================

export type SlideTransition =
  | "fade" | "slideLeft" | "zoomOut" | "blur"
  | "flipPage" | "shutter" | "spiralOut" | "glitch";

export function applySlideTransition(
  tl: gsap.core.Timeline,
  transition: SlideTransition,
  slideEl: HTMLElement,
  bgEl: HTMLElement,
  duration: number,
) {
  switch (transition) {
    case "fade":
      tl.to(slideEl, { opacity: 0, duration, ease: "power2.inOut" });
      break;

    case "slideLeft":
      tl.to(slideEl, { x: "-100vw", duration, ease: "power3.inOut" });
      tl.set(slideEl, { x: 0, opacity: 0 });
      break;

    case "zoomOut":
      tl.to(slideEl, { scale: 0.5, opacity: 0, duration, ease: "power3.in" });
      tl.set(slideEl, { scale: 1 });
      break;

    case "blur":
      tl.to(slideEl, {
        filter: "blur(40px) brightness(2)",
        opacity: 0,
        duration,
        ease: "power2.in",
      });
      tl.set(slideEl, { filter: "none" });
      break;

    case "flipPage":
      tl.set(slideEl, { transformPerspective: 1500, transformOrigin: "left center" });
      tl.to(slideEl, { rotateY: -90, opacity: 0, duration, ease: "power3.in" });
      tl.set(slideEl, { rotateY: 0, transformPerspective: "none" });
      break;

    case "shutter":
      tl.to(bgEl, {
        clipPath: "inset(50% 0%)",
        duration: duration * 0.6,
        ease: "power3.inOut",
      });
      tl.to(slideEl, { opacity: 0, duration: duration * 0.4 });
      tl.set(bgEl, { clipPath: "inset(0%)" });
      break;

    case "spiralOut":
      tl.to(slideEl, {
        rotation: 180,
        scale: 0,
        opacity: 0,
        duration,
        ease: "power3.in",
      });
      tl.set(slideEl, { rotation: 0, scale: 1 });
      break;

    case "glitch": {
      // Rapid random offsets
      const steps = 8;
      const stepDur = duration / steps;
      for (let i = 0; i < steps; i++) {
        const rx = (Math.random() - 0.5) * 60;
        const ry = (Math.random() - 0.5) * 30;
        const skew = (Math.random() - 0.5) * 10;
        tl.to(slideEl, {
          x: rx,
          y: ry,
          skewX: skew,
          opacity: i % 2 === 0 ? 0.7 : 1,
          duration: stepDur,
          ease: "steps(1)",
        });
      }
      tl.to(slideEl, { x: 0, y: 0, skewX: 0, opacity: 0, duration: 0.2 });
      break;
    }

    default:
      tl.to(slideEl, { opacity: 0, duration, ease: "power2.inOut" });
  }

  tl.set(slideEl, { zIndex: 1, opacity: 0, filter: "none" });
}
