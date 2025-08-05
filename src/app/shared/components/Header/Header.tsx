import styles from "./Header.module.css";
import { useTheme } from "@/app/hooks/useTheme";

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  return (
    <header className={styles.header} id="header">
      <nav className={styles.nav}>
        <div className={styles.logoText}>Olsen3D</div>
        <ul className={styles.navList}>
          <li>
            <a href="#hero">Hjem</a>
          </li>
          <li>
            <a href="#services">Tjenester</a>
          </li>
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#contact">Kontakt</a>
          </li>
        </ul>
        <button
          className={styles.themeToggle}
          id="theme-toggle"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
        </button>
      </nav>
    </header>
  );
}
