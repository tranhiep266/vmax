import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

interface ReviewsProps {
  productId: string;
  productName: string;
}

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  rating: z.string().min(1, "Please select a rating"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Review must be at least 20 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function Reviews({ productId, productName }: ReviewsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock reviews data
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      title: "Excellent phone with great camera!",
      content: "I've been using this phone for 3 months now and it's been fantastic. The camera quality is outstanding, especially for low-light photos. Battery life easily lasts a full day with heavy usage.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: "2",
      name: "Mike Chen",
      rating: 4,
      title: "Great performance, minor issues with battery",
      content: "The phone performs really well for gaming and multitasking. Display is crisp and colors are vibrant. Only complaint is the battery could be better for heavy users like me.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: "3",
      name: "Emma Wilson",
      rating: 5,
      title: "Perfect upgrade from my old phone",
      content: "Coming from a 4-year-old phone, this was a massive upgrade. Everything is faster, smoother, and the build quality feels premium. Highly recommend!",
      date: "2024-01-08",
      verified: false,
    },
  ]);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: "",
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate review submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Review submitted successfully!",
        description: "Thank you for your review. It will be published after moderation.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to submit review",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? "button" : undefined}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
          onClick={() => interactive && onRatingChange?.(i)}
          disabled={!interactive}
        >
          <Star 
            className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        </button>
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-primary-custom dark:text-primary-foreground mb-2">
            Customer Reviews
          </h3>
          <div className="flex items-center space-x-4">
            {renderStars(Math.round(averageRating))}
            <span className="text-lg font-semibold">{averageRating.toFixed(1)} out of 5</span>
            <span className="text-secondary-custom dark:text-muted-foreground">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Existing Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} data-testid={`review-${review.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-custom rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-custom dark:text-primary-foreground">
                      {review.name}
                      {review.verified && (
                        <span className="ml-2 text-xs bg-success-custom text-white px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-secondary-custom dark:text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h5 className="font-medium text-primary-custom dark:text-primary-foreground mb-2">
                {review.title}
              </h5>
              <p className="text-secondary-custom dark:text-muted-foreground leading-relaxed">
                {review.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Review Form */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review for {productName}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} data-testid="input-review-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} data-testid="input-review-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-review-rating">
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 Stars - Excellent</SelectItem>
                        <SelectItem value="4">4 Stars - Good</SelectItem>
                        <SelectItem value="3">3 Stars - Average</SelectItem>
                        <SelectItem value="2">2 Stars - Poor</SelectItem>
                        <SelectItem value="1">1 Star - Terrible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Summarize your experience" {...field} data-testid="input-review-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your experience with this product..."
                        className="min-h-32"
                        {...field}
                        data-testid="textarea-review-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent-custom hover:bg-accent-hover text-white font-semibold px-8 py-3"
                data-testid="button-review-submit"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}