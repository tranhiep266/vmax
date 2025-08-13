import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import FeaturedCategories from "@/components/FeaturedCategories";
import ProductGrid from "@/components/ProductGrid";
import ShoppingCart from "@/components/ShoppingCart";
import StoreInfo from "@/components/StoreInfo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustIndicators />
      <FeaturedCategories />
      <ProductGrid />
      <StoreInfo />
      <Footer />
      <ShoppingCart />
    </div>
  );
}
