import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects, getAllServices } from '@/lib/mdx';
import styles from '../page.module.css';
import ProjectsFilter from './ProjectsFilter';
import { ArrowLeft } from 'lucide-react';

interface ProsjekterPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ProsjekterPage({ searchParams }: ProsjekterPageProps) {
  const params = await searchParams;
  const selectedService = params.service || 'all';

  const projects = getAllProjects();
  const services = getAllServices();

  const filteredProjects =
    selectedService === 'all'
      ? projects
      : projects.filter((project) => project.services.includes(selectedService));

  return (
    <main className={styles.main}>
      <section className={styles.projects}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.backButton}>
              <ArrowLeft size={20} /> Tilbake til forsiden
            </Link>
          </div>

          <div className={styles.sectionTitle}>
            <h1>Mine prosjekter</h1>
            <p>Se eksempler på tidligere arbeid og hva jeg kan hjelpe deg med.</p>
          </div>

          <ProjectsFilter services={services} />

          <div className={styles.projectGrid}>
            {filteredProjects.length === 0 ? (
              <p>Ingen prosjekter funnet for dette filteret.</p>
            ) : (
              filteredProjects.map((project) => (
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
                    {project.featured && (
                      <span className={styles.featuredBadge}>Fremhevet</span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
