import Link from 'next/link';
import { getAllServices } from '@/lib/mdx';
import styles from '../page.module.css';
import * as Icons from 'lucide-react';

export default function TjenesterPage() {
  const services = getAllServices();

  return (
    <main className={styles.main}>
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h1>Mine tjenester</h1>
            <p>Jeg tilbyr et bredt spekter av tjenester innen 3D-printing, design, IT og opplæring.</p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const IconComponent = (Icons as any)[service.icon] || Icons.Box;

              return (
                <Link
                  href={`/tjenester/${service.slug}`}
                  key={service.slug}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceIcon}>
                    <IconComponent size={48} />
                  </div>
                  <div className={styles.serviceCardContent}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className={styles.serviceCardFooter}>
                    <span className={styles.readMore}>Les mer →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
