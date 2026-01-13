import type { IdentificationResult } from '@/primitives';

export interface IdentificationFeatureProps {
  /**
   * Called when an identification workflow completes successfully.
   */
  onComplete?: (result: IdentificationResult) => void;

  /**
   * Optional initial image if navigating from another feature.
   */
  className?: string;
}
