import styles from '../page.module.css';

export default function Header() {
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
      </nav>
      <button className={styles.themeToggle} id="theme-toggle">
        <i className="fas fa-moon"></i>
      </button>
    </header>
  );
} 