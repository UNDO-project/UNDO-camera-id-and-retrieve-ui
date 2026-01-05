export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  version: string;
}

export interface ReadinessStatus {
  ready: boolean;
  catalogLoaded: boolean;
  embeddingsReady: boolean;
  detectorReady: boolean;
}

/**
 * System health monitoring service.
 */
export interface IHealthService {
  /**
   * Check if the backend is healthy.
   */
  checkHealth(): Promise<HealthStatus>;

  /**
   * Check if the backend is ready to process requests.
   */
  checkReadiness(): Promise<ReadinessStatus>;
}
