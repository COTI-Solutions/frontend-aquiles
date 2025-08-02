"use client";

import React, { useState, useEffect, useRef, use } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import styles from "./Hero.module.scss";
import carouselSlidesData from "../../carouselSlides.json";

interface CarouselSlide {
  image: string;
  subtitle?: string;
  description?: string;
  cta?: string;
  ctaLink?: string;
  title?: string;
  linkToPay?: string;
  linktOfProduct?: string;
  price?: string;
  productId?: string;
}
const Hero: React.FC = () => {
  const { scrollToSection } = useSmoothScroll();
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselData = carouselSlidesData as CarouselSlide[];

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carouselData]);

  const handleVerProductos = () => {
    scrollToSection("productos");
  };

  const resetTimer = () => {
    startTimer();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
    resetTimer();
  };

  return (
    <section className={styles.hero}>
      <div className={styles.carouselContainer}>
        {/* Slides */}
        {carouselData.length > 0 &&
          carouselData.map((slide, index) => (
            <div
              key={slide.productId}
              className={`${styles.carouselSlide} ${
                index === currentSlide ? styles.active : ""
              }`}
            >
              <div className={styles.slideImage}>
                <Image
                  src={slide.image}
                  alt={slide.title || "Slide image"}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  quality={85}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.slideOverlay}>
                <div className={styles.slideContent}>
                  <div className={styles.slideText}>
                    <h1 className={styles.slideTitle}>{slide.title}</h1>
                    <h2 className={styles.slideSubtitle}>{slide.subtitle}</h2>
                    <p className={styles.slideDescription}>
                      {slide.description}
                    </p>
                    <div className={styles.slideActions}>
                      {/* <Button
                        variant="accent"
                        size="large"
                        href={slide.ctaLink}
                        className={styles.slideCta}
                      >
                        {slide.cta}
                      </Button> */}
                      <Button
                        variant="secondary"
                        size="large"
                        onClick={handleVerProductos}
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
        <Button
          variant="secondary"
          size="large"
          className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
          onClick={prevSlide}
        >
          &lt;
        </Button>
        <Button
          variant="secondary"
          size="large"
          className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
          onClick={nextSlide}
        >
          &gt;
        </Button>

        {/* Dots indicator */}
        <div className={styles.carouselDots}>
          {carouselData.map((slide, index) => (
            <button
              key={slide.productId}
              className={`${styles.carouselDot} ${
                index === currentSlide ? styles.activeDot : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
