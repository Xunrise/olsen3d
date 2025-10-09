import styles from '../page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <p>E-post: <a href="mailto:post@olsen3d.no">post@olsen3d.no</a></p>
          <p>Telefon: <a href="tel:+4748227272">+47 482 27 272</a></p>
          <p>Adresse: <br></br> Olderdalen, 9146</p>
        </div>
        <p>&copy; 2025 Olsen3D. Alle rettigheter reservert.</p>
      </div>
    </footer>
  );
} 