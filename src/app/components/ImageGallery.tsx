'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import ImageLightbox from './ImageLightbox';
import styles from '../page.module.css';

interface ImageGalleryProps {
  images: string[];
  projectTitle: string;
}


/**
 * Generates a user-friendly caption from an image filename
 * Examples:
 * - "CAD_bottomview.png" → "CAD Bottomview"
 * - "before-after.jpg" → "Before After"
 * - "broken_backplate.jpg" → "Broken Backplate"
 */
function getImageCaption(imagePath: string, index: number, projectTitle: string): string {
  // Extract filename from path
  const filename = imagePath.split('/').pop()?.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '') || '';

  if (filename) {
    // Format filename: replace underscores/hyphens with spaces and capitalize
    const formatted = filename
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();

    if (formatted) {
      return formatted;
    }
  }

  // Fallback: Use project title + index
  return `${projectTitle} - Bilde ${index + 1}`;
}

export default function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Generate captions for all images (memoized for performance)
  const captions = useMemo(
    () => images.map((image, index) => getImageCaption(image, index, projectTitle)),
    [images, projectTitle]
  );

  // Open lightbox at specific index
  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Handle keyboard Enter on thumbnails
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Thumbnail Grid */}
      <div className={styles.projectGallery}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.galleryImage}
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            tabIndex={0}
            aria-label={captions[index]}
          >
            <div className={styles.galleryImageInner}>
              <Image
                src={image}
                alt={captions[index]}
                width={300}
                height={220}
                loading="lazy"
                sizes="(max-width: 768px) 150px, 200px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.imageCaption}>
              {captions[index]}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={images}
        currentIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={setSelectedIndex}
        captions={captions}
      />
    </>
  );
}
