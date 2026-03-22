import styles from "../styles.module.css";
import SlideText from "../SlideText";

export default function PageOne() {
  return (
    <div className={`${styles.section} flex items-center justify-center`}>
      <div className={`w-[70vw] h-[70vh] bg-cover bg-center bg-no-repeat relative overflow-visible ${styles.slideBox}`} style={{ backgroundImage: "url('/images/story-1/ha-noi.jpg')" }}>
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        {/* Floating edge tags */}
        <span className={styles.edgeTag} style={{ top: '15%', left: '-120px', borderLeftColor: '#ef4444', borderLeftWidth: '4px', animationDuration: '3.5s' }}>Chiến lược</span>
        <span className={styles.edgeTag} style={{ top: '42%', left: '-100px', borderLeftColor: '#f59e0b', borderLeftWidth: '4px', animationDuration: '4s', animationDelay: '0.5s' }}>Thâm nhập</span>
        <span className={styles.edgeTag} style={{ top: '70%', left: '-110px', borderLeftColor: '#22c55e', borderLeftWidth: '4px', animationDuration: '4.5s', animationDelay: '1s' }}>Tình báo</span>
        <span className={styles.edgeTag} style={{ top: '8%', right: '-120px', borderRightColor: '#60a5fa', borderRightWidth: '4px', animationDuration: '3.8s', animationDelay: '0.3s' }}>Phản gián</span>
        <span className={styles.edgeTag} style={{ top: '78%', right: '-100px', borderRightColor: '#a78bfa', borderRightWidth: '4px', animationDuration: '4.2s', animationDelay: '0.8s' }}>Mật vụ</span>

        <SlideText title="Hà Nội" subtitle="Thủ Đô Ngàn Năm" intro />
      </div>
    </div>
  );
}
