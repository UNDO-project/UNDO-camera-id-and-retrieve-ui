/**
 * Single facet item with count.
 */
export interface FacetItem {
  value: string;
  count: number;
}

/**
 * Statistics about the camera catalog.
 */
export interface CatalogStats {
  totalCameras: number;
  vendors: FacetItem[];
  categories: FacetItem[];
  series: FacetItem[];
  embeddingsLoaded: boolean;
}
