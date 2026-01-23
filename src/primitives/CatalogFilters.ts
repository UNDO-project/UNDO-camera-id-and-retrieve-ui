/**
 * Filter criteria for catalog browsing.
 */
export interface CatalogFilters {
  searchQuery: string;
  vendors: string[];
  categories: string[];
  series: string[];
  page?: number;
  limit?: number;
}
