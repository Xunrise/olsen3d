import styles from '../page.module.css';
import Image from 'next/image';

export default function Portfolio() {
  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Portfolio</h2>
          <p>Se noen av mine tidligere prosjekter og arbeid.</p>
        </div>
        <div className={styles.portfolioGrid}>
          <a href="#" className={styles.portfolioItem}>
            <Image src="/Artboard 1@3x.png" alt="3D-modell design" width={400} height={300} />
            <div className={styles.portfolioItemOverlay}>
              <h3>3D-modell design</h3>
              <p>Se prosjekter innen 3D-modellering og design</p>
            </div>
          </a>
          <a href="#" className={styles.portfolioItem}>
            <Image src="/500x500 logo.png" alt="IKT setup" width={400} height={300} />
            <div className={styles.portfolioItemOverlay}>
              <h3>IKT Setup</h3>
              <p>Se prosjekter innen IKT-oppsett og løsninger</p>
            </div>
          </a>
          <a href="#" className={styles.portfolioItem}>
            <Image src="/olsen3d-profile-logo.png" alt="3D-print" width={400} height={300} />
            <div className={styles.portfolioItemOverlay}>
              <h3>3D-utskrift</h3>
              <p>Se prosjekter innen 3D-printing og prototyping</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
} 