/**
 * Flattened camera specifications.
 */
export interface CameraSpecs {
  maxResolution?: string;
  lens?: string;
  horizontalFov?: string;
}

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
  imageFiles?: string[];
  datasheetUrl?: string;

  // Specifications
  specs?: CameraSpecs;
  specifications: Record<string, any>;
  specificationsHtml: Record<string, Record<string, any>>;
}
