import type { IHealthService, HealthStatus, ReadinessStatus } from '@/services/interfaces';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';

export class RestHealthService implements IHealthService {
  constructor(private apiClient: ApiClient) {}

  async checkHealth(): Promise<HealthStatus> {
    const response = await this.apiClient.get(ENDPOINTS.HEALTH);
    return response.data;
  }

  async checkReadiness(): Promise<ReadinessStatus> {
    const response = await this.apiClient.get(ENDPOINTS.READINESS);
    const data = response.data;

    return {
      ready: data.ready,
      catalogLoaded: data.catalog_loaded,
      embeddingsReady: data.embeddings_ready,
      detectorReady: data.detector_ready,
    };
  }
}
