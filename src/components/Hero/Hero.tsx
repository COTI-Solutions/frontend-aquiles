"use client";

import React from "react";
import Image from "next/image";
import Button from "../Button/Button";
import styles from "./Hero.module.scss";
import carouselSlidesData from "../../carouselSlides.json";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
  const carouselData = carouselSlidesData as CarouselSlide[];

  const handleCTAClick = (link: string) => {
    // Si es un enlace interno (empieza con #)
    if (link.startsWith('#')) {
      const targetId = link.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    } else {
      // Si es un enlace externo, abre en nueva pestaña
      window.open(link, '_blank');
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            bulletClass: styles.carouselDot,
            bulletActiveClass: styles.activeDot,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          className={styles.swiper}
        >
          {carouselData.length > 0 &&
            carouselData.map((slide, index) => (
              <SwiperSlide
                key={slide.productId}
                className={styles.carouselSlide}
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
                        <Button
                          variant="accent"
                          size="large"
                          onClick={() => handleCTAClick(slide.ctaLink || '')}
                          className={styles.ctaButton}
                        >
                          {slide.cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button
          className={`swiper-button-prev ${styles.carouselArrow} ${styles.carouselArrowPrev}`}
          aria-label="Slide anterior"
        >
          &lt;
        </button>
        <button
          className={`swiper-button-next ${styles.carouselArrow} ${styles.carouselArrowNext}`}
          aria-label="Slide siguiente"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Hero;
