import styles from '../page.module.css';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { getAllServices } from '@/lib/mdx';

export default function Services() {
  const services = getAllServices();

  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Mine tjenester</h2>
          <p>Jeg tilbyr et bredt spekter av tjenester innen 3D-printing, design, IT og opplæring.</p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (Icons as any)[service.icon] || Icons.Box;

            return (
              <Link
                key={service.slug}
                href={`/tjenester/${service.slug}`}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon}>
                  <IconComponent size={40} />
                </div>
                <div className={styles.serviceCardContent}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.sectionCta}>
          <Link href="/tjenester" className={styles.btn}>
            Se alle tjenester
          </Link>
        </div>
      </div>
    </section>
  );
} 