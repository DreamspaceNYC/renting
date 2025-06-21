import { useState } from "react";
import { useParams } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Heart, Calendar, Home, Bath, Square, TrendingUp } from "lucide-react";
import { useProperty } from "@/hooks/use-properties";

export default function PropertyDetail() {
  const params = useParams();
  const propertyId = parseInt(params.id || "0");
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: property, isLoading, error } = useProperty(propertyId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="w-full h-96 rounded-xl" />
              <Skeleton className="w-3/4 h-8" />
              <Skeleton className="w-full h-32" />
            </div>
            <div className="space-y-6">
              <Skeleton className="w-full h-64 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return `$${parseInt(price).toLocaleString()}/mo`;
  };

  const getBedroomText = (bedrooms: number) => {
    if (bedrooms === 0) return "Studio";
    return `${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`;
  };

  const getBathroomText = (bathrooms: string) => {
    const bath = parseFloat(bathrooms);
    return `${bath} bathroom${bath > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Images */}
            <div className="relative">
              <img
                src={property.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"}
                alt={property.title || property.address}
                className="w-full h-96 object-cover rounded-xl"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>

            {/* Property Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                    {formatPrice(property.price)}
                  </h1>
                  <div className="flex items-center text-neutral-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.address}</span>
                  </div>
                  <p className="text-lg text-neutral-600">
                    {property.neighborhood}, {property.borough}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{property.propertyType}</Badge>
                  {property.walkScore && (
                    <Badge variant="outline">Walk Score: {property.walkScore}</Badge>
                  )}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Home className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{getBedroomText(property.bedrooms)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{getBathroomText(property.bathrooms)}</span>
                </div>
                {property.squareFeet && (
                  <div className="flex items-center space-x-2">
                    <Square className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{property.squareFeet.toLocaleString()} sqft</span>
                  </div>
                )}
                {property.availableDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      {new Date(property.availableDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">About This Property</h2>
                  <p className="text-neutral-600 leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Neighborhood Info */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Neighborhood</h2>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{property.neighborhood}</h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Discover what makes {property.neighborhood} a great place to live with its unique character and amenities.
                    </p>
                    <div className="flex items-center space-x-4">
                      {property.walkScore && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">Walk Score: {property.walkScore}</span>
                        </div>
                      )}
                      {property.transitScore && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">Transit Score: {property.transitScore}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
                <Button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-primary text-white hover:bg-primary-dark mb-3"
                >
                  Contact About This Property
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule a Tour
                </Button>
                <p className="text-xs text-neutral-500 mt-3 text-center">
                  Available {property.availableDate ? 
                    new Date(property.availableDate).toLocaleDateString() : 
                    'Now'
                  }
                </p>
              </CardContent>
            </Card>

            {/* Map Preview */}
            <Card>
              <CardContent className="p-0">
                <div className="h-48 bg-gray-200 rounded-t-lg relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Neighborhood map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                    📍
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-sm text-neutral-600">{property.address}</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    View larger map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {showContactModal && (
        <ContactModal
          property={property}
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}
