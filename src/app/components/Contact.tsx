'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          honeypot: data.get('_honeypot'),
        }),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Kontakt meg</h2>
          <p>Har du spørsmål eller ønsker et tilbud? Ta kontakt!</p>
        </div>

        <div className={styles.contactWrapper}>
          <div className={styles.contactInfo}>
            <h3>Kontaktinformasjon</h3>
            <p>
              <strong>E-post:</strong>{' '}
              <a href="mailto:post@olsen3d.no">post@olsen3d.no</a>
            </p>
            <p>
              <strong>Telefon:</strong>{' '}
              <a href="tel:+4748227272">+47 482 27 272</a>
            </p>
            <p>
              <strong>Adresse:</strong>
              <br />
              Olderdalen, 9146
            </p>
          </div>

          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Navn</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-post</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Emne</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Melding</label>
                <textarea id="message" name="message" rows={5} required />
              </div>

              {/* Honeypot field for spam prevention - hidden from users */}
              <input
                type="text"
                name="_honeypot"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {status === 'success' && (
                <div className={styles.successMessage}>
                  Takk for din melding! Jeg vil svare så snart som mulig.
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorMessage}>
                  Noe gikk galt. Vennligst prøv igjen eller kontakt meg direkte via e-post eller telefon.
                </div>
              )}

              <button
                type="submit"
                className={styles.btn}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sender...' : 'Send melding'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 