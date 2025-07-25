import styles from '../page.module.css';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <Image src="/olsen3d-logo.png" alt="Olsen3D Logo" className={styles.heroLogo} width={800} height={200} priority />
        </div>
      </div>
    </section>
  );
} 