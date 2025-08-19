'use client';

import { useState } from 'react';
import styles from './FAQ.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQ({ 
  faqs, 
  title = "Preguntas Frecuentes", 
  subtitle = "Resolvemos tus dudas más comunes" 
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      {/* Elementos decorativos de fondo */}
      <div className={styles.backgroundDecorations}>
        <div className={styles.floatingQuestion}>?</div>
        <div className={styles.floatingQuestion}>?</div>
        <div className={styles.floatingQuestion}>?</div>
        <div className={styles.floatingQuestion}>?</div>
        <div className={styles.floatingQuestion}>?</div>
        <div className={styles.floatingQuestion}>?</div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <div className={styles.questionIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.arrow}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                    className={styles.arrowIcon}
                  >
                    <path 
                      d="M5 7.5L10 12.5L15 7.5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={styles.faqAnswer}
                aria-hidden={openIndex !== index}
              >
                <div className={styles.answerContent}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.contactInfo}>
          <p className={styles.contactText}>
            ¿No encontraste lo que buscabas? 
            <a 
              href="https://wa.me/5491165333017" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Contáctanos por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
