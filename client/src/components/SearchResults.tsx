import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchResults({ isOpen, onClose, searchQuery, onSearchChange }: SearchResultsProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: isOpen && debouncedQuery.length > 0,
  });

  // Filter products based on search query
  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(debouncedQuery.toLowerCase())
  ) || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div 
        className="fixed top-0 left-0 right-0 bg-white shadow-xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="search-results-overlay"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 mr-4">
              <Input
                type="text"
                placeholder="Search phones, accessories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full text-lg py-3"
                autoFocus
                data-testid="input-search-overlay"
              />
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} data-testid="button-close-search">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {debouncedQuery.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary-custom">Start typing to search for products...</p>
            </div>
          ) : isLoading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-secondary-custom" data-testid="text-search-results-count">
                  {filteredProducts.length} results found for "{debouncedQuery}"
                </p>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-secondary-custom" data-testid="text-no-search-results">
                    No products found matching your search.
                  </p>
                  <p className="text-secondary-custom mt-2">
                    Try different keywords or browse our categories.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="grid-search-results">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}