import Hero from "@/components/Hero/Hero";
import AboutUs from "@/components/AboutUs/AboutUs";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <ProductsSection />
      <Footer />
    </main>
  );
}
