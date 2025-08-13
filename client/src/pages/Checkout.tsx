import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be MM/YY"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
  nameOnCard: z.string().min(2, "Name on card is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, sessionId, clearCart } = useCartStore();
  const { toast } = useToast();
  
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear the cart after successful payment
      await clearCart(sessionId);
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${Date.now()} has been confirmed. You'll receive an email confirmation shortly.`,
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary-custom dark:text-primary-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-secondary-custom dark:text-muted-foreground mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-secondary-custom hover:text-accent-custom transition-colors" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} data-testid="input-first-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} data-testid="input-last-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} data-testid="input-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} data-testid="input-city" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-state">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ny">New York</SelectItem>
                                <SelectItem value="ca">California</SelectItem>
                                <SelectItem value="tx">Texas</SelectItem>
                                <SelectItem value="fl">Florida</SelectItem>
                                <SelectItem value="il">Illinois</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} data-testid="input-zip" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nameOnCard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on Card</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} data-testid="input-name-on-card" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012 3456" {...field} data-testid="input-card-number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} data-testid="input-expiry" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} data-testid="input-cvv" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isProcessing}
                      className="w-full bg-accent-custom hover:hover:bg-accent-hover text-white font-semibold py-3"
                      data-testid="button-place-order"
                    >
                      {isProcessing ? 'Processing...' : `Place Order - $${cart.total}`}
                    </Button>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img 
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-xs text-secondary-custom">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${cart.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className="text-success-custom">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${cart.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${cart.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-accent-custom" />
                    <span>Free shipping on orders over $99</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-accent-custom" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}