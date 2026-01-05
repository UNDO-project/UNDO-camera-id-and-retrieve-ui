import { CameraRecord } from './CameraRecord';

/**
 * Catalog camera matched to a detection.
 */
export interface CameraMatch {
  cameraId: string;
  similarity: number; // 0.0-1.0
  camera: CameraRecord;
  catalogImageUrl?: string;
}
