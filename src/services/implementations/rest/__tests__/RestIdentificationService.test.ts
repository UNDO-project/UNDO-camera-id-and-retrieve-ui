import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RestIdentificationService } from '../RestIdentificationService';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';
import type { Image, IdentificationParams } from '@/primitives';

describe('RestIdentificationService', () => {
  let service: RestIdentificationService;
  let mockApiClient: ApiClient;

  const mockImage: Image = {
    file: new File([''], 'test.jpg', { type: 'image/jpeg' }),
    preview: 'blob:test',
    metadata: { width: 100, height: 100, size: 1024, mimeType: 'image/jpeg' },
  };

  const mockParams: IdentificationParams = {
    topK: 5,
    minSimilarity: 0.3,
  };

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };
    service = new RestIdentificationService(mockApiClient);
  });

  describe('isReady', () => {
    it('returns true when API is ready', async () => {
      vi.mocked(mockApiClient.get).mockResolvedValue({ data: { ready: true } } as any);
      const ready = await service.isReady();
      expect(ready).toBe(true);
      expect(mockApiClient.get).toHaveBeenCalledWith(ENDPOINTS.READINESS);
    });

    it('returns false when API is not ready', async () => {
      vi.mocked(mockApiClient.get).mockResolvedValue({ data: { ready: false } } as any);
      const ready = await service.isReady();
      expect(ready).toBe(false);
    });

    it('returns false when API call fails', async () => {
      vi.mocked(mockApiClient.get).mockRejectedValue(new Error('Network error'));
      const ready = await service.isReady();
      expect(ready).toBe(false);
    });
  });

  describe('identify', () => {
    it('calls API and maps response correctly', async () => {
      const mockResponse = {
        success: true,
        detections_count: 1,
        processing_time_ms: 123,
        results: [
          {
            detection: {
              image_path: 'path/to/img',
              crop_path: 'path/to/crop',
              bbox: { x_min: 0, y_min: 0, x_max: 100, y_max: 100 },
              confidence: 0.95,
              label: 'camera',
            },
            matches: [
              {
                camera_id: 'cam1',
                score: 0.85,
                source: 'Axis',
                catalog_image_path: 'path/to/catalog',
                record: {
                  camera_id: 'cam1',
                  model_name: 'M3045',
                  display_name: 'Axis M3045',
                  source: 'Axis',
                  category: 'Dome',
                  product_category: 'Network Cameras',
                  product_series: 'M Series',
                },
              },
            ],
          },
        ],
      };

      vi.mocked(mockApiClient.post).mockResolvedValue({ data: mockResponse } as any);

      const result = await service.identify(mockImage, mockParams);

      expect(mockApiClient.post).toHaveBeenCalledWith(ENDPOINTS.IDENTIFY, expect.any(FormData), {
        params: {
          top_k: mockParams.topK,
          min_similarity: mockParams.minSimilarity,
        },
      });

      expect(result.success).toBe(true);
      expect(result.detections).toHaveLength(1);
      expect(result.detections[0].confidence).toBe(0.95);
      expect(result.matches.size).toBe(1);

      const firstDetectionId = result.detections[0].id;
      const matches = result.matches.get(firstDetectionId);
      expect(matches).toHaveLength(1);
      expect(matches?.[0].camera.modelName).toBe('M3045');
    });

    it('handles API errors', async () => {
      vi.mocked(mockApiClient.post).mockRejectedValue(new Error('API Error'));
      await expect(service.identify(mockImage, mockParams)).rejects.toThrow('API Error');
    });
  });
});
