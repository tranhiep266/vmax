import { useParams } from "wouter";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Minus, Plus, ShoppingCart as ShoppingCartIcon, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import WishlistButton from "@/components/WishlistButton";
import Reviews from "@/pages/Reviews";
import { apiRequest } from "@/lib/queryClient";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { sessionId, openCart } = useCartStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', id],
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/cart", {
        productId: id!,
        quantity,
        sessionId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Added to cart",
        description: `${product?.name} has been added to your cart.`,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary-custom mb-4">Product Not Found</h1>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  const specifications = product.specifications ? JSON.parse(product.specifications) : {};

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-secondary-custom hover:text-accent-custom transition-colors" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl"
                data-testid="img-product-detail"
              />
              <div className="absolute top-4 left-4">
                {getStockBadge()}
              </div>
              <WishlistButton 
                productId={product.id}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary-custom mb-2" data-testid="text-product-detail-name">
                {product.name}
              </h1>
              <p className="text-secondary-custom" data-testid="text-product-detail-description">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars()}
              </div>
              <span className="text-secondary-custom" data-testid="text-product-detail-rating">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary-custom" data-testid="text-product-detail-price">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-secondary-custom line-through" data-testid="text-product-detail-original-price">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-primary-custom mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-secondary-custom" data-testid={`feature-${index}`}>
                      <span className="w-2 h-2 bg-accent-custom rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-semibold text-primary-custom">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center" data-testid="text-quantity">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-accent-custom hover:hover:bg-accent-hover text-white font-semibold py-3"
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending || product.stockLevel === "out_of_stock"}
                  data-testid="button-add-to-cart-detail"
                >
                  <ShoppingCartIcon className="h-4 w-4 mr-2" />
                  {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-accent-custom text-accent-custom hover:bg-accent-custom hover:text-white font-semibold py-3"
                  data-testid="button-buy-now"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications" data-testid="tab-specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping" data-testid="tab-shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="bg-background-gray rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary-custom mb-4">Product Specifications</h3>
                {Object.keys(specifications).length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-primary-custom capitalize">{key}:</span>
                        <span className="text-secondary-custom">{value as string}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-custom">No detailed specifications available.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Reviews productId={product.id} productName={product.name} />
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <div className="bg-background-gray rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary-custom mb-4">Shipping Information</h3>
                <div className="space-y-3">
                  <p><strong>Free Shipping:</strong> Orders over $99</p>
                  <p><strong>Standard Shipping:</strong> 5-7 business days ($5.99)</p>
                  <p><strong>Express Shipping:</strong> 2-3 business days ($12.99)</p>
                  <p><strong>Next Day Delivery:</strong> Order by 2 PM for next day delivery ($24.99)</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
      <ShoppingCart />
    </div>
  );
}
