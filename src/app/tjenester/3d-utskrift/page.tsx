import { projects } from '../../../data/projects';
import styles from '../../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

/**
 * SERVICE CATEGORY PAGE: 3D-utskrift
 * 
 * PATTERN REPETITION:
 * This is the third iteration of the same pattern. Notice how:
 * 1. The structure is identical to the other two pages
 * 2. Only the filter condition and content differ
 * 3. The CSS classes are all reused
 * 
 * This is "static routing" - each category gets its own file.
 * 
 * ALTERNATIVE APPROACH (for later):
 * You could use a DYNAMIC route: /tjenester/[category]/page.tsx
 * That would be ONE file that handles ALL categories by:
 * - Reading the category from the URL parameter
 * - Using that parameter in the filter
 * - Changing the content based on the parameter
 * 
 * Static vs Dynamic trade-offs:
 * STATIC (what we're doing):
 *   + Easy to customize each page differently
 *   + Clear what each file does
 *   - More code duplication
 *   - Need to create new file for each category
 * 
 * DYNAMIC (alternative):
 *   + Less code duplication
 *   + Easy to add new categories (just add to data)
 *   - Harder to customize individual pages
 *   - Slightly more complex logic
 */

export default function TreeDUtskriftPage() {
  // Filter for 3D printing category
  const categoryProjects = projects.filter(project => project.category === '3d-utskrift');

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>3D-utskrift</h1>
          <p className={styles.heroText}>
            Høykvalitets 3D-printing og prototyping for alle formål
          </p>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.sectionTitle}>
          <h2>Prosjekter innen 3D-utskrift</h2>
          <p>Se eksempler på våre 3D-printede produkter og prototyper</p>
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
