export const ENDPOINTS = {
  HEALTH: '/api/v1/health',
  READINESS: '/api/v1/health/ready',
  IDENTIFY: '/api/v1/identify',
  CATALOG_STATS: '/api/v1/catalog/stats',
  CATALOG_RELOAD: '/api/v1/catalog/reload',
} as const;
