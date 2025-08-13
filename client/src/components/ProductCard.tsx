import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { sessionId, openCart } = useCartStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
        sessionId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      openCart();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartMutation.mutate();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const getStockBadge = () => {
    if (product.stockLevel === "low_stock") {
      return <Badge className="bg-orange-500 text-white">Low Stock</Badge>;
    }
    if (product.stockLevel === "out_of_stock") {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    return <Badge className="bg-success-custom text-white">In Stock</Badge>;
  };

  const renderStars = () => {
    const rating = parseFloat(product.rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star text-xs ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer" data-testid={`card-product-${product.id}`}>
        <div className="relative">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-testid={`img-product-${product.id}`}
          />
          <div className="absolute top-3 left-3">
            {getStockBadge()}
          </div>
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
              onClick={handleWishlistToggle}
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? 'text-destructive-custom fill-current' : 'text-gray-400'}`} />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-primary-custom mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-secondary-custom mb-3" data-testid={`text-product-description-${product.id}`}>
            {product.storage && product.color ? `${product.storage}, ${product.color}` : product.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary-custom" data-testid={`text-product-price-${product.id}`}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-secondary-custom line-through ml-2" data-testid={`text-product-original-price-${product.id}`}>
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center text-yellow-400">
              {renderStars()}
              <span className="text-secondary-custom text-xs ml-1" data-testid={`text-product-reviews-${product.id}`}>
                ({product.reviewCount})
              </span>
            </div>
          </div>
          <Button 
            className="w-full bg-accent-custom hover:hover:bg-accent-hover text-white font-semibold"
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending || product.stockLevel === "out_of_stock"}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
