"use client";
import styles from "./Portfolio.module.css";
import { categories } from "@/data/projects";
import ProjectCard from "./ProjectCard/ProjectCard";
import { useState } from "react";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allProjects = categories.flatMap((category) =>
    category.projects.map((project) => ({
      ...project,
      category: category.title,
    }))
  );

  const filteredProjects =
    activeCategory === "all"
      ? allProjects
      : allProjects.filter(
          (project) =>
            project.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section id="portfolio" className={styles.portfolio}>
      {/* CAD-style category filter toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarSection}>
          <span className={styles.toolbarLabel}>VIEW:</span>
          <div className={styles.categoryFilters}>
            <button
              className={`${styles.filterBtn} ${activeCategory === "all" ? styles.active : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              ALL PARTS
            </button>
            {categories.map((category) => (
              <button
                key={category.title}
                className={`${styles.filterBtn} ${
                  activeCategory === category.title.toLowerCase()
                    ? styles.active
                    : ""
                }`}
                onClick={() => setActiveCategory(category.title.toLowerCase())}
              >
                {category.title.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.toolbarSection}>
          <span className={styles.toolbarLabel}>ITEMS:</span>
          <span className={styles.itemCount}>{filteredProjects.length}</span>
        </div>
      </div>
      <div className={styles.projectGrid}>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            id={String(index + 1).padStart(3, "0")}
            title={project.title}
            summary={project.summary}
            thumbnail={project.thumbnail}
            category={project.category}
            dimensions="120 x 80 x 15mm"
            fileSize="2.4 MB"
            lastModified="2024-03-15"
            isSelected={selectedProject === project.id}
            onClick={() =>
              setSelectedProject(
                selectedProject === project.id ? null : project.id
              )
            }
          />
        ))}
      </div>
      {/* CAD-style status bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusSection}>
          <span className={styles.statusLabel}>SELECTION:</span>
          <span className={styles.statusValue}>
            {selectedProject ? `1 PART SELECTED` : "NO SELECTION"}
          </span>
        </div>
        <div className={styles.statusSection}>
          <span className={styles.statusLabel}>DISPLAY:</span>
          <span className={styles.statusValue}>THUMBNAIL VIEW</span>
        </div>
      </div>
    </section>
  );
}
