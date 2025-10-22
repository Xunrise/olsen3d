"use client";

import styles from '../page.module.css';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Scroll event for header
    const header = document.getElementById("header");
    const onScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={styles.header} id="header">
      <nav className={styles.container}>
        <div className={styles.logoText}>Olsen3D</div>
        <ul className={styles.navList}>
          <li><a href="#home">Hjem</a></li>
          <li><a href="#services">Tjenester</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Kontakt</a></li>
        </ul>
        <button
          className={styles.themeToggle}
          id="theme-toggle"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
        </button>
      </nav>
    </header>
  );
} 