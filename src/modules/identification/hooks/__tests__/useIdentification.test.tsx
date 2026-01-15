import { renderHook, waitFor, createWrapper } from '@/test/utils';
import { useIdentification } from '../useIdentification';
import { describe, it, expect, vi } from 'vitest';
import type { Services } from '@/services/factory';
import { createServices } from '@/services/factory';
import type { Image, IdentificationParams } from '@/primitives';

describe('useIdentification', () => {
  it('identifies cameras successfully', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });
    const mockResult = {
      success: true,
      detections: [],
      matches: new Map(),
      processingTimeMs: 100,
      timestamp: Date.now(),
    };

    vi.spyOn(services.identification, 'identify').mockResolvedValue(mockResult);

    const { result } = renderHook(() => useIdentification(), {
      wrapper: createWrapper(services),
    });

    const mockImage: Image = {
      file: new File([''], 'test.jpg'),
      preview: 'test',
      metadata: { width: 100, height: 100, size: 100, mimeType: 'image/jpeg' },
    };
    const mockParams: IdentificationParams = { topK: 5, minSimilarity: 0.3 };

    result.current.mutate({ image: mockImage, params: mockParams });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResult);
    expect(services.identification.identify).toHaveBeenCalledWith(mockImage, mockParams);
  });
});
