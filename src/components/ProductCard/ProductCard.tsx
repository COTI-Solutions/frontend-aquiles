"use client";

import React, { useState } from "react";
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
  title,
  description,
  imageUrl,
  price,
  buyUrl = "#",
  productUrl = "#",
  color = "#27AE60",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldTruncate = description.length > maxLength;

  const truncatedDescription = shouldTruncate
    ? description.substring(0, maxLength) + "..."
    : description;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.image} />
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
              href={buyUrl}
              className={styles.buyButton}
            >
              Comprar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
