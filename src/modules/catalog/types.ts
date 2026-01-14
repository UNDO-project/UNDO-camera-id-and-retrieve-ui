import type { CatalogFilters, CameraRecord } from '@/primitives';

export interface CatalogBrowserProps {
  /**
   * Initial filters to apply when mounting the browser.
   */
  initialFilters?: CatalogFilters;

  /**
   * Callback when a camera is selected from the grid/list.
   */
  onCameraSelect?: (camera: CameraRecord) => void;
}

export interface CameraDetailProps {
  /**
   * The ID of the camera to display.
   */
  cameraId: string;

  /**
   * Callback to return to the catalog browser.
   */
  onBack?: () => void;
}
