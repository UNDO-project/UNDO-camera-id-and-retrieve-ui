import type { CameraRecord, CatalogFilters, CatalogStats, FacetItem } from '@/primitives';

export interface PaginatedCameras {
  cameras: CameraRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  facets?: {
    vendors: FacetItem[];
    categories: FacetItem[];
    series: FacetItem[];
  };
}

/**
 * Camera catalog service.
 *
 * BLACK BOX: Consumers don't know if this uses:
 * - REST API, local database, or static JSON
 * - Client-side search or server-side filtering
 */
export interface ICatalogService {
  /**
   * Get catalog statistics.
   */
  getStats(): Promise<CatalogStats>;

  /**
   * Search cameras by text query.
   *
   * @param query - Search query
   * @param filters - Optional filters
   * @returns Matching cameras with pagination info
   */
  search(query: string, filters?: CatalogFilters): Promise<PaginatedCameras>;

  /**
   * Get a single camera by ID.
   */
  getCamera(id: string): Promise<CameraRecord>;

  /**
   * Get cameras in a specific category/series.
   */
  getRelatedCameras(cameraId: string, type: 'series' | 'category'): Promise<CameraRecord[]>;
}
