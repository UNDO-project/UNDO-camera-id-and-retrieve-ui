/**
 * Complete camera information from catalog.
 */
export interface CameraRecord {
  cameraId: string;
  modelName: string;
  displayName: string;
  description?: string;

  // Categorization
  vendor: string;
  category: string;
  productCategory: string;
  productSeries: string;

  // Media
  imageUrl?: string;
  images: string[];
  datasheetUrl?: string;

  // Specifications
  specifications: Record<string, any>;
  specificationsHtml: Record<string, Record<string, any>>;
}
