import React from "react";
import styles from "../styles.module.css";
import SlideText from "../SlideText";

interface HorizontalScrollProps {
  horizontalRef: React.RefObject<HTMLDivElement | null>;
}

const PageThree = React.forwardRef<HTMLDivElement, HorizontalScrollProps>(
  function HorizontalScroll({ horizontalRef }, ref) {
    return (
      <div className={styles.section} ref={ref}>
        <div className={styles.horizontal} ref={horizontalRef}>
          <div className={styles.box2}>
            <div className={`w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat relative ${styles.slideBox}`} style={{ backgroundImage: "url('/images/story-1/vinh-ha-long.jpg')" }}>
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              <SlideText title="Vịnh Hạ Long" subtitle="Di sản thiên nhiên thế giới" horizontal />
            </div>
          </div>
          <div className={styles.box2}>
            <div className={`w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat relative ${styles.slideBox}`} style={{ backgroundImage: "url('/images/story-1/nhat-ban.jpg')" }}>
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              <SlideText title="Nhật Bản" subtitle="Xứ sở hoa anh đào" horizontal />
            </div>
          </div>
          <div className={styles.box2}>
            <div className={`w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat relative ${styles.slideBox}`} style={{ backgroundImage: "url('/images/story-1/nui-tuyet.jpg')" }}>
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              <SlideText title="Núi Tuyết" subtitle="Đỉnh cao giữa trời mây" horizontal />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default PageThree;
