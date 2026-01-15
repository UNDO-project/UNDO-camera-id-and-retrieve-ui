import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { CatalogBrowser } from '@/modules/catalog';
import { describe, it, expect, vi } from 'vitest';
import { createServices } from '@/services/factory';

describe('Catalog Browsing Integration', () => {
  it('searches and filters cameras', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });

    const mockCameras = [
      {
        cameraId: 'cam1',
        modelName: 'Axis M3045',
        displayName: 'Axis M3045',
        vendor: 'Axis',
        category: 'Dome',
        productSeries: 'M Series',
        description: 'A test camera',
        images: [],
      },
    ];

    vi.spyOn(services.catalog, 'search').mockResolvedValue(mockCameras);
    vi.spyOn(services.catalog, 'getStats').mockResolvedValue({
      totalCameras: 1,
      vendors: [{ name: 'Axis', count: 1 }],
      categories: [{ name: 'Dome', count: 1 }],
      embeddingsLoaded: true,
    });

    render(<CatalogBrowser />, { services });

    // 1. Verify initial load
    expect(screen.getByText('Camera Catalog')).toBeInTheDocument();

    // 2. Wait for cameras to load
    await waitFor(() => expect(screen.getAllByText('Axis M3045').length).toBeGreaterThan(0));

    // 3. Perform a search
    const searchInput = screen.getByPlaceholderText(/search cameras/i);
    fireEvent.change(searchInput, { target: { value: 'Axis' } });

    // 4. Verify search was called
    await waitFor(() =>
      expect(services.catalog.search).toHaveBeenCalledWith('Axis', expect.any(Object))
    );

    // 5. Verify results still shown
    expect(screen.getAllByText('Axis M3045').length).toBeGreaterThan(0);
  });
});
