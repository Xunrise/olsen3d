import Image from "next/image";
import { Category } from "../../data/projects";
import styles from "../page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CategoryPreviewOverlayProps {
  category: Category;
  onClose: () => void;
}

export default function CategoryPreviewOverlay({
  category,
  onClose,
}: CategoryPreviewOverlayProps) {
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
          Lukk
        </button>
        <h2>{category.title}</h2>
        <Image
          src={category.thumbnail}
          alt={category.title}
          width={400}
          height={300}
          className={styles.overlayThumbnail}
        />
        <p>{category.summary}</p>
        <Link
          href={`/portfolio/${category.id}`}
          className={styles.overlayViewProjectButton}
        >
          Se hele prosjektet
        </Link>
      </div>
    </div>
  );
}
