/**
 * Uploadable image with metadata.
 */
export interface Image {
  file: File;
  preview: string; // Data URL for display
  metadata: {
    width: number;
    height: number;
    size: number; // bytes
    mimeType: string;
  };
}
