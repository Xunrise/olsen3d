import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>OLSEN3D</h1>
          <p className={styles.heroSubtitle}>
            Professional 3D Design & Manufacturing
          </p>
          <p className={styles.heroDescription}>
            From concept to creation, we bring your ideas to life through
            cutting-edge 3D design, precision manufacturing, and comprehensive
            technical guidance. Whether you&apos;re a complete beginner or
            seasoned professional, we&apos;ve got you covered.
          </p>
          <Link href="#services" className={styles.ctaButton}>
            <span>Explore Services</span>
            <span>→</span>
          </Link>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.cadViewport}>
            <div className={styles.viewportGrid}></div>
            <div className={styles.axisIndicators}>
              <div className={`${styles.axis} ${styles.axisX}`}>X</div>
              <div className={`${styles.axis} ${styles.axisY}`}>Y</div>
              <div className={`${styles.axis} ${styles.axisZ}`}>Z</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
