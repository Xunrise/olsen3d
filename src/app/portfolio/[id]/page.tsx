import { notFound } from 'next/navigation';
import { projects } from '../../../data/projects';
import styles from '../../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id
    }))
}

export default async function ProjectPage({params} : ProjectPageProps) {
    const { id } = await params;

    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/#portfolio" className={styles.backLink}>&larr;</Link>
            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <div className={styles.projectImages}>
                {project.images.map((imagePath, index) => (
                    <Image 
                        key={index}
                        src={imagePath}
                        alt={`${project.title}  image ${index + 1}`}
                        width={800}
                        height={600}
                        layout="responsive"
                        className={styles.projectImage}
                        />
                ))}
            </div>
        </div>
    );
}