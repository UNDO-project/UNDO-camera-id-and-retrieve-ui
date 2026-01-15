import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RestCatalogService } from '../RestCatalogService';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';

describe('RestCatalogService', () => {
  let service: RestCatalogService;
  let mockApiClient: ApiClient;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };
    service = new RestCatalogService(mockApiClient);
  });

  describe('getStats', () => {
    it('calls API and maps response correctly', async () => {
      const mockResponse = {
        total_cameras: 100,
        embeddings_loaded: true,
      };

      vi.mocked(mockApiClient.get).mockResolvedValue({ data: mockResponse } as any);

      const stats = await service.getStats();

      expect(mockApiClient.get).toHaveBeenCalledWith(ENDPOINTS.CATALOG_STATS);
      expect(stats.totalCameras).toBe(100);
      expect(stats.embeddingsLoaded).toBe(true);
    });
  });

  describe('search', () => {
    it('returns empty array (placeholder)', async () => {
      const results = await service.search('query');
      expect(results).toEqual([]);
    });
  });

  describe('getCamera', () => {
    it('throws error (not implemented)', async () => {
      await expect(service.getCamera('id')).rejects.toThrow(
        'Get camera by ID not implemented in API'
      );
    });
  });

  describe('getRelatedCameras', () => {
    it('returns empty array (placeholder)', async () => {
      const results = await service.getRelatedCameras('id', 'series');
      expect(results).toEqual([]);
    });
  });
});
