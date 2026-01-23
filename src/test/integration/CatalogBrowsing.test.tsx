import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { CatalogBrowser } from '@/modules/catalog';
import { describe, it, expect, vi } from 'vitest';
import { createServices } from '@/services/factory';
import { CameraRecord } from '@/primitives';

describe('Catalog Browsing Integration', () => {
  it('searches and filters cameras', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });

    const mockCameras: CameraRecord[] = [
      {
        cameraId: 'cam1',
        modelName: 'Axis M3045',
        displayName: 'Axis M3045',
        vendor: 'Axis',
        category: 'Dome',
        productCategory: 'Network Camera',
        productSeries: 'M Series',
        description: 'A test camera',
        images: [],
        specifications: {},
        specificationsHtml: {},
      },
    ];

    vi.spyOn(services.catalog, 'search').mockResolvedValue({
      cameras: mockCameras,
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    });

    vi.spyOn(services.catalog, 'getStats').mockResolvedValue({
      totalCameras: 1,
      vendors: [{ value: 'Axis', count: 1 }],
      categories: [{ value: 'Dome', count: 1 }],
      series: [],
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

    // 6. Verify pagination exists (even if disabled/hidden for single page, we check logic)
    // The pagination component renders "Rows per page" text
    expect(screen.getByText('Rows per page')).toBeInTheDocument();
  });
});
