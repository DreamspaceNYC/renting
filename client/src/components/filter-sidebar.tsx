import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import type { PropertySearchFilters } from "@/lib/types";

interface FilterSidebarProps {
  filters: PropertySearchFilters;
  onFiltersChange: (filters: PropertySearchFilters) => void;
}

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleClearAll = () => {
    setMinPrice("");
    setMaxPrice("");
    setPropertyTypes([]);
    setAmenities([]);
    onFiltersChange({});
  };

  const handlePriceChange = () => {
    const updatedFilters = { ...filters };
    if (minPrice) updatedFilters.minPrice = parseInt(minPrice);
    else delete updatedFilters.minPrice;
    if (maxPrice) updatedFilters.maxPrice = parseInt(maxPrice);
    else delete updatedFilters.maxPrice;
    onFiltersChange(updatedFilters);
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    let updated;
    if (checked) {
      updated = [...propertyTypes, type];
    } else {
      updated = propertyTypes.filter(t => t !== type);
    }
    setPropertyTypes(updated);
    
    const updatedFilters = { ...filters };
    if (updated.length > 0) {
      updatedFilters.propertyType = updated[0]; // For simplicity, use first selected
    } else {
      delete updatedFilters.propertyType;
    }
    onFiltersChange(updatedFilters);
  };

  return (
    <Card className="lg:w-80 flex-shrink-0 p-6 filter-sidebar">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
        <Button 
          variant="ghost" 
          onClick={handleClearAll}
          className="text-primary hover:text-primary-dark text-sm font-medium"
        >
          Clear All
        </Button>
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-900 mb-3">Price Range</h4>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
            className="text-sm"
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
            className="text-sm"
          />
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-900 mb-3">Property Type</h4>
        <div className="space-y-2">
          {["apartment", "condo", "townhouse"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={propertyTypes.includes(type)}
                onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={type} className="text-sm text-neutral-900 capitalize">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-900 mb-3">Amenities</h4>
        <div className="space-y-2">
          {[
            "Laundry in Building",
            "Doorman",
            "Pet Friendly",
            "Gym/Fitness"
          ].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={amenities.includes(amenity)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAmenities([...amenities, amenity]);
                  } else {
                    setAmenities(amenities.filter(a => a !== amenity));
                  }
                }}
              />
              <Label htmlFor={amenity} className="text-sm text-neutral-900">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Transit Access */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-900 mb-3">Transit Access</h4>
        <div className="space-y-2">
          {["Subway Nearby", "Bus Stop"].map((transit) => (
            <div key={transit} className="flex items-center space-x-2">
              <Checkbox id={transit} />
              <Label htmlFor={transit} className="text-sm text-neutral-900">
                {transit}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
