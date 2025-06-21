import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import type { PropertySearchFilters } from "@/lib/types";

interface SearchBarProps {
  onSearch: (filters: PropertySearchFilters) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = () => {
    const filters: PropertySearchFilters = {};
    
    if (location) filters.location = location;
    if (priceRange && priceRange !== "any") {
      const [min, max] = priceRange.split('-').map(p => parseInt(p));
      if (min) filters.minPrice = min;
      if (max) filters.maxPrice = max;
    }
    if (bedrooms && bedrooms !== "any") {
      if (bedrooms === "studio") filters.bedrooms = 0;
      else filters.bedrooms = parseInt(bedrooms);
    }

    onSearch(filters);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-gray-700 mb-2">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Manhattan, Brooklyn, Queens..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 search-input"
              />
            </div>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Price Range</Label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="0-2000">Under $2,000</SelectItem>
                <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                <SelectItem value="3000-4000">$3,000 - $4,000</SelectItem>
                <SelectItem value="4000-99999">$4,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Any Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Beds</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1">1 Bed</SelectItem>
                <SelectItem value="2">2 Beds</SelectItem>
                <SelectItem value="3">3+ Beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            onClick={handleSearch}
            className="w-full bg-primary text-white hover:bg-primary-dark transition-colors font-semibold"
          >
            Search Rentals
          </Button>
        </div>
      </div>
    </div>
  );
}
