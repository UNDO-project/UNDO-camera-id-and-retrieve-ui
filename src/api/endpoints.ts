export const ENDPOINTS = {
  HEALTH: '/api/v1/health',
  READINESS: '/api/v1/health/ready',
  IDENTIFY: '/api/v1/identify',
  CATALOG_STATS: '/api/v1/catalog/stats',
  CATALOG_RELOAD: '/api/v1/catalog/reload',
  CATALOG_CAMERAS: '/api/v1/catalog/cameras',
  CATALOG_FACETS: '/api/v1/catalog/facets',
  CATALOG_CAMERA_ID: (id: string) => `/api/v1/catalog/cameras/${id}`,
} as const;
