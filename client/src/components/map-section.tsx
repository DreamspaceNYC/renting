import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export default function MapSection() {
  return (
    <section className="bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Explore NYC Neighborhoods
          </h2>
          <p className="text-lg text-neutral-600">
            Discover the perfect location for your next rental
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="relative h-96 bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
              alt="NYC skyline and neighborhoods map view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <Button size="icon" className="bg-white text-black hover:bg-gray-100">
                <Plus className="w-5 h-5" />
              </Button>
              <Button size="icon" className="bg-white text-black hover:bg-gray-100">
                <Minus className="w-5 h-5" />
              </Button>
            </div>

            {/* Property Markers */}
            <div className="absolute top-1/4 left-1/3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shadow-lg cursor-pointer hover:scale-110 transition-transform map-marker">
              $3.2k
            </div>
            <div className="absolute top-1/2 left-1/4 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shadow-lg cursor-pointer hover:scale-110 transition-transform map-marker">
              $2.8k
            </div>
            <div className="absolute top-1/3 right-1/3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shadow-lg cursor-pointer hover:scale-110 transition-transform map-marker">
              $4.1k
            </div>
            <div className="absolute bottom-1/3 left-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shadow-lg cursor-pointer hover:scale-110 transition-transform map-marker">
              $3.6k
            </div>

            {/* Neighborhood Labels */}
            <div className="absolute top-1/4 left-1/4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium">
              Manhattan
            </div>
            <div className="absolute bottom-1/3 right-1/4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium">
              Brooklyn
            </div>
            <div className="absolute top-1/3 right-1/4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium">
              Queens
            </div>
          </div>
          
          {/* Map Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <span className="text-sm text-neutral-600">Available Properties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                  <span className="text-sm text-neutral-600">New Listings</span>
                </div>
              </div>
              <Button variant="link" className="text-primary hover:text-primary-dark font-medium text-sm">
                View Full Map
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
