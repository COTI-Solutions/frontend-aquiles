"use client";

import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  const { scrollToSection } = useSmoothScroll();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      image: "/images/biblioteca_carrusel1200x600.webp",
      title: "Biblioteca Digital",
      subtitle: "Descubre miles de recursos educativos",
      description:
        "Accede a una colección cuidadosamente seleccionada de libros, cursos y materiales de aprendizaje.",
      cta: "Explorar Biblioteca",
    },
    {
      image: "/images/Cartas_carrusel1200x600.webp",
      title: "Taller de Ángeles",
      subtitle: "Conecta con la energía divina",
      description:
        "Aprende a leer las cartas angelicales y recibe guía espiritual para tu vida diaria.",
      cta: "Iniciar Taller",
    },
    {
      image: "/images/jardineria_carrusel1200x600.webp",
      title: "Jardinería Sin Errores",
      subtitle: "Transforma tu jardín en un paraíso",
      description:
        "Evita los 25 errores más comunes y aprende técnicas profesionales para el cuidado de plantas.",
      cta: "Aprender Jardinería",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVerProductos = () => {
    scrollToSection("productos");
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.carouselContainer}>
        {/* Slides */}
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.carouselSlide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <div className={styles.slideImage}>
              <img src={slide.image} alt={slide.title} />
            </div>
            <div className={styles.slideOverlay}>
              <div className={styles.slideContent}>
                <div className={styles.slideText}>
                  <h1 className={styles.slideTitle}>{slide.title}</h1>
                  <h2 className={styles.slideSubtitle}>{slide.subtitle}</h2>
                  <p className={styles.slideDescription}>{slide.description}</p>
                  <div className={styles.slideActions}>
                    <Button
                      variant="accent"
                      size="large"
                      onClick={handleVerProductos}
                      className={styles.slideCta}
                    >
                      {slide.cta}
                    </Button>
                    <Button
                      variant="secondary"
                      size="large"
                      className={styles.secondaryCta}
                    >
                      Ver Productos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button className={styles.carouselArrow} onClick={prevSlide}>
          <span>‹</span>
        </button>
        <button className={styles.carouselArrow} onClick={nextSlide}>
          <span>›</span>
        </button>

        {/* Dots indicator */}
        <div className={styles.carouselDots}>
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselDot} ${
                index === currentSlide ? styles.activeDot : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className={styles.carouselProgress}>
          <div
            className={styles.progressBar}
            style={{
              width: `${((currentSlide + 1) / carouselSlides.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
