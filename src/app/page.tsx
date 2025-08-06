import Hero from "@/components/Hero/Hero";
import AboutUs from "@/components/AboutUs/AboutUs";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import Footer from "@/components/Footer/Footer";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="Inicio"
        description="Descubre contenido digital inspirador para tu desarrollo personal y profesional. Recetas BLW, jardinería, jabones artesanales, reiki y más recursos curados por Ángeles Gardón."
        keywords={[
          "desarrollo personal argentina",
          "contenido digital inspirador",
          "recetas BLW",
          "jardinería para principiantes",
          "jabones artesanales",
          "reiki para principiantes",
          "cartas angelicales",
          "entrenamiento para escritoras"
        ]}
        breadcrumbs={[
          { name: "Inicio", url: "/" }
        ]}
        faqs={[
          {
            question: "¿Qué es Aquiles Conecta?",
            answer: "Aquiles Conecta es un espacio curado por Ángeles Gardón para compartir contenidos digitales que inspiran y transforman, enfocado en desarrollo personal y profesional."
          },
          {
            question: "¿Qué tipo de productos recomiendan?",
            answer: "Recomendamos productos digitales de alta calidad en áreas como desarrollo personal, recetas BLW para niños, jardinería, jabones artesanales, reiki y escritura."
          },
          {
            question: "¿Cómo puedo contactar con Ángeles Gardón?",
            answer: "Puedes contactar con Ángeles a través de Instagram @aquilesconecta, WhatsApp o enviando un email a aquilesconecta@gmail.com"
          }
        ]}
      />
      <main>
        <Hero />
        <AboutUs />
        <ProductsSection />
        <Footer />
      </main>
    </>
  );
}
