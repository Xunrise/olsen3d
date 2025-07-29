import styles from "./Portfolio.module.css";
import homeStyles from "@/app/home/home.module.css";
import Image from "next/image";
import { Category, categories } from "../../../../data/projects";
import { useState } from "react";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <section id="portfolio" className={homeStyles.section}>
      <div className="section-title">
        <h2>Portfolio</h2>
        <p>Se noen av mine tidligere prosjekter og arbeid.</p>
      </div>
      <div className={styles.portfolioGrid}>
        {categories.map((category) => (
          <div
              key={category.id}
              className={styles.portfolioItem}
            >
            <a href={"/portfolio/"+category.id}>
              <Image
                src={category.thumbnail}
                alt={category.title}
                width={400}
                height={300}
              />
              <div className={styles.portfolioItemOverlay}>
                <h3>{category.title}</h3>
                <p>{category.summary}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

    </section>
  );
}
