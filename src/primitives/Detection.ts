import { BoundingBox } from './BoundingBox';

/**
 * Single camera detection in an image.
 */
export interface Detection {
  id: string;
  bbox: BoundingBox;
  confidence: number; // 0.0-1.0
  label: string; // "camera"
  cropUrl?: string;
}
