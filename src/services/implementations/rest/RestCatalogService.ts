import type { ICatalogService } from '@/services/interfaces';
import type { CameraRecord, CatalogFilters, CatalogStats } from '@/primitives';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';
import { transformLocalImagePath, transformLocalImagePaths } from '@/utils/imagePath';

export class RestCatalogService implements ICatalogService {
  constructor(private apiClient: ApiClient) {}

  async getStats(): Promise<CatalogStats> {
    const response = await this.apiClient.get(ENDPOINTS.CATALOG_STATS);
    const data = response.data;

    // Map API response to CatalogStats primitive
    return {
      totalCameras: data.total_cameras,
      vendors: [], // Not currently returned by stats API, would need separate call or update
      categories: [], // Not currently returned by stats API
      embeddingsLoaded: data.embeddings_loaded,
    };
  }

  async search(query: string, filters?: CatalogFilters): Promise<CameraRecord[]> {
    // Note: The current API doesn't have a direct search endpoint in openapi.json.
    // It seems we might need to implement client-side search or add an endpoint.
    // For now, returning empty array as placeholder or we could fetch all and filter.
    console.warn('Server-side search not implemented in API yet.');
    return [];
  }

  async getCamera(id: string): Promise<CameraRecord> {
    // Note: No direct "get camera by ID" endpoint in openapi.json either.
    // Assuming we might need to implement this later or use a different approach.
    throw new Error('Get camera by ID not implemented in API');
  }

  async getRelatedCameras(cameraId: string, type: 'series' | 'category'): Promise<CameraRecord[]> {
    // Placeholder
    return [];
  }

  private transformCamera(camera: CameraRecord): CameraRecord {
    return {
      ...camera,
      imageUrl: transformLocalImagePath(camera.imageUrl),
      images: transformLocalImagePaths(camera.images || []),
    };
  }
}
