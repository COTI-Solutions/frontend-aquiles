import Hero from "@/components/Hero/Hero";
import AboutUs from "@/components/AboutUs/AboutUs";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import FAQ from "@/components/FAQ/FAQ";
import Footer from "@/components/Footer/Footer";
import SEO from "@/components/SEO";
import faqData from "@/faqData.json";

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
        faqs={faqData}
      />
      <main>
        <Hero />
        <AboutUs />
        <ProductsSection />
        <FAQ faqs={faqData} />
        <Footer />
      </main>
    </>
  );
}
