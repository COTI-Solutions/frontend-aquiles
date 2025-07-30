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

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
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
          </div>
        </div>

        <div className={styles.heroImage}>
          <img
            src="/images/recetario.png"
            alt="Aquiles - Recetario de conocimiento"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
