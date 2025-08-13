import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import type { Product } from "@shared/schema";

export default function ProductGrid() {
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilters, setSelectedFilters] = useState({
    priceRanges: [] as string[],
    brands: [] as string[],
    storage: [] as string[],
  });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Extract unique filter options from products
  const filterOptions = useMemo(() => {
    if (!products) return { priceRanges: [], brands: [], storage: [] };

    const brands = Array.from(new Set(products.map(p => p.brand)));
    const storage = Array.from(new Set(products.filter(p => p.storage).map(p => p.storage!)));

    return {
      priceRanges: [], // Static options handled in FilterSidebar
      brands,
      storage,
    };
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter(product => {
      // Price range filter
      if (selectedFilters.priceRanges.length > 0) {
        const price = parseFloat(product.price);
        const matchesPriceRange = selectedFilters.priceRanges.some(range => {
          switch (range) {
            case "under-200": return price < 200;
            case "200-500": return price >= 200 && price <= 500;
            case "500-800": return price >= 500 && price <= 800;
            case "over-800": return price > 800;
            default: return true;
          }
        });
        if (!matchesPriceRange) return false;
      }

      // Brand filter
      if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
        return false;
      }

      // Storage filter
      if (selectedFilters.storage.length > 0 && product.storage && !selectedFilters.storage.includes(product.storage)) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        // For demo purposes, sort by name (in real app, would sort by created date)
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "best-selling":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [products, selectedFilters, sortBy]);

  const handleFilterChange = (type: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: checked 
        ? [...prev[type as keyof typeof prev], value]
        : prev[type as keyof typeof prev].filter(item => item !== value)
    }));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-background-gray" id="products">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Skeleton className="h-6 w-20 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </aside>
            <main className="flex-1">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                    <Skeleton className="h-48 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background-gray" id="products">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
            filters={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
          
          <main className="flex-1">
            {/* Search & Sort Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-primary-custom">Featured Products</h2>
                <p className="text-secondary-custom" data-testid="text-product-count">
                  Showing {filteredAndSortedProducts.length} of {products?.length || 0} products
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48" data-testid="select-sort">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Sort by: Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-gray-300 rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`p-2 ${viewMode === 'grid' ? 'text-accent-custom' : 'text-gray-400'}`}
                    onClick={() => setViewMode('grid')}
                    data-testid="button-view-grid"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`p-2 ${viewMode === 'list' ? 'text-accent-custom' : 'text-gray-400'}`}
                    onClick={() => setViewMode('list')}
                    data-testid="button-view-list"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-secondary-custom" data-testid="text-no-products">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-products">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
