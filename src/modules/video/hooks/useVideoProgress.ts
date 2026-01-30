import { useQuery } from '@tanstack/react-query';
import { useVideoUploadService } from '@/container/hooks';
import type { VideoTaskProgress } from '@/primitives';

interface UseVideoProgressOptions {
  taskId: string | null;
  enabled?: boolean;
}

export function useVideoProgress({ taskId, enabled = true }: UseVideoProgressOptions) {
  const service = useVideoUploadService();

  return useQuery<VideoTaskProgress>({
    queryKey: ['video', 'progress', taskId],
    queryFn: () => service.getProgress(taskId!),
    enabled: enabled && !!taskId,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Poll faster when processing, stop when done
      if (!data) return 2000;
      if (data.status === 'processing') return 1000;
      if (data.status === 'queued') return 2000;
      return false; // Stop polling when completed or failed
    },
  });
}
