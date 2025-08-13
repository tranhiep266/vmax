import { Link } from "wouter";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Header() {
  const { 
    sessionId, 
    cart, 
    setCart, 
    isCartOpen, 
    isMobileMenuOpen, 
    toggleCart, 
    toggleMobileMenu, 
    closeMobileMenu 
  } = useCartStore();

  const { data: cartData } = useQuery({
    queryKey: ['/api/cart', sessionId],
    enabled: !!sessionId,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (cartData) {
      setCart(cartData as any);
    }
  }, [cartData, setCart]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm text-secondary-custom border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <i className="fas fa-phone mr-1"></i> (555) 123-4567
              </span>
              <span className="hidden md:inline flex items-center">
                <i className="fas fa-envelope mr-1"></i> info@techhub.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Free shipping on orders over $99</span>
              <Link href="#" className="hover:text-accent-custom transition-colors" data-testid="link-track-order">
                Track Order
              </Link>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-custom mr-8" data-testid="link-home">
                <i className="fas fa-mobile-alt mr-2 text-accent-custom"></i>TechHub
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                <div className="relative group">
                  <Link href="/" className="text-primary-custom hover:text-accent-custom transition-colors font-medium" data-testid="link-phones">
                    Phones <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </Link>
                </div>
                <Link href="/" className="text-primary-custom hover:text-accent-custom transition-colors font-medium" data-testid="link-accessories">
                  Accessories
                </Link>
                <Link href="#" className="text-primary-custom hover:text-accent-custom transition-colors font-medium" data-testid="link-repairs">
                  Repairs
                </Link>
                <Link href="#" className="text-primary-custom hover:text-accent-custom transition-colors font-medium" data-testid="link-about">
                  About
                </Link>
                <Link href="#" className="text-primary-custom hover:text-accent-custom transition-colors font-medium" data-testid="link-contact">
                  Contact
                </Link>
              </div>
            </div>
            
            {/* Search & Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex relative">
                <Input 
                  type="text" 
                  placeholder="Search phones, accessories..." 
                  className="w-64 pr-10 border-gray-300 focus:border-accent-custom focus:ring-accent-custom"
                  data-testid="input-search"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-secondary-custom hover:text-accent-custom"
                  data-testid="button-search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              {/* User Actions */}
              <Button variant="ghost" size="sm" className="text-primary-custom hover:text-accent-custom" data-testid="button-user">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-custom hover:text-accent-custom" data-testid="button-wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-primary-custom hover:text-accent-custom" 
                onClick={toggleCart}
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart && cart.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-custom text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" data-testid="text-cart-count">
                    {cart.itemCount}
                  </span>
                )}
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden text-primary-custom hover:text-accent-custom" 
                onClick={toggleMobileMenu}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeMobileMenu}>
          <div className="bg-white w-80 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary-custom">Menu</span>
                <Button variant="ghost" size="sm" onClick={closeMobileMenu} data-testid="button-close-mobile-menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <nav className="p-4 space-y-4">
              <Link href="/" className="block text-primary-custom hover:text-accent-custom transition-colors font-medium" onClick={closeMobileMenu} data-testid="link-mobile-phones">
                Phones
              </Link>
              <Link href="/" className="block text-primary-custom hover:text-accent-custom transition-colors font-medium" onClick={closeMobileMenu} data-testid="link-mobile-accessories">
                Accessories
              </Link>
              <Link href="#" className="block text-primary-custom hover:text-accent-custom transition-colors font-medium" onClick={closeMobileMenu} data-testid="link-mobile-repairs">
                Repairs
              </Link>
              <Link href="#" className="block text-primary-custom hover:text-accent-custom transition-colors font-medium" onClick={closeMobileMenu} data-testid="link-mobile-about">
                About
              </Link>
              <Link href="#" className="block text-primary-custom hover:text-accent-custom transition-colors font-medium" onClick={closeMobileMenu} data-testid="link-mobile-contact">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
