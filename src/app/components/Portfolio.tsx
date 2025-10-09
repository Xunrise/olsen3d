import styles from '../page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Portfolio() {

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Portfolio</h2>
          <p>Se noen av mine tidligere prosjekter og arbeid.</p>
        </div>
        <div className={styles.portfolioGrid}>
          <Link href="/tjenester/3d-modellering" className={styles.serviceCard}>
            <Image src="/3d-printing-bilde.png" alt="3D-printing" width={500} height={200} />
            <div className={styles.serviceCardContent}>
              <h3>3D-printing og design</h3>
              <p>Design og produksjon...</p>
            </div>
          </Link>
          <Link href="/tjenester/ikt-setup" className={styles.serviceCard}>
            <Image src="/3d-printing-bilde.png" alt="3D-printing" width={500} height={200} />
            <div className={styles.serviceCardContent}>
              <h3>Ikt Setup</h3>
              <p>Design og produksjon...</p>
            </div>
          </Link>
          <Link href="/tjenester/3d-utskrift" className={styles.serviceCard}>
            <Image src="/3d-printing-bilde.png" alt="3D-printing" width={500} height={200} />
            <div className={styles.serviceCardContent}>
              <h3>3D-Utskrift</h3>
              <p>Design og produksjon...</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
} 