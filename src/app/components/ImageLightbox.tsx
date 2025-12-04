'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../page.module.css';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  captions: string[];
}

const NORWEGIAN_TEXT = {
  closeImage: 'Lukk bilde',
  previousImage: 'Forrige bilde',
  nextImage: 'Neste bilde',
  imageGallery: 'Bildegalleri',
  imageCounter: (current: number, total: number) => `${current} av ${total}`,
};

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  captions,
}: ImageLightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          onNavigate(0);
          break;
        case 'End':
          e.preventDefault();
          onNavigate(images.length - 1);
          break;
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  // Handle touch gestures for mobile swipe
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndex < images.length - 1) {
        // Swipe left - next image
        onNavigate(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous image
        onNavigate(currentIndex - 1);
      }
    }
  }, [currentIndex, images.length, onNavigate]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        // Remove event listeners
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);

        // Restore body scroll
        document.body.style.overflow = '';

        // Restore focus
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === backdropRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, images.length, onNavigate]);


  if (!isOpen) return null;

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;
  const currentImage = images[currentIndex];
  const currentCaption = captions[currentIndex];

  return (
    <div
      ref={backdropRef}
      className={styles.lightboxBackdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={NORWEGIAN_TEXT.imageGallery}
    >
      <div className={styles.lightboxContent}>
        {/* Close Button */}
        <div className={styles.lightboxTopBar}>
          <button
            className={`${styles.lightboxButton} ${styles.lightboxCloseButton}`}
            onClick={onClose}
            aria-label={NORWEGIAN_TEXT.closeImage}
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Image */}
        <div className={styles.lightboxImageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage}
            alt={currentCaption}
            className={styles.lightboxImage}
          />
        </div>

        {/* Controls */}
        <div className={styles.lightboxControls}>
          {/* Previous Button */}
          <button
            className={styles.lightboxButton}
            onClick={handlePrevious}
            disabled={!hasPrevious}
            aria-label={NORWEGIAN_TEXT.previousImage}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image Info */}
          <div className={styles.lightboxInfo}>
            <div className={styles.imageCounter}>
              {NORWEGIAN_TEXT.imageCounter(currentIndex + 1, images.length)}
            </div>
            <div className={styles.lightboxTitle}>{currentCaption}</div>
          </div>

          {/* Next Button */}
          <button
            className={styles.lightboxButton}
            onClick={handleNext}
            disabled={!hasNext}
            aria-label={NORWEGIAN_TEXT.nextImage}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
