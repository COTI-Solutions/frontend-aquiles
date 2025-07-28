import React from "react";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price?: string;
  buyUrl?: string;
  color?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageUrl,
  price,
  buyUrl = "#",
  color = "#27AE60",
}) => {
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
        <p className={styles.description}>{description}</p>

        {price && <div className={styles.price}>{price}</div>}

        <Button
          variant="secondary"
          size="medium"
          href={buyUrl}
          className={styles.buyButton}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
