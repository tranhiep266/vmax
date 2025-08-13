import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSidebarProps {
  filters: {
    priceRanges: string[];
    brands: string[];
    storage: string[];
  };
  selectedFilters: {
    priceRanges: string[];
    brands: string[];
    storage: string[];
  };
  onFilterChange: (type: string, value: string, checked: boolean) => void;
}

export default function FilterSidebar({ filters, selectedFilters, onFilterChange }: FilterSidebarProps) {
  const priceRangeOptions = [
    { value: "under-200", label: "Under $200" },
    { value: "200-500", label: "$200 - $500" },
    { value: "500-800", label: "$500 - $800" },
    { value: "over-800", label: "Over $800" },
  ];

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
        <h3 className="text-lg font-bold text-primary-custom mb-4">Filters</h3>
        
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-semibold text-primary-custom mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRangeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`price-${option.value}`}
                  checked={selectedFilters.priceRanges.includes(option.value)}
                  onCheckedChange={(checked) => 
                    onFilterChange("priceRanges", option.value, checked as boolean)
                  }
                  data-testid={`checkbox-price-${option.value}`}
                />
                <Label htmlFor={`price-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Brand */}
        <div className="mb-6">
          <h4 className="font-semibold text-primary-custom mb-3">Brand</h4>
          <div className="space-y-2">
            {filters.brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedFilters.brands.includes(brand)}
                  onCheckedChange={(checked) => 
                    onFilterChange("brands", brand, checked as boolean)
                  }
                  data-testid={`checkbox-brand-${brand.toLowerCase()}`}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Storage */}
        {filters.storage.length > 0 && (
          <div>
            <h4 className="font-semibold text-primary-custom mb-3">Storage</h4>
            <div className="space-y-2">
              {filters.storage.map((storage) => (
                <div key={storage} className="flex items-center space-x-2">
                  <Checkbox
                    id={`storage-${storage}`}
                    checked={selectedFilters.storage.includes(storage)}
                    onCheckedChange={(checked) => 
                      onFilterChange("storage", storage, checked as boolean)
                    }
                    data-testid={`checkbox-storage-${storage.toLowerCase()}`}
                  />
                  <Label htmlFor={`storage-${storage}`} className="text-sm">
                    {storage}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
