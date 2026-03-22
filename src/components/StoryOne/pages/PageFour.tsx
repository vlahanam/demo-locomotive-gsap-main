import React from "react";
import styles from "../styles.module.css";

const PageFour = React.forwardRef<HTMLDivElement, object>(
  function TransitionSection(_, ref) {
    return (
      <div
        className={`${styles.section} flex items-center justify-center`}
        ref={ref}
      >
        <div className="w-[70vw] h-[70vh] bg-gray-300" />
      </div>
    );
  },
);

export default PageFour;
