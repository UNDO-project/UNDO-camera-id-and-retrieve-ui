'use client';
import { useQuery } from '@tanstack/react-query';
import { useCatalogService } from '@/container/hooks';
import type { CatalogStats } from '@/primitives';

export function useCatalogStats() {
  const catalogService = useCatalogService();

  return useQuery<CatalogStats>({
    queryKey: ['catalog', 'stats'],
    queryFn: () => catalogService.getStats(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
