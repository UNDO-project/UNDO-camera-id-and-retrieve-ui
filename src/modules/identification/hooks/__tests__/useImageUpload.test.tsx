import { renderHook, act, createWrapper } from '@/test/utils';
import { useImageUpload } from '../useImageUpload';
import { describe, it, expect, vi } from 'vitest';
import { createServices } from '@/services/factory';
import type { Image } from '@/primitives';

describe('useImageUpload', () => {
  it('handles image selection', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });
    const mockStoredImage: Image = {
      file: new File([''], 'test.jpg'),
      preview: 'blob:test',
      metadata: { width: 100, height: 100, size: 100, mimeType: 'image/jpeg' },
    };

    vi.spyOn(services.imageStore, 'store').mockResolvedValue(mockStoredImage);

    const { result } = renderHook(() => useImageUpload(), {
      wrapper: createWrapper(services),
    });

    const file = new File([''], 'test.jpg');

    await act(async () => {
      await result.current.handleImageSelected(file);
    });

    expect(result.current.image).toEqual(mockStoredImage);
    expect(services.imageStore.store).toHaveBeenCalledWith(file);
  });

  it('handles clear image', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });
    const mockImage: Image = {
      file: new File([''], 'test.jpg'),
      preview: 'blob:test',
      metadata: { width: 100, height: 100, size: 100, mimeType: 'image/jpeg' },
    };

    vi.spyOn(services.imageStore, 'store').mockResolvedValue(mockImage);
    vi.spyOn(services.imageStore, 'release').mockImplementation(() => {});

    const { result } = renderHook(() => useImageUpload(), {
      wrapper: createWrapper(services),
    });

    await act(async () => {
      await result.current.handleImageSelected(new File([''], 'test.jpg'));
    });

    expect(result.current.image).not.toBeNull();

    act(() => {
      result.current.clearImage();
    });

    expect(result.current.image).toBeNull();
    expect(services.imageStore.release).toHaveBeenCalledWith(mockImage);
  });
});
