"use client";

import styles from '../page.module.css';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    // Scroll event for header
    const header = document.getElementById("header");
    const onScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add(styles.scrolled);
      } else {
        header?.classList.remove(styles.scrolled);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home page first, then scroll
        window.location.href = href;
      }
      setMenuOpen(false);
    }
  };

  return (
    <header className={styles.header} id="header">
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logoText}>
          Olsen3D
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${styles.navWrapper} ${menuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={pathname === '/' ? styles.active : ''}>
                Hjem
              </Link>
            </li>
            <li>
              <Link href="/tjenester" className={pathname === '/tjenester' ? styles.active : ''}>
                Tjenester
              </Link>
            </li>
            <li>
              <Link href="/prosjekter" className={pathname === '/prosjekter' ? styles.active : ''}>
                Portfolio
              </Link>
            </li>
            <li>
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, '/#contact')}
              >
                Kontakt
              </a>
            </li>
          </ul>
          <button
            className={styles.themeToggle}
            id="theme-toggle"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
          </button>
        </div>
      </div>
    </header>
  );
} 