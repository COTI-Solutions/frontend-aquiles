"use client";

import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  const { scrollToSection } = useSmoothScroll();
  const [currentSlide, setCurrentSlide] = useState(0);

  const benefits = [
    {
      title: "Productos Verificados",
      description:
        "Cada producto ha sido probado y seleccionado personalmente para garantizar calidad",
      icon: "✅",
    },
    {
      title: "Mejores Precios",
      description:
        "Acceso a descuentos exclusivos y ofertas especiales en todos los productos",
      icon: "💰",
    },
    {
      title: "Soporte Personalizado",
      description:
        "Te ayudo a elegir el producto perfecto para tus necesidades específicas",
      icon: "🤝",
    },
  ];

  const featuredProducts = [
    {
      title: "Bocaditos Felices",
      description: "130+ recetas para niños de 6 meses a 5 años",
      price: "$14.129",
      image: "/images/recetario.png",
      category: "Cocina",
    },
    {
      title: "Taller de Ángeles",
      description: "Conecta con la energía divina y recibe guía espiritual",
      price: "$66.469",
      image: "/images/cartas390x520.webp",
      category: "Espiritualidad",
    },
    {
      title: "Jardinería Sin Errores",
      description: "25 errores comunes y cómo solucionarlos",
      price: "$18.645",
      image: "/images/jardineria390x520.webp",
      category: "Jardinería",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleVerProductos = () => {
    scrollToSection("productos");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <div className={styles.benefitsCarousel}>
            <div className={styles.carouselContainer}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`${styles.carouselSlide} ${
                    index === currentSlide ? styles.active : ""
                  }`}
                >
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
            <div className={styles.carouselDots}>
              {benefits.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === currentSlide ? styles.activeDot : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          <h1 className={styles.title}>
            Descubre productos{" "}
            <span className={styles.highlight}>seleccionados</span> para ti
          </h1>

          <p className={styles.subtitle}>
            Como afiliado de confianza, te conecto con los mejores productos de
            Hotmart. Cada recomendación está basada en experiencia personal y
            calidad verificada.
          </p>

          <div className={styles.actions}>
            <Button
              variant="accent"
              size="large"
              onClick={handleVerProductos}
              className={styles.ctaButton}
            >
              Ver Productos Recomendados
            </Button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.productShowcase}>
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className={`${styles.productCard} ${
                  index === 0 ? styles.featured : ""
                }`}
              >
                <div className={styles.productImage}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.category}>{product.category}</span>
                  <h4 className={styles.productTitle}>{product.title}</h4>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <span className={styles.price}>{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
