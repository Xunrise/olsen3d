import { notFound } from "next/navigation";
import { categories } from "../../../data/projects";
import styles from "../../page.module.css";
import Link from "next/link";
import SwiperComponent from "../../components/SwiperComponent";

export interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
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
      {category.projects.map((project) => (
        <div>
          <SwiperComponent project={project} />
        </div>
      ))}
    </div>
  );
}
