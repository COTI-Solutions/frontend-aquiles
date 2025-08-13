"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price?: string;
  buyUrl?: string;
  productUrl?: string;
  color?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  price,
  buyUrl = "#",
  productUrl = "#",
  color = "#27AE60",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 100;
  const shouldTruncate = description.length > maxLength;

  const truncatedDescription = shouldTruncate
    ? description.substring(0, maxLength) + "..."
    : description;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBuyClick = async () => {
    if (!buyUrl || buyUrl === "#") return;
    
    setIsLoading(true);
    
    try {
      console.log('Iniciando proceso de pago para:', title);
      console.log('Datos a enviar:', {
        title: title,
        price: parseFloat(price?.replace(/[^\d,]/g, '').replace(',', '.') || '0'),
        quantity: 1,
        productId: id,
        description: description,
        imageUrl: imageUrl
      });

      // 1. Crear preferencia en tu backend
      const response = await fetch('https://backend-aquiles.onrender.com/api/payments/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          price: parseFloat(price?.replace(/[^\d,]/g, '').replace(',', '.') || '0'),
          quantity: 1,
          productId: id,
          description: description,
          imageUrl: imageUrl
        })
      });

      console.log('Respuesta del backend:', response);
      console.log('Status:', response.status);
      console.log('StatusText:', response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del backend:', errorText);
        throw new Error(`Error del backend: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Datos recibidos del backend:', data);
      
      // 2. Redirigir a MercadoPago usando init_point
      if (data.init_point) {
        console.log('Redirigiendo a MercadoPago con init_point:', data.init_point);
        window.location.href = data.init_point;
      } else if (data.initPoint) {
        console.log('Redirigiendo a MercadoPago con initPoint:', data.initPoint);
        window.location.href = data.initPoint;
      } else {
        console.warn('No se recibió init_point del backend, usando URL original');
        console.warn('Datos recibidos:', data);
        window.open(buyUrl, '_blank');
      }
      
    } catch (error) {
      console.error('Error completo al procesar el pago:', error);
      
      // Mostrar error más específico
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          alert('Error de conexión: No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else if (error.message.includes('Error del backend')) {
          alert(`Error del servidor: ${error.message}`);
        } else {
          alert(`Error inesperado: ${error.message}`);
        }
      } else {
        alert('Error desconocido al procesar el pago');
      }
      
      // Fallback: usar la URL original en caso de error
      console.log('Usando fallback a URL original:', buyUrl);
      window.open(buyUrl, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div
            className={styles.placeholderImage}
            style={{ backgroundColor: color }}
          >
            <span className={styles.placeholderText}>
              {title.split(" ")[0]}
            </span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            {isExpanded ? description : truncatedDescription}
          </p>
          {shouldTruncate && (
            <button onClick={toggleDescription} className={styles.expandButton}>
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>

        {price && <div className={styles.price}>${price}</div>}

        <div className={styles.buttonContainer}>
          {productUrl && (
            <Button
              variant="secondary"
              size="medium"
              href={productUrl}
              className={styles.viewButton}
            >
              Ver más
            </Button>
          )}

          {buyUrl && (
            <Button
              variant="accent"
              size="medium"
              onClick={handleBuyClick}
              className={styles.buyButton}
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Comprar"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
