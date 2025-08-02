import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsSection.module.scss";
import affiliationsData from "../../affiliations.json";

// Colores para rotar entre los productos
const productColors = ["#27AE60", "#2C3E50", "#F76C6C", "#E67E22", "#9B59B6"];

const ProductsSection: React.FC = () => {
  // Transformar los datos de affiliations al formato que espera ProductCard
  const products = affiliationsData.affiliations.map((affiliation, index) => {
    // Crear descripción personalizada basada en el título

    return {
      id: affiliation.id,
      title: affiliation.title,
      description: affiliation.description,
      color: productColors[index % productColors.length], // Rotar colores
      price: affiliation.price,
      buyUrl: affiliation.linkToPay,
      productUrl: affiliation.linktOfProduct,
      image: affiliation.image,
    };
  });

  return (
    <section id="productos" className={styles.productsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Productos Recomendados</h2>
          <p className={styles.subtitle}>
            Descubre nuestra colección de productos cuidadosamente seleccionados
            para impulsar tu crecimiento personal y profesional
          </p>
        </div>

        <div className={styles.grid}>
          {products.map(
            ({
              id,
              description,
              color,
              price,
              buyUrl,
              productUrl,
              image,
              title,
            }) => (
              <ProductCard
                id={id}
                key={id}
                title={title}
                description={description || ""}
                color={color}
                price={price}
                buyUrl={buyUrl}
                imageUrl={image}
                productUrl={productUrl}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
