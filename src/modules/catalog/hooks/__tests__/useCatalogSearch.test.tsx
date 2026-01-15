import { renderHook, waitFor, createWrapper } from '@/test/utils';
import { useCatalogSearch } from '../useCatalogSearch';
import { describe, it, expect, vi } from 'vitest';
import { createServices } from '@/services/factory';

describe('useCatalogSearch', () => {
  it('searches catalog successfully', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });
    const mockResults = [{ cameraId: '1', modelName: 'Test' } as any];

    vi.spyOn(services.catalog, 'search').mockResolvedValue(mockResults);

    const { result } = renderHook(() => useCatalogSearch('test'), {
      wrapper: createWrapper(services),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResults);
    expect(services.catalog.search).toHaveBeenCalledWith('test', undefined);
  });
});
