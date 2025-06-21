export interface Property {
  id: number;
  title: string;
  description: string | null;
  address: string;
  neighborhood: string;
  borough: string;
  price: string;
  bedrooms: number;
  bathrooms: string;
  squareFeet: number | null;
  propertyType: string;
  imageUrl: string | null;
  availableDate: string | null;
  walkScore: number | null;
  transitScore: number | null;
  latitude: string | null;
  longitude: string | null;
  isActive: boolean | null;
  createdAt: string | null;
}

export interface PropertySearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
  borough?: string;
  neighborhood?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'newest' | 'bedrooms';
  sortOrder?: 'asc' | 'desc';
}

export interface PropertySearchResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface Neighborhood {
  name: string;
  borough: string;
  averagePrice: string;
  propertyCount: number;
  walkScore?: number;
  imageUrl?: string;
}
