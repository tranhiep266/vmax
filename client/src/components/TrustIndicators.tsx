import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Truck,
      title: "Free Shipping",
      subtitle: "Orders over $99",
    },
    {
      icon: Shield,
      title: "2 Year Warranty",
      subtitle: "On all devices",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      subtitle: "No questions asked",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "Expert assistance",
    },
  ];

  return (
    <section className="py-8 bg-background-gray border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center" data-testid={`indicator-${indicator.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <indicator.icon className="h-8 w-8 text-accent-custom mb-2" />
              <span className="font-semibold text-primary-custom">{indicator.title}</span>
              <span className="text-sm text-secondary-custom">{indicator.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
