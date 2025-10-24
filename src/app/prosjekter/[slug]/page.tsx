import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllProjects, getProjectBySlug, getAllServices } from '@/lib/mdx';
import styles from '../../page.module.css';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project;

  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const allServices = getAllServices();
  const projectServices = allServices.filter((service) =>
    project.services.includes(service.slug)
  );

  return (
    <main className={styles.main}>
      <article className={styles.projectDetail}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Hjem</Link> / <Link href="/prosjekter">Prosjekter</Link> /{' '}
            {project.title}
          </div>

          <header className={styles.projectHeader}>
            <h1>{project.title}</h1>
            <p className={styles.lead}>{project.description}</p>

            <div className={styles.projectMeta}>
              <span>Dato: {new Date(project.date).toLocaleDateString('nb-NO')}</span>
              {projectServices.length > 0 && (
                <div className={styles.projectServices}>
                  <span>Tjenester: </span>
                  {projectServices.map((service, index) => (
                    <span key={service.slug}>
                      <Link href={`/tjenester/${service.slug}`}>{service.title}</Link>
                      {index < projectServices.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {project.images.length > 0 && (
            <div className={styles.projectGallery}>
              {project.images.map((image, index) => (
                <div key={index} className={styles.galleryImage}>
                  <Image
                    src={image}
                    alt={`${project.title} - Bilde ${index + 1}`}
                    width={800}
                    height={600}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className={styles.projectContent}>
            <MDXRemote source={project.content} />
          </div>

          <div className={styles.projectNavigation}>
            <Link href="/prosjekter" className={styles.btn}>
              ← Tilbake til prosjekter
            </Link>
            <Link href="/#contact" className={styles.btn}>
              Kontakt meg om ditt prosjekt
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
