import { Detection } from './Detection';
import { CameraMatch } from './CameraMatch';

/**
 * Complete identification result.
 */
export interface IdentificationResult {
  success: boolean;
  detections: Detection[];
  matches: Map<string, CameraMatch[]>; // detection.id -> matches
  processingTimeMs: number;
  timestamp: number;
}
