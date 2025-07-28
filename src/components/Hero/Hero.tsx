"use client";

import React from "react";
import Button from "../Button/Button";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  const { scrollToSection } = useSmoothScroll();

  const handleVerProductos = () => {
    scrollToSection("productos");
  };

  const handleContactar = () => {
    scrollToSection("contacto");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Descubre el poder del conocimiento con{" "}
            <span className={styles.highlight}>Aquiles</span>
          </h1>

          <p className={styles.subtitle}>
            Explora nuestra colección de ebooks cuidadosamente seleccionados
            para impulsar tu crecimiento personal y profesional.
          </p>

          <div className={styles.actions}>
            <Button
              variant="accent"
              size="large"
              onClick={handleVerProductos}
              className={styles.ctaButton}
            >
              Ver Productos
            </Button>

            <Button
              variant="primary"
              size="large"
              onClick={handleContactar}
              className={styles.secondaryButton}
            >
              Contactar
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.heroImage}>
            <div className={styles.bookStack}>
              <div className={styles.book}></div>
              <div className={styles.book}></div>
              <div className={styles.book}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
