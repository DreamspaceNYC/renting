import { useQuery } from "@tanstack/react-query";
import type { PropertySearchFilters, PropertySearchResponse, Property } from "@/lib/types";

export function useProperties(filters: PropertySearchFilters = {}) {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  return useQuery<PropertySearchResponse>({
    queryKey: ['/api/properties', queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/properties?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      return response.json();
    },
  });
}

export function useProperty(id: number) {
  return useQuery<Property>({
    queryKey: ['/api/properties', id],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch property');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useNeighborhoods() {
  return useQuery<string[]>({
    queryKey: ['/api/neighborhoods'],
    queryFn: async () => {
      const response = await fetch('/api/neighborhoods');
      if (!response.ok) {
        throw new Error('Failed to fetch neighborhoods');
      }
      return response.json();
    },
  });
}

export function useBoroughs() {
  return useQuery<string[]>({
    queryKey: ['/api/boroughs'],
    queryFn: async () => {
      const response = await fetch('/api/boroughs');
      if (!response.ok) {
        throw new Error('Failed to fetch boroughs');
      }
      return response.json();
    },
  });
}
