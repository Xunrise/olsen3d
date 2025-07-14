import styles from '../page.module.css';
import Image from 'next/image';
import {Category, categories} from '../../data/projects';
import CategoryPreviewOverlay from './CategoryPreviewOverlay';
import { useState } from 'react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setShowOverlay(true);
  }

  const handleCLoseOverlay = () => {
    setShowOverlay(false);
    setSelectedCategory(null);
  }


  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Portfolio</h2>
          <p>Se noen av mine tidligere prosjekter og arbeid.</p>
        </div>
        <div className={styles.portfolioGrid}>
          {categories.map((category) => (
              <div key={category.id} className={styles.portfolioItem} onClick={() => handleCategoryClick(category)}>
              <Image src={category.thumbnail} alt={category.title} width={400} height={300} />
              <div className={styles.portfolioItemOverlay}>
                <h3>{category.title}</h3>
                <p>{category.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showOverlay && selectedCategory && (
        <CategoryPreviewOverlay category={selectedCategory} onClose={handleCLoseOverlay} />
      )}
    </section>
  );
} 