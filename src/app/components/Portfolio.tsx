import styles from "../page.module.css";
import Image from "next/image";
import { Project, projects } from "../../data/projects";
import ProjectPreviewOverlay from "./ProjectPreviewOverlay";
import { useState } from "react";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowOverlay(true);
  };

  const handleCLoseOverlay = () => {
    setShowOverlay(false);
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Portfolio</h2>
          <p>Se noen av mine tidligere prosjekter og arbeid.</p>
        </div>
        <div className={styles.portfolioGrid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={styles.portfolioItem}
              onClick={() => handleProjectClick(project)}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={400}
                height={300}
              />
              <div className={styles.portfolioItemOverlay}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showOverlay && selectedProject && (
        <ProjectPreviewOverlay
          project={selectedProject}
          onClose={handleCLoseOverlay}
        />
      )}
    </section>
  );
}
