'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

interface Project {
  slug: string;
  title: string;
  description: string;
  services: string[];
  images: string[];
  date: string;
  featured: boolean;
}

interface Service {
  slug: string;
  title: string;
}

export default function ProsjekterPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, servicesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/services'),
        ]);

        const projectsData = await projectsRes.json();
        const servicesData = await servicesRes.json();

        setProjects(projectsData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProjects =
    selectedService === 'all'
      ? projects
      : projects.filter((project) => project.services.includes(selectedService));

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p>Laster prosjekter...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.projects}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h1>Mine prosjekter</h1>
            <p>Se eksempler på tidligere arbeid og hva jeg kan hjelpe deg med.</p>
          </div>

          <div className={styles.filterBar}>
            <button
              className={selectedService === 'all' ? styles.filterActive : ''}
              onClick={() => setSelectedService('all')}
            >
              Alle prosjekter
            </button>
            {services.map((service) => (
              <button
                key={service.slug}
                className={selectedService === service.slug ? styles.filterActive : ''}
                onClick={() => setSelectedService(service.slug)}
              >
                {service.title}
              </button>
            ))}
          </div>

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
