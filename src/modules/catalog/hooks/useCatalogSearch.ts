'use client';
import { useQuery } from '@tanstack/react-query';
import { useCatalogService } from '@/container/hooks';
import type { CatalogFilters, CameraRecord } from '@/primitives';

export function useCatalogSearch(query: string, filters?: CatalogFilters) {
  const catalogService = useCatalogService();

  return useQuery<CameraRecord[]>({
    queryKey: ['catalog', 'search', query, filters],
    queryFn: () => catalogService.search(query, filters),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
