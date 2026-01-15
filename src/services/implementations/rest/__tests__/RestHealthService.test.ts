import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RestHealthService } from '../RestHealthService';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';

describe('RestHealthService', () => {
  let service: RestHealthService;
  let mockApiClient: ApiClient;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };
    service = new RestHealthService(mockApiClient);
  });

  describe('checkHealth', () => {
    it('calls API and returns data', async () => {
      const mockResponse = { status: 'healthy', version: '1.0.0' };
      vi.mocked(mockApiClient.get).mockResolvedValue({ data: mockResponse } as any);

      const result = await service.checkHealth();

      expect(mockApiClient.get).toHaveBeenCalledWith(ENDPOINTS.HEALTH);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('checkReadiness', () => {
    it('calls API and maps response', async () => {
      const mockResponse = {
        ready: true,
        catalog_loaded: true,
        embeddings_ready: true,
        detector_ready: true,
      };
      vi.mocked(mockApiClient.get).mockResolvedValue({ data: mockResponse } as any);

      const result = await service.checkReadiness();

      expect(mockApiClient.get).toHaveBeenCalledWith(ENDPOINTS.READINESS);
      expect(result).toEqual({
        ready: true,
        catalogLoaded: true,
        embeddingsReady: true,
        detectorReady: true,
      });
    });
  });
});
