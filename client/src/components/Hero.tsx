import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-custom to-primary-light text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Latest Mobile Phones & Accessories
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Discover the newest smartphones and premium accessories at unbeatable prices. 
              Free shipping on orders over $99.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToProducts}
                className="bg-accent-custom hover:hover:bg-accent-hover text-white px-8 py-3 font-semibold"
                data-testid="button-shop-now"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white hover:bg-white hover:text-primary-custom text-white px-8 py-3 font-semibold"
                data-testid="button-view-deals"
              >
                View Deals
              </Button>
            </div>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Latest smartphones display" 
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              data-testid="img-hero-phones"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
