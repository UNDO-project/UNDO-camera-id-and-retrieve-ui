import { renderHook, waitFor } from '@testing-library/react';
import { useVideoUpload } from '../useVideoUpload';
import { createWrapper } from '@/test/utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the hook service directly
const mockUpload = vi.fn();
vi.mock('@/container/hooks', () => ({
  useVideoUploadService: () => ({
    upload: mockUpload,
  }),
}));

describe('useVideoUpload', () => {
  beforeEach(() => {
    mockUpload.mockReset();
  });

  it('triggers upload mutation', async () => {
    mockUpload.mockResolvedValue({
      taskId: '123',
      status: 'queued',
    });

    const { result } = renderHook(() => useVideoUpload(), {
      wrapper: createWrapper(),
    });

    const videoFile = {
      file: new File([''], 'test.mp4'),
      metadata: { filename: 'test.mp4', size: 100, mimeType: 'video/mp4' },
    };

    result.current.mutate({ video: videoFile });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockUpload).toHaveBeenCalledWith(videoFile, undefined);
    expect(result.current.data?.taskId).toBe('123');
  });

  it('forwards processing options to the service', async () => {
    mockUpload.mockResolvedValue({ taskId: '456', status: 'queued' });

    const { result } = renderHook(() => useVideoUpload(), {
      wrapper: createWrapper(),
    });

    const videoFile = {
      file: new File([''], 'test.mp4'),
      metadata: { filename: 'test.mp4', size: 100, mimeType: 'video/mp4' },
    };

    result.current.mutate({ video: videoFile, options: { highQuality: true } });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockUpload).toHaveBeenCalledWith(videoFile, { highQuality: true });
  });
});
