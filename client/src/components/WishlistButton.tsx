import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export default function WishlistButton({ productId, className = "", size = "sm" }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  // Load wishlist state from localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(productId));
  }, [productId]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      // Remove from wishlist
      newWishlist = wishlist.filter((id: string) => id !== productId);
      setIsWishlisted(false);
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    } else {
      // Add to wishlist
      newWishlist = [...wishlist, productId];
      setIsWishlisted(true);
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist.",
      });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return (
    <Button
      variant="ghost"
      size={size}
      className={className}
      onClick={handleWishlistToggle}
      data-testid={`button-wishlist-${productId}`}
    >
      <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? 'text-destructive-custom fill-current' : 'text-gray-400'}`} />
    </Button>
  );
}