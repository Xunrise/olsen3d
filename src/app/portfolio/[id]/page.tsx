import { notFound } from "next/navigation";
import { categories } from "../../../data/projects";
import styles from "../../page.module.css";
import Link from "next/link";
import SwiperComponent from "../../components/SwiperComponent";

export interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  const category = categories.find((p) => p.id === id);

  if (!category) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <Link href="/#portfolio" className={styles.backLink}>
        &larr;
      </Link>
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <div className={styles.projectGrid}>
        {category.projects.map((project) => (
          <div key={project.id} className={styles.project}>
            <SwiperComponent project={project} />
            <div className={styles.imageOverlay}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
