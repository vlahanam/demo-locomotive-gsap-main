import styles from "../styles.module.css";
import SlideText from "../SlideText";

export default function PageTwo() {
  return (
    <div className={`${styles.section} flex items-center justify-center`}>
      <div className={`w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat relative ${styles.slideBox}`} style={{ backgroundImage: "url('/images/story-1/cau-vang.jpg')" }}>
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <SlideText title="Cầu Vàng" subtitle="Kỳ quan giữa mây trời" />
      </div>
    </div>
  );
}
