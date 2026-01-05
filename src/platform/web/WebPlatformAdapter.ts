import type { IPlatformAdapter } from '@/platform/interfaces';

export class WebPlatformAdapter implements IPlatformAdapter {
  async pickImage(): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        resolve(file || null);
      };
      input.click();
    });
  }

  getMaxFileSize(): number {
    return 10 * 1024 * 1024; // 10MB
  }

  async downloadFile(url: string, filename: string): Promise<void> {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(objectUrl);
  }

  async share(data: { title: string; text: string; url?: string }): Promise<void> {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(data.url || data.text);
    }
  }
}
