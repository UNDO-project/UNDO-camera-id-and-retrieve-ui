import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useVideoUploadService } from '@/container/hooks';
import type { VideoFile, VideoTask, VideoProcessingOptions } from '@/primitives';

interface UploadVariables {
  video: VideoFile;
  options?: Partial<VideoProcessingOptions>;
}

export function useVideoUpload() {
  const service = useVideoUploadService();
  const queryClient = useQueryClient();

  return useMutation<VideoTask, Error, UploadVariables>({
    mutationFn: ({ video, options }) => service.upload(video, options),
    onSuccess: (task) => {
      // Invalidate any related queries
      queryClient.invalidateQueries({ queryKey: ['video', 'tasks'] });
    },
  });
}
