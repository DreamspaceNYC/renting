import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List } from "lucide-react";
import PropertyCard from "./property-card";
import ContactModal from "./contact-modal";
import type { Property, PropertySearchFilters } from "@/lib/types";

interface PropertyGridProps {
  properties: Property[];
  total: number;
  isLoading: boolean;
  onSortChange: (sort: string) => void;
  onContactProperty: (property: Property) => void;
}

export default function PropertyGrid({ 
  properties, 
  total, 
  isLoading, 
  onSortChange,
  onContactProperty 
}: PropertyGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleContactClick = (property: Property) => {
    setSelectedProperty(property);
    onContactProperty(property);
  };

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">
          {total.toLocaleString()} NYC Rentals
        </h2>
        <div className="flex items-center space-x-4">
          <Select onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="bedrooms">Bedrooms</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border border-gray-300 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 mb-4">No properties found matching your criteria</p>
          <p className="text-sm text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onContactClick={handleContactClick}
            />
          ))}
        </div>
      )}

      {selectedProperty && (
        <ContactModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
