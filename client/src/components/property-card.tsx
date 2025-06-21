import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import { Link } from "wouter";
import type { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
  onContactClick?: (property: Property) => void;
}

export default function PropertyCard({ property, onContactClick }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: string) => {
    return `$${parseInt(price).toLocaleString()}/mo`;
  };

  const getBedroomText = (bedrooms: number) => {
    if (bedrooms === 0) return "Studio";
    return `${bedrooms} bed${bedrooms > 1 ? 's' : ''}`;
  };

  const getBathroomText = (bathrooms: string) => {
    const bath = parseFloat(bathrooms);
    return `${bath} bath${bath > 1 ? 's' : ''}`;
  };

  const getAvailabilityText = (availableDate: string | null) => {
    if (!availableDate) return "Available Now";
    const date = new Date(availableDate);
    return `Available ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const isNew = property.createdAt && 
    new Date().getTime() - new Date(property.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Link href={`/property/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer property-card">
        <div className="relative">
          <img
            src={property.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
            alt={property.title || property.address}
            className="w-full h-48 object-cover transition-transform duration-300"
          />
          {isNew && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-accent text-white">New</Badge>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              {formatPrice(property.price)}
            </h3>
            <div className="flex items-center text-sm text-neutral-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>0.3 mi</span>
            </div>
          </div>
          
          <p className="text-sm text-neutral-600 mb-2">
            {getBedroomText(property.bedrooms)} • {getBathroomText(property.bathrooms)}
            {property.squareFeet && ` • ${property.squareFeet.toLocaleString()} sqft`}
          </p>
          
          <p className="text-sm text-neutral-600 mb-3 truncate">
            {property.address}
          </p>
          
          <div className="flex items-center space-x-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {property.neighborhood}
            </Badge>
            {property.walkScore && (
              <Badge variant="outline" className="text-xs">
                Walk Score: {property.walkScore}
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-neutral-500">
            {getAvailabilityText(property.availableDate)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
