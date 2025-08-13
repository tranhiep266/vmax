export default function FeaturedCategories() {
  const categories = [
    {
      id: "smartphones",
      title: "Smartphones",
      subtitle: "Latest iOS & Android devices",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Modern smartphones display"
    },
    {
      id: "accessories",
      title: "Accessories",
      subtitle: "Cases, chargers & more",
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Smartphone accessories display"
    },
    {
      id: "repairs",
      title: "Repairs",
      subtitle: "Expert repair services",
      image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      alt: "Professional phone repair service"
    }
  ];

  return (
    <section className="py-16" id="categories">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-custom mb-4">Shop by Category</h2>
          <p className="text-lg text-secondary-custom max-w-2xl mx-auto">
            Find the perfect device and accessories for your lifestyle
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer" data-testid={`category-${category.id}`}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
