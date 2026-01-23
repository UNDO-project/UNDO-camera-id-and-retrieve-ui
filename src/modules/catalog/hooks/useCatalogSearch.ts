'use client';
import { useQuery } from '@tanstack/react-query';
import { useCatalogService } from '@/container/hooks';
import type { CatalogFilters } from '@/primitives';
import { PaginatedCameras } from '@/services/interfaces';

export function useCatalogSearch(query: string, filters?: CatalogFilters) {
  const catalogService = useCatalogService();

  return useQuery<PaginatedCameras>({
    queryKey: ['catalog', 'search', query, filters],
    queryFn: () => catalogService.search(query, filters),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
