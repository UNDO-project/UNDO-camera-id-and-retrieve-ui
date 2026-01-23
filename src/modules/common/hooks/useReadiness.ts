'use client';

import { useQuery } from '@tanstack/react-query';
import { useHealthService } from '@/container/hooks';
import type { ReadinessStatus } from '@/services/interfaces';

export function useReadiness() {
  const healthService = useHealthService();

  return useQuery<ReadinessStatus>({
    queryKey: ['health', 'readiness'],
    queryFn: () => healthService.checkReadiness(),
    refetchInterval: (query) => {
      // Poll every 5 seconds if not ready, otherwise every 30 seconds
      return query.state.data?.ready ? 30000 : 5000;
    },
    // Don't retry too aggressively on failure, maybe backend is down
    retry: 3,
  });
}
