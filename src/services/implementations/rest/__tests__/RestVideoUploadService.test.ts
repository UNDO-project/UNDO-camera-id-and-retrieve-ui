import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RestVideoUploadService } from '../RestVideoUploadService';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';
import type { VideoFile } from '@/primitives';

describe('RestVideoUploadService', () => {
  let service: RestVideoUploadService;
  let mockApiClient: ApiClient;

  const mockVideo: VideoFile = {
    file: new File(['dummy content'], 'video.mp4', { type: 'video/mp4' }),
    metadata: {
      filename: 'video.mp4',
      size: 1024 * 1024,
      mimeType: 'video/mp4',
    },
  };

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };
    service = new RestVideoUploadService(mockApiClient, 'http://localhost');
  });

  describe('upload', () => {
    it('constructs correct FormData and calls API', async () => {
      const mockResponse = {
        task_id: 'task-123',
        status: 'queued',
        filename: 'video.mp4',
        file_size_mb: 1.0,
        created_at: new Date().toISOString(),
      };

      vi.mocked(mockApiClient.post).mockResolvedValue({ data: mockResponse } as any);

      const result = await service.upload(mockVideo, {
        targetFps: 10,
        identificationMode: 'full',
      });

      expect(mockApiClient.post).toHaveBeenCalledWith(
        ENDPOINTS.VIDEO_UPLOAD,
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // Verify FormData content
      const formData = vi.mocked(mockApiClient.post).mock.calls[0][1] as FormData;
      expect(formData.get('file')).toBeInstanceOf(File);

      const options = JSON.parse(formData.get('options') as string);
      expect(options).toEqual({
        target_fps: 10,
        identification_mode: 'full',
        output_format: 'mp4',
        high_quality: false,
      });

      expect(result.taskId).toBe('task-123');
      expect(result.status).toBe('queued');
    });

    it('sends high_quality when requested', async () => {
      vi.mocked(mockApiClient.post).mockResolvedValue({
        data: { task_id: 'task-hq', status: 'queued', filename: 'video.mp4', file_size_mb: 1 },
      } as any);

      await service.upload(mockVideo, { highQuality: true });

      const formData = vi.mocked(mockApiClient.post).mock.calls[0][1] as FormData;
      const options = JSON.parse(formData.get('options') as string);
      expect(options.high_quality).toBe(true);
    });
  });

  describe('getProgress', () => {
    it('maps response correctly from snake_case to camelCase', async () => {
      const mockResponse = {
        task_id: 'task-123',
        status: 'processing',
        progress_percent: 50,
        frames_processed: 100,
        frames_total: 200,
        current_fps: 30,
        elapsed_seconds: 10,
        output_url: null,
        error: null,
        filename: 'video.mp4',
        created_at: new Date().toISOString(),
        options: {
          target_fps: 15,
          identification_mode: 'detect_only',
          output_format: 'mp4',
          high_quality: true,
        },
      };

      vi.mocked(mockApiClient.get).mockResolvedValue({ data: mockResponse } as any);

      const result = await service.getProgress('task-123');

      expect(mockApiClient.get).toHaveBeenCalledWith(ENDPOINTS.VIDEO_STATUS('task-123'));
      expect(result.taskId).toBe('task-123');
      expect(result.progressPercent).toBe(50);
      expect(result.framesProcessed).toBe(100);
      expect(result.options?.targetFps).toBe(15);
      expect(result.options?.highQuality).toBe(true);
      expect(result.expiresAt).toBeNull();
    });

    it('maps expires_at to a Date once the task has finished', async () => {
      vi.mocked(mockApiClient.get).mockResolvedValue({
        data: {
          task_id: 'task-123',
          status: 'completed',
          output_url: '/api/v1/video-download/task-123',
          expires_at: '2026-11-03T12:15:00Z',
        },
      } as any);

      const result = await service.getProgress('task-123');

      expect(result.expiresAt).toEqual(new Date('2026-11-03T12:15:00Z'));
    });
  });

  describe('deleteTask', () => {
    it('calls the delete endpoint for the task', async () => {
      vi.mocked(mockApiClient.delete).mockResolvedValue({ data: {} } as any);

      await service.deleteTask('task-123');

      expect(mockApiClient.delete).toHaveBeenCalledWith(ENDPOINTS.VIDEO_DELETE('task-123'));
    });
  });

  describe('getDownloadUrl', () => {
    it('constructs full URL using base URL', () => {
      const url = service.getDownloadUrl('task-123');
      expect(url).toBe('http://localhost/api/v1/video-download/task-123');
    });
  });
});
