import type { IHealthService, HealthStatus, ReadinessStatus } from '@/services/interfaces';

export class MockHealthService implements IHealthService {
  async checkHealth(): Promise<HealthStatus> {
    return {
      status: 'healthy',
      version: '0.0.0-mock',
    };
  }

  async checkReadiness(): Promise<ReadinessStatus> {
    return {
      ready: true,
      catalogLoaded: true,
      embeddingsReady: true,
      detectorReady: true,
    };
  }
}
