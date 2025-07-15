import styles from "./Services.module.css";
import homeStyles from "@/app/home/home.module.css";
import Image from "next/image";

export default function Services() {
  return (
    <section id="services" className={homeStyles.section}>
      <div className={styles.sectionTitle}>
        <h2>Mine tjenester</h2>
      </div>
      <div className={styles.serviceGrid}>
        <div className={styles.serviceCard}>
          <Image
            src="/3d-printing-bilde.png"
            alt="3D-printing"
            width={500}
            height={200}
          />
          <div className={styles.serviceCardContent}>
            <h3>3D-printing og design</h3>
            <p>
              Design og produksjon av 3D-modeller. Fra idé til ferdig produkt -
              jeg hjelper deg med hele prosessen.
            </p>
          </div>
        </div>
        <div className={styles.serviceCard}>
          <Image
            src="/kjopshjelp-bilde.png"
            alt="Veiledning"
            width={500}
            height={200}
          />
          <div className={styles.serviceCardContent}>
            <h3>Veiledning</h3>
            <p>
              Kjøpshjelp for IKT-utstyr og reparasjon av småelektronikk. Jeg
              hjelper deg med å finne riktig utstyr og løse tekniske problemer.
            </p>
          </div>
        </div>
        <div className={styles.serviceCard}>
          <Image
            src="/kursing-bilde.png"
            alt="Kursing"
            width={500}
            height={200}
          />
          <div className={styles.serviceCardContent}>
            <h3>Kursing</h3>
            <p>
              Få mest mulig ut av teknologien din. Jeg tilbyr skreddersydd
              opplæring i bruk av IKT-utstyr.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
