/**
 * Platform-specific functionality adapter.
 *
 * Web: Uses DOM APIs (file input, blob download, Web Share API)
 * Mobile: Uses React Native APIs (ImagePicker, FileSystem, Share)
 */
export interface IPlatformAdapter {
  /**
   * Open device file picker.
   * Web: Creates <input type="file">, triggers click
   * Mobile: Uses ImagePicker.launchImageLibraryAsync()
   */
  pickImage(): Promise<File | null>;

  /**
   * Get platform file size limit.
   * Web: 10MB
   * Mobile: Device-dependent
   */
  getMaxFileSize(): number;

  /**
   * Save file to device.
   * Web: Creates blob URL, triggers download
   * Mobile: Saves to device storage
   */
  downloadFile(url: string, filename: string): Promise<void>;

  /**
   * Share content via native share.
   * Web: Web Share API (with fallback)
   * Mobile: React Native Share
   */
  share(data: { title: string; text: string; url?: string }): Promise<void>;
}
