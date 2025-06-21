import { useState } from "react";
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import FilterSidebar from "@/components/filter-sidebar";
import PropertyGrid from "@/components/property-grid";
import MapSection from "@/components/map-section";
import NeighborhoodSpotlight from "@/components/neighborhood-spotlight";
import Footer from "@/components/footer";
import { useProperties } from "@/hooks/use-properties";
import type { PropertySearchFilters, Property } from "@/lib/types";

export default function Home() {
  const [filters, setFilters] = useState<PropertySearchFilters>({});
  const [sortBy, setSortBy] = useState("newest");
  
  const { data, isLoading, error } = useProperties({
    ...filters,
    sortBy: sortBy.split('-')[0] as any,
    sortOrder: sortBy.includes('-') ? sortBy.split('-')[1] as 'asc' | 'desc' : 'desc'
  });

  const handleSearch = (searchFilters: PropertySearchFilters) => {
    setFilters(prev => ({ ...prev, ...searchFilters, page: 1 }));
  };

  const handleFiltersChange = (newFilters: PropertySearchFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleContactProperty = (property: Property) => {
    // This will be handled by the ContactModal in PropertyGrid
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="nyc-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect NYC Apartment
            </h1>
            <p className="text-xl opacity-90">
              Discover amazing rental properties across all five boroughs
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          
          <PropertyGrid
            properties={data?.properties || []}
            total={data?.pagination.total || 0}
            isLoading={isLoading}
            onSortChange={handleSortChange}
            onContactProperty={handleContactProperty}
          />
        </div>
      </main>

      <MapSection />
      <NeighborhoodSpotlight />
      <Footer />
    </div>
  );
}
