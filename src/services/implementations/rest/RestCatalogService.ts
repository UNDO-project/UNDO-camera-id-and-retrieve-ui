import type { ICatalogService, PaginatedCameras } from '@/services/interfaces';
import type { CameraRecord, CatalogFilters, CatalogStats } from '@/primitives';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';

export class RestCatalogService implements ICatalogService {
  constructor(private apiClient: ApiClient) {}

  async getStats(): Promise<CatalogStats> {
    const [statsResponse, facetsResponse] = await Promise.all([
      this.apiClient.get(ENDPOINTS.CATALOG_STATS),
      this.apiClient.get(ENDPOINTS.CATALOG_FACETS),
    ]);

    const statsData = statsResponse.data;
    const facetsData = facetsResponse.data;

    return {
      totalCameras: statsData.total_cameras,
      vendors: facetsData.vendors,
      categories: facetsData.categories,
      series: facetsData.series,
      embeddingsLoaded: statsData.embeddings_loaded,
    };
  }

  async search(query: string, filters?: CatalogFilters): Promise<PaginatedCameras> {
    const params = new URLSearchParams();

    params.append('page', String(filters?.page || 1));
    params.append('limit', String(filters?.limit || 20));

    if (filters?.vendors?.[0]) params.append('vendor', filters.vendors[0]);
    if (filters?.categories?.[0]) params.append('category', filters.categories[0]);
    if (filters?.series?.[0]) params.append('series', filters.series[0]);

    // Prefer filters.searchQuery if available, otherwise use query arg
    const searchQuery = filters?.searchQuery || query;
    if (searchQuery) params.append('search', searchQuery);

    const response = await this.apiClient.get(`${ENDPOINTS.CATALOG_CAMERAS}?${params.toString()}`);
    const data = response.data;

    const cameras = data.data.map((item: any) => this.mapCameraSummary(item));

    return {
      cameras,
      pagination: {
        page: data.pagination.page,
        limit: data.pagination.limit,
        total: data.pagination.total,
        totalPages: data.pagination.total_pages,
      },
      facets: data.facets,
    };
  }

  async getCamera(id: string): Promise<CameraRecord> {
    const response = await this.apiClient.get(ENDPOINTS.CATALOG_CAMERA_ID(id));
    return this.mapCameraDetail(response.data);
  }

  async getRelatedCameras(cameraId: string, type: 'series' | 'category'): Promise<CameraRecord[]> {
    // Placeholder
    return [];
  }

  private mapCameraSummary(item: any): CameraRecord {
    return {
      cameraId: item.camera_id,
      modelName: item.model_name,
      displayName: item.display_name,
      description: undefined,
      vendor: item.source,
      category: item.category,
      productSeries: item.product_series,
      productCategory: item.category, // Fallback
      imageUrl: item.thumbnail_url,
      images: [],
      specs: item.specs
        ? {
            maxResolution: item.specs.max_resolution,
            lens: item.specs.lens,
            horizontalFov: item.specs.horizontal_fov,
          }
        : undefined,
      specifications: item.specs || {},
      specificationsHtml: {},
    };
  }

  private mapCameraDetail(item: any): CameraRecord {
    return {
      cameraId: item.camera_id,
      modelName: item.model_name,
      displayName: item.display_name,
      description: item.description || undefined,
      vendor: item.source,
      category: item.category,
      productSeries: item.product_series,
      productCategory: item.category, // Fallback
      imageUrl: item.image_files?.[0] || item.image_urls?.[0],
      images: (item.image_urls || []).concat(item.image_files || []),
      imageFiles: item.image_files || [],
      datasheetUrl: item.datasheet_url || undefined,
      specs: item.specs
        ? {
            maxResolution: item.specs.max_resolution,
            lens: item.specs.lens,
            horizontalFov: item.specs.horizontal_fov,
          }
        : undefined,
      specifications: item.specs || {},
      specificationsHtml: {},
    };
  }
}
