import styles from "./Contact.module.css";
import homeStyles from "@/app/home/home.module.css";

export default function Contact() {
  return (
    <section className={homeStyles.section}>
      <div className="sectionTitle">
        <h2>Kontakt meg</h2>
        <p>Har du spørsmål eller ønsker et tilbud? Ta kontakt!</p>
      </div>
      <div className={styles.contactForm}>
        <form>
          <div className="formGroup">
            <label htmlFor="name">Navn</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="formGroup">
            <label htmlFor="email">E-post</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="formGroup">
            <label htmlFor="subject">Emne</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="formGroup">
            <label htmlFor="message">Melding</label>
            <textarea id="message" name="message" required />
          </div>
          <button type="submit" className="btn">
            Send melding
          </button>
        </form>
      </div>
    </section>
  );
}
