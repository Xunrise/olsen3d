// ProjectCard.tsx
import React from 'react';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  id: string;
  title: string;
  summary: string;
  thumbnail: string;
  category: string;
  dimensions?: string; // e.g., "120 x 80 x 15mm"
  fileSize?: string;   // e.g., "2.4 MB"
  lastModified?: string; // e.g., "2024-03-15"
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  id,
  title,
  summary,
  thumbnail,
  category,
  dimensions,
  fileSize,
  lastModified,
  isSelected = false,
  onClick
}: ProjectCardProps) {
  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {/* CAD-style header with technical info */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <span className={styles.id}>#{id}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.status}>
          <div className={styles.statusDot}></div>
          <span className={styles.statusText}>READY</span>
        </div>
      </div>

      {/* Main thumbnail viewport */}
      <div className={styles.viewport}>
        <div className={styles.thumbnailContainer}>
          <img 
            src={thumbnail} 
            alt={title}
            className={styles.thumbnail}
          />
          
          {/* CAD-style overlay grid */}
          <div className={styles.overlayGrid}></div>
          
          {/* Selection highlight border */}
          <div className={styles.selectionBorder}></div>

          {/* Technical annotations */}
          <div className={styles.annotations}>
            <div className={styles.axis}>
              <span className={styles.axisX}>X</span>
              <span className={styles.axisY}>Y</span>
            </div>
          </div>
        </div>
      </div>

      {/* Properties panel */}
      <div className={styles.properties}>
        <div className={styles.description}>
          <p>{summary}</p>
        </div>
        
        <div className={styles.specs}>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>TYPE:</span>
            <span className={styles.specValue}>{category}</span>
          </div>
          
          {dimensions && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>DIM:</span>
              <span className={styles.specValue}>{dimensions}</span>
            </div>
          )}
          
          {fileSize && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>SIZE:</span>
              <span className={styles.specValue}>{fileSize}</span>
            </div>
          )}
          
          {lastModified && (
            <div className={styles.specRow}>
              <span className={styles.specLabel}>MOD:</span>
              <span className={styles.specValue}>{lastModified}</span>
            </div>
          )}
        </div>
      </div>

      {/* CAD-style corner indicators */}
      <div className={styles.cornerIndicators}>
        <div className={styles.cornerTL}></div>
        <div className={styles.cornerTR}></div>
        <div className={styles.cornerBL}></div>
        <div className={styles.cornerBR}></div>
      </div>
    </div>
  );
}