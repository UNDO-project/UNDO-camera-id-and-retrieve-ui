'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useVideoUploadService } from '@/container/hooks';

/**
 * Release a video task on the server (upload, output and task entry).
 *
 * Fire-and-forget by design: the server sweeps finished tasks itself after
 * the retention window, so a failed delete (e.g. 404 because the task already
 * expired) is swallowed and never surfaces to the user.
 */
export function useDeleteVideoTask() {
  const service = useVideoUploadService();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (taskId) => service.deleteTask(taskId),
    onSettled: (_data, _error, taskId) => {
      queryClient.removeQueries({ queryKey: ['video', 'progress', taskId] });
    },
  });
}
