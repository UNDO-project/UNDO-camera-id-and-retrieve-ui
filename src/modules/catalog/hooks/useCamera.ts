import { useQuery } from '@tanstack/react-query';
import { useCatalogService } from '@/container/hooks';
import type { CameraRecord } from '@/primitives';

export function useCamera(id: string) {
  const catalogService = useCatalogService();

  return useQuery<CameraRecord>({
    queryKey: ['catalog', 'camera', id],
    queryFn: () => catalogService.getCamera(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRelatedCameras(
  id: string,
  type: 'series' | 'category',
  options?: { enabled?: boolean }
) {
  const catalogService = useCatalogService();

  return useQuery<CameraRecord[]>({
    queryKey: ['catalog', 'related', id, type],
    queryFn: () => catalogService.getRelatedCameras(id, type),
    enabled: !!id && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
