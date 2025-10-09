import { projects } from '../../../data/projects';
import styles from '../../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

/**
 * SERVICE CATEGORY PAGE: 3D-modellering
 * 
 * MECHANICS EXPLANATION:
 * 
 * 1. URL ROUTING:
 *    - This file's location creates the URL automatically
 *    - File path: /app/tjenester/3d-modellering/page.tsx
 *    - Results in URL: /tjenester/3d-modellering
 *    - The folder name IS the URL slug
 * 
 * 2. DATA FILTERING:
 *    - We import ALL projects from the data file
 *    - Then filter them using Array.filter() method
 *    - Only projects where category === '3d-modellering' are kept
 *    - This creates a NEW array with only matching projects
 * 
 * 3. RESPONSIVE GRID:
 *    - Uses CSS Grid from existing serviceGrid class
 *    - CSS handles the layout automatically:
 *      * Desktop: 3 columns
 *      * Tablet: 2 columns (via media query)
 *      * Mobile: 1 column (via media query)
 *    - The component doesn't need to know screen size
 * 
 * 4. STATIC vs DYNAMIC:
 *    - This is a "static" route (hardcoded folder name)
 *    - Later, you could use [category] for a dynamic route
 *    - Dynamic would be ONE file handling ALL categories
 *    - Static is THREE separate files, one per category
 */

export default function TreeDModelleringPage() {
  // FILTERING MECHANISM:
  // projects.filter() creates a new array containing only items where the function returns true
  // For each project, check: does project.category === '3d-modellering'?
  // If yes, include it. If no, exclude it.
  const categoryProjects = projects.filter(project => project.category === '3d-modellering');

  return (
    <div className={styles.container}>
      {/* Hero section for the category */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>3D-modellering</h1>
          <p className={styles.heroText}>
            Profesjonell 3D-modellering og design for dine prosjekter
          </p>
        </div>
      </section>

      {/* Projects section */}
      <section className={styles.services}>
        <div className={styles.sectionTitle}>
          <h2>Prosjekter innen 3D-modellering</h2>
          <p>Utforsk våre prosjekter og se hva vi kan tilby</p>
        </div>

        {/* 
          THE GRID LAYOUT MECHANICS:
          
          - serviceGrid class uses CSS Grid
          - grid-template-columns: repeat(3, 1fr) = 3 equal columns
          - gap: 2rem = space between items
          - Media queries automatically adjust columns based on screen width
          
          The .map() function:
          - Takes each project in the categoryProjects array
          - Runs the function for each one
          - Returns a new array of JSX elements
          - React renders all of them inside the parent div
        */}
        <div className={styles.serviceGrid}>
          {categoryProjects.map((project) => (
            <Link 
              href={`/portfolio/${project.id}`} 
              key={project.id}
              className={styles.serviceCard}
            >
              {/* 
                NEXT.JS IMAGE OPTIMIZATION:
                - Next.js automatically optimizes images
                - Converts to modern formats (WebP)
                - Lazy loads images (loads when scrolling near)
                - Responsive sizing based on device
              */}
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

        {/* 
          CONDITIONAL RENDERING:
          If no projects match this category, show a message
          The && operator: only renders the right side if left side is true
        */}
        {categoryProjects.length === 0 && (
          <div className={styles.container}>
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              Ingen prosjekter funnet i denne kategorien ennå.
            </p>
          </div>
        )}
      </section>

      {/* Back link to services overview */}
      <div className={styles.container} style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/#services" className={styles.btn}>
          ← Tilbake til tjenester
        </Link>
      </div>
    </div>
  );
}
