import ThemeSwitch from "./ThemeSwitch";
import styles from "./Header.module.css";

export default function Header() {
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
        <ThemeSwitch />
      </nav>
    </header>
  );
}
