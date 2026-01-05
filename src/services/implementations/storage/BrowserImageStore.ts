import type { IImageStore } from '@/services/interfaces';
import type { Image } from '@/primitives';

export class BrowserImageStore implements IImageStore {
  async store(file: File): Promise<Image> {
    const preview = URL.createObjectURL(file);

    // Extract metadata
    const img = new window.Image();
    img.src = preview;
    await new Promise((resolve) => (img.onload = resolve));

    return {
      file,
      preview,
      metadata: {
        width: img.width,
        height: img.height,
        size: file.size,
        mimeType: file.type,
      },
    };
  }

  release(image: Image): void {
    URL.revokeObjectURL(image.preview);
  }
}
