/**
 * Statistics about the camera catalog.
 */
export interface CatalogStats {
  totalCameras: number;
  vendors: Array<{ name: string; count: number }>;
  categories: Array<{ name: string; count: number }>;
  embeddingsLoaded: boolean;
}
