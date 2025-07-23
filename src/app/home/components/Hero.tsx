import styles from "./Hero.module.css";
import Image from "next/image";
import HeroSwiper from "./HeroSwiper";
import { categories } from "@/data/projects";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className=".container">
        <div className={styles.heroContent}>
          <Image
            src="/olsen3d-logo.png"
            alt="Olsen3D Logo"
            className={styles.heroLogo}
            width={800}
            height={200}
            priority
          />
        </div>
      </div>
    </section>
  );
}
