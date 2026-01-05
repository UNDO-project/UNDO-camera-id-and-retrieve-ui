import type { Image } from '@/primitives';

/**
 * Image storage service.
 *
 * BLACK BOX: Implementation can use memory, data URLs, or object URLs.
 */
export interface IImageStore {
  /**
   * Store an image and return a URL for display.
   */
  store(file: File): Promise<Image>;

  /**
   * Release resources for an image.
   */
  release(image: Image): void;
}
