import { projects } from '../../../data/projects';
import styles from '../../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

/**
 * SERVICE CATEGORY PAGE: IKT Setup
 * 
 * HOW THIS DIFFERS FROM 3D-MODELLERING PAGE:
 * - The folder name is different (ikt-setup), creating a different URL
 * - The filter condition checks for category === 'ikt-setup'
 * - The content/text is customized for IKT services
 * 
 * EVERYTHING ELSE IS IDENTICAL:
 * - Same component structure
 * - Same CSS classes (reusable across all category pages)
 * - Same filtering mechanism
 * - Same grid layout system
 * 
 * This demonstrates COMPONENT REUSABILITY - we're using the same
 * pattern/template for different data.
 */

export default function IKTSetupPage() {
  // Filter for IKT Setup category specifically
  const categoryProjects = projects.filter(project => project.category === 'ikt-setup');

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>IKT Setup</h1>
          <p className={styles.heroText}>
            Profesjonell IKT-oppsett og teknisk support for bedrifter og privatpersoner
          </p>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.sectionTitle}>
          <h2>Prosjekter innen IKT Setup</h2>
          <p>Se hvordan vi har hjulpet kunder med deres tekniske behov</p>
        </div>

        <div className={styles.serviceGrid}>
          {categoryProjects.map((project) => (
            <Link 
              href={`/portfolio/${project.id}`} 
              key={project.id}
              className={styles.serviceCard}
            >
              <Image 
                src={project.thumbnail} 
                alt={project.title}
                width={500}
                height={200}
                className={styles.serviceCardImage}
              />
              <div className={styles.serviceCardContent}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>

        {categoryProjects.length === 0 && (
          <div className={styles.container}>
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              Ingen prosjekter funnet i denne kategorien ennå.
            </p>
          </div>
        )}
      </section>

      <div className={styles.container} style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/#services" className={styles.btn}>
          ← Tilbake til tjenester
        </Link>
      </div>
    </div>
  );
}
