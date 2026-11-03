import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeleteVideoTask } from '../useDeleteVideoTask';
import { createWrapper } from '@/test/utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';

const mockDeleteTask = vi.fn();
vi.mock('@/container/hooks', () => ({
  useVideoUploadService: () => ({
    deleteTask: mockDeleteTask,
  }),
}));

describe('useDeleteVideoTask', () => {
  beforeEach(() => {
    mockDeleteTask.mockReset();
  });

  it('calls deleteTask with the task id', async () => {
    mockDeleteTask.mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteVideoTask(), { wrapper: createWrapper() });

    result.current.mutate('task-1');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockDeleteTask).toHaveBeenCalledWith('task-1');
  });

  it('removes the cached progress query for the task', async () => {
    mockDeleteTask.mockResolvedValue(undefined);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    queryClient.setQueryData(['video', 'progress', 'task-1'], { taskId: 'task-1' });
    queryClient.setQueryData(['video', 'progress', 'other'], { taskId: 'other' });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useDeleteVideoTask(), { wrapper });

    result.current.mutate('task-1');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(queryClient.getQueryData(['video', 'progress', 'task-1'])).toBeUndefined();
    expect(queryClient.getQueryData(['video', 'progress', 'other'])).toBeDefined();
  });

  it('reports an error without throwing when the server rejects', async () => {
    mockDeleteTask.mockRejectedValue(new Error('Task not found'));

    const { result } = renderHook(() => useDeleteVideoTask(), { wrapper: createWrapper() });

    result.current.mutate('gone');

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(mockDeleteTask).toHaveBeenCalledWith('gone');
  });
});
