import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="bg-primary-light text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-mobile-alt mr-2 text-accent-custom text-xl"></i>
              <span className="text-xl font-bold text-white">TechHub</span>
            </div>
            <p className="mb-4">
              Your trusted source for the latest mobile phones and accessories. Quality products, expert service, unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-accent-custom transition-colors" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-accent-custom transition-colors" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-accent-custom transition-colors" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-accent-custom transition-colors" data-testid="link-youtube">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="#" className="block hover:text-accent-custom transition-colors" data-testid="link-about">
                About Us
              </Link>
              <Link href="#" className="block hover:text-accent-custom transition-colors" data-testid="link-contact">
                Contact Us
              </Link>
              <Link href="#" className="block hover:text-accent-custom transition-colors" data-testid="link-shipping">
                Shipping Info
              </Link>
              <Link href="#" className="block hover:text-accent-custom transition-colors" data-testid="link-returns">
                Returns & Exchanges
              </Link>
              <Link href="#" className="block hover:text-accent-custom transition-colors" data-testid="link-size-guide">
                Size Guide
              </Link>
              <Link href="#" className="block hover:text-accent-custom transition-colors" data-testid="link-track-order">
                Track Your Order
              </Link>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-accent-custom transition-colors" data-testid="link-iphones">
                iPhones
              </Link>
              <Link href="/" className="block hover:text-accent-custom transition-colors" data-testid="link-samsung">
                Samsung Galaxy
              </Link>
              <Link href="/" className="block hover:text-accent-custom transition-colors" data-testid="link-google">
                Google Pixel
              </Link>
              <Link href="/" className="block hover:text-accent-custom transition-colors" data-testid="link-cases">
                Phone Cases
              </Link>
              <Link href="/" className="block hover:text-accent-custom transition-colors" data-testid="link-chargers">
                Chargers
              </Link>
              <Link href="/" className="block hover:text-accent-custom transition-colors" data-testid="link-accessories">
                Accessories
              </Link>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="mb-4">Get the latest updates on new products and exclusive offers.</p>
            <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-custom border-gray-600 text-white placeholder-gray-400 focus:border-accent-custom"
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                className="w-full bg-accent-custom hover:hover:bg-accent-hover text-white font-semibold"
                data-testid="button-subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p>&copy; 2024 TechHub Mobile Store. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
