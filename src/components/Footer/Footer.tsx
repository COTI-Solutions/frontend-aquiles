import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer id="contacto" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>Aquiles</h3>
            <p className={styles.brandDescription}>
              Tu fuente de conocimiento para el crecimiento personal y
              profesional
            </p>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.contactTitle}>Contáctanos</h4>
            <div className={styles.contactLinks}>
              <a
                href="https://instagram.com/aquiles"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.icon}>📷</span>
                Instagram
              </a>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.icon}>💬</span>
                WhatsApp
              </a>

              <a href="mailto:info@aquiles.com" className={styles.contactLink}>
                <span className={styles.icon}>✉️</span>
                Email
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>&copy; 2024 Aquiles. Todos los derechos reservados.</p>
          </div>

          <div className={styles.credits}>
            <p>
              Hecho por{" "}
              <a
                href="https://cotisolutions.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cotiLink}
              >
                COTI Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
