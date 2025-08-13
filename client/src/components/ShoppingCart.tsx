import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ShoppingCart() {
  const { cart, isCartOpen, closeCart, sessionId } = useCartStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${itemId}`, { quantity, sessionId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return apiRequest("DELETE", `/api/cart/${itemId}`, { sessionId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    updateQuantityMutation.mutate({ itemId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItemMutation.mutate(itemId);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeCart}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="cart-overlay"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-primary-custom" data-testid="text-cart-title">
            Shopping Cart ({cart?.itemCount || 0})
          </h3>
          <Button variant="ghost" size="sm" onClick={closeCart} data-testid="button-close-cart">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
          {!cart || cart.items.length === 0 ? (
            <div className="text-center py-12" data-testid="empty-cart">
              <p className="text-secondary-custom">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item: any) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  data-testid={`cart-item-${item.id}`}
                >
                  <img 
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-custom text-sm" data-testid={`text-cart-item-name-${item.id}`}>
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-secondary-custom">
                      {item.product.storage && item.product.color 
                        ? `${item.product.storage}, ${item.product.color}`
                        : item.product.description.slice(0, 50)
                      }
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-primary-custom" data-testid={`text-cart-item-price-${item.id}`}>
                        ${item.product.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-6 h-6 p-0 text-xs"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={updateQuantityMutation.isPending}
                          data-testid={`button-decrease-quantity-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm min-w-[20px] text-center" data-testid={`text-cart-item-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-6 h-6 p-0 text-xs"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={updateQuantityMutation.isPending}
                          data-testid={`button-increase-quantity-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive-custom hover:text-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={removeItemMutation.isPending}
                    data-testid={`button-remove-item-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart && cart.items.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span data-testid="text-cart-subtotal">${cart.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="text-success-custom">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span data-testid="text-cart-tax">${cart.tax}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span data-testid="text-cart-total">${cart.total}</span>
                </div>
              </div>
            </div>
            <Link href="/checkout">
              <Button 
                className="w-full bg-accent-custom hover:hover:bg-accent-hover text-white py-3 font-semibold"
                data-testid="button-checkout"
              >
                Proceed to Checkout - ${cart.total}
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full mt-2 border-gray-300 hover:bg-gray-50 text-primary-custom py-2 font-semibold"
              onClick={closeCart}
              data-testid="button-continue-shopping"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
