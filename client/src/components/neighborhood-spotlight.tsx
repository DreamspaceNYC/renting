import { Card } from "@/components/ui/card";

interface Neighborhood {
  name: string;
  description: string;
  rentals: number;
  averagePrice: string;
  imageUrl: string;
}

const neighborhoods: Neighborhood[] = [
  {
    name: "Manhattan",
    description: "The heart of NYC with world-class dining, shopping, and entertainment",
    rentals: 347,
    averagePrice: "$3,200",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Brooklyn",
    description: "Trendy neighborhoods with artisanal culture and waterfront views",
    rentals: 278,
    averagePrice: "$2,800",
    imageUrl: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Queens",
    description: "Diverse communities with authentic cuisine and affordable living",
    rentals: 189,
    averagePrice: "$2,400",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    name: "Bronx",
    description: "Growing neighborhoods with parks, culture, and affordability",
    rentals: 156,
    averagePrice: "$2,100",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];

export default function NeighborhoodSpotlight() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Popular NYC Neighborhoods
          </h2>
          <p className="text-lg text-neutral-600">
            Explore what makes each area unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {neighborhoods.map((neighborhood) => (
            <Card 
              key={neighborhood.name} 
              className="group cursor-pointer overflow-hidden neighborhood-card"
            >
              <img
                src={neighborhood.imageUrl}
                alt={`${neighborhood.name} neighborhood view`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {neighborhood.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  {neighborhood.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {neighborhood.rentals} rentals
                  </span>
                  <span className="text-sm text-neutral-600">
                    {neighborhood.averagePrice} avg
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
