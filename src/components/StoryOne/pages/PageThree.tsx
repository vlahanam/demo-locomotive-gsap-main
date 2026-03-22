import React from "react";
import styles from "../styles.module.css";

interface HorizontalScrollProps {
  horizontalRef: React.RefObject<HTMLDivElement | null>;
}

const PageThree = React.forwardRef<HTMLDivElement, HorizontalScrollProps>(
  function HorizontalScroll({ horizontalRef }, ref) {
    return (
      <div className={styles.section} ref={ref}>
        <div className={styles.horizontal} ref={horizontalRef}>
          <div className={styles.box2}>
            <div className="w-[70vw] h-[70vh] bg-red-500" />
          </div>
          <div className={styles.box2}>
            <div className="w-[70vw] h-[70vh] bg-blue-500" />
          </div>
          <div className={styles.box2}>
            <div className="w-[70vw] h-[70vh] bg-green-500" />
          </div>
        </div>
      </div>
    );
  },
);

export default PageThree;
