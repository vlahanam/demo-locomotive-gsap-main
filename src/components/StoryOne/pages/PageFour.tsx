import React from "react";
import styles from "../styles.module.css";
import SlideText from "../SlideText";

const PageFour = React.forwardRef<HTMLDivElement, object>(
  function TransitionSection(_, ref) {
    return (
      <div
        className={`${styles.section} flex items-center justify-center`}
        ref={ref}
      >
        <div className={`w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat relative ${styles.slideBox}`} style={{ backgroundImage: "url('/images/story-1/suong-mu.jpg')" }}>
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <SlideText title="Sương Mù" subtitle="Huyền bí giữa thiên nhiên" />
        </div>
      </div>
    );
  },
);

export default PageFour;
