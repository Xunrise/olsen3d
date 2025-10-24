import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllServices, getServiceBySlug, getProjectsByService } from '@/lib/mdx';
import styles from '../../page.module.css';

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let service;

  try {
    service = getServiceBySlug(slug);
  } catch {
    notFound();
  }

  const relatedProjects = getProjectsByService(slug);

  return (
    <main className={styles.main}>
      <article className={styles.serviceDetail}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Hjem</Link> / <Link href="/tjenester">Tjenester</Link> / {service.title}
          </div>

          <header className={styles.serviceHeader}>
            <h1>{service.title}</h1>
            <p className={styles.lead}>{service.description}</p>
          </header>

          <div className={styles.serviceContent}>
            <MDXRemote source={service.content} />
          </div>

          {relatedProjects.length > 0 && (
            <section className={styles.relatedProjects}>
              <h2>Relaterte prosjekter</h2>
              <div className={styles.projectGrid}>
                {relatedProjects.map((project) => (
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
            </section>
          )}

          <div className={styles.ctaSection}>
            <h2>Interessert i denne tjenesten?</h2>
            <p>Ta kontakt for en uforpliktende samtale om ditt prosjekt.</p>
            <Link href="/#contact" className={styles.btn}>
              Kontakt meg
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
