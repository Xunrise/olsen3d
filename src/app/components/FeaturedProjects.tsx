import styles from '../page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProjects } from '@/lib/mdx';

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Utvalgte prosjekter</h2>
          <p>Se eksempler på tidligere arbeid og hva jeg kan hjelpe deg med.</p>
        </div>
        <div className={styles.projectGrid}>
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/prosjekter/${project.slug}`}
              className={styles.projectCard}
            >
              {project.images[0] && (
                <div className={styles.projectImage}>
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    width={400}
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className={styles.projectCardContent}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.sectionCta}>
          <Link href="/prosjekter" className={styles.btn}>
            Se alle prosjekter
          </Link>
        </div>
      </div>
    </section>
  );
}
