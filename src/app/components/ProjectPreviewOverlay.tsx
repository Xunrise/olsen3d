import Image from "next/image";
import { Project } from "../../data/projects";
import styles from "../page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectPreviewOverlayProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectPreviewOverlay({
  project,
  onClose,
}: ProjectPreviewOverlayProps) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);

  useEffect(() => {
    const backdropTimer = setTimeout(() => setIsBackdropVisible(true), 10);
    const contentTimer = setTimeout(() => setIsContentVisible(true), 10);

    return () => {
      clearTimeout(backdropTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleClose = () => {
    setIsContentVisible(false);
    setIsBackdropVisible(false);

    setTimeout(() => {
      onClose();
    }, 300); // Must match transition duration in css
  };

  return (
    <div
      className={`${styles.overlayBackdrop} ${isBackdropVisible ? styles.backdropVisible : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.overlayContent} ${isContentVisible ? styles.overlayVisible : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {" "}
        {/* Prevent backdrop click from closing when clicking inside content */}
        <button className={styles.overlayCloseButton} onClick={handleClose}>
          X
        </button>
        <h2>{project.title}</h2>
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={400}
          height={300}
          className={styles.overlayThumbnail}
        />
        <p>{project.summary}</p>
        <Link
          href={`/portfolio/${project.id}`}
          className={styles.overlayViewProjectButton}
        >
          View Full Project
        </Link>
      </div>
    </div>
  );
}
