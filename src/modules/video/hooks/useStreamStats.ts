import { useQuery } from '@tanstack/react-query';
import { useVideoStreamService } from '@/container/hooks';
import type { StreamStats } from '@/primitives';

export function useStreamStats(enabled = true) {
  const service = useVideoStreamService();

  return useQuery<StreamStats>({
    queryKey: ['stream', 'stats'],
    queryFn: () => service.getStats(),
    enabled,
    refetchInterval: 5000, // Poll every 5 seconds
  });
}
