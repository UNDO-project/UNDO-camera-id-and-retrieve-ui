import type { Image, IdentificationParams, IdentificationResult } from '@/primitives';

/**
 * Camera identification service.
 *
 * BLACK BOX: Consumers don't know if this uses:
 * - YOLOv8, Faster R-CNN, or DETR
 * - REST API, GraphQL, or local processing
 * - CLIP, DINO, or other embedding models
 */
export interface IIdentificationService {
  /**
   * Identify cameras in an image.
   *
   * @param image - The image to analyze
   * @param params - Detection/matching parameters
   * @returns Promise resolving to identification results
   * @throws ServiceError if processing fails
   */
  identify(image: Image, params: IdentificationParams): Promise<IdentificationResult>;

  /**
   * Check if the service is ready to process requests.
   */
  isReady(): Promise<boolean>;
}
