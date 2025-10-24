'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../page.module.css';

interface Service {
  slug: string;
  title: string;
}

interface ProjectsFilterProps {
  services: Service[];
}

export default function ProjectsFilter({ services }: ProjectsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedService = searchParams.get('service') || 'all';

  const handleFilterChange = (serviceSlug: string) => {
    if (serviceSlug === 'all') {
      router.push('/prosjekter');
    } else {
      router.push(`/prosjekter?service=${serviceSlug}`);
    }
  };

  return (
    <div className={styles.filterBar}>
      <button
        className={selectedService === 'all' ? styles.filterActive : ''}
        onClick={() => handleFilterChange('all')}
      >
        Alle prosjekter
      </button>
      {services.map((service) => (
        <button
          key={service.slug}
          className={selectedService === service.slug ? styles.filterActive : ''}
          onClick={() => handleFilterChange(service.slug)}
        >
          {service.title}
        </button>
      ))}
    </div>
  );
}
