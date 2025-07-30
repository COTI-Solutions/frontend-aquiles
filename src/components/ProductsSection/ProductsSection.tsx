import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsSection.module.scss";

// Datos de ejemplo para los productos
const products = [
  {
    id: "1",
    title: "Guía Completa de Productividad",
    description:
      "Aprende técnicas probadas para maximizar tu productividad y alcanzar tus metas más rápido.",
    color: "#27AE60",
    price: "$19.99",
    buyUrl: "#",
  },
  {
    id: "2",
    title: "Finanzas Personales para Principiantes",
    description:
      "Domina los fundamentos de las finanzas personales y construye un futuro financiero sólido.",
    color: "#2C3E50",
    price: "$24.99",
    buyUrl: "#",
  },
  {
    id: "3",
    title: "Hábitos para el Éxito",
    description:
      "Descubre los hábitos que transformarán tu vida y te llevarán al siguiente nivel.",
    color: "#F76C6C",
    price: "$17.99",
    buyUrl: "#",
  },
  {
    id: "4",
    title: "Marketing Digital Moderno",
    description:
      "Estrategias actualizadas para hacer crecer tu negocio en el mundo digital.",
    color: "#27AE60",
    price: "$29.99",
    buyUrl: "#",
  },
  {
    id: "5",
    title: "Mindfulness y Bienestar",
    description:
      "Encuentra la paz interior y mejora tu bienestar mental con prácticas de mindfulness.",
    color: "#2C3E50",
    price: "$15.99",
    buyUrl: "#",
  },
  {
    id: "6",
    title: "Emprendimiento desde Cero",
    description:
      "Todo lo que necesitas saber para iniciar y hacer crecer tu propio negocio.",
    color: "#F76C6C",
    price: "$22.99",
    buyUrl: "#",
  },
  {
    id: "7",
    title: "Liderazgo Efectivo",
    description:
      "Desarrolla las habilidades de liderazgo que te harán destacar en cualquier organización.",
    color: "#27AE60",
    price: "$26.99",
    buyUrl: "#",
  },
  {
    id: "8",
    title: "Nutrición y Salud Integral",
    description:
      "Guía completa para una alimentación saludable y un estilo de vida equilibrado.",
    color: "#2C3E50",
    price: "$20.99",
    buyUrl: "#",
  },
  {
    id: "9",
    title: "Tecnología y Futuro",
    description:
      "Explora las tendencias tecnológicas que están moldeando nuestro futuro.",
    color: "#F76C6C",
    price: "$18.99",
    buyUrl: "#",
  },
  {
    id: "10",
    title: "Comunicación Asertiva",
    description:
      "Mejora tus habilidades de comunicación y construye relaciones más fuertes.",
    color: "#27AE60",
    price: "$16.99",
    buyUrl: "#",
  },
];

const ProductsSection: React.FC = () => {
  return (
    <section id="productos" className={styles.productsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Ebooks</h2>
          <p className={styles.subtitle}>
            Descubre nuestra colección de ebooks diseñados para impulsar tu
            crecimiento personal y profesional
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              color={product.color}
              price={product.price}
              buyUrl={product.buyUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
