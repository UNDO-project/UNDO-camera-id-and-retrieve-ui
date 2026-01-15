import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { IdentificationFeature } from '@/modules/identification';
import { describe, it, expect, vi } from 'vitest';
import { createServices } from '@/services/factory';

describe('Identification Flow Integration', () => {
  it('completes the full identification workflow', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });

    // 1. Mock the services to return specific data
    const mockImage = {
      file: new File([''], 'camera.jpg', { type: 'image/jpeg' }),
      preview: 'blob:camera',
      metadata: { width: 800, height: 600, size: 1024, mimeType: 'image/jpeg' },
    };

    const mockResult = {
      success: true,
      detections: [
        {
          id: 'det1',
          bbox: { x_min: 10, y_min: 10, x_max: 50, y_max: 50 },
          confidence: 0.9,
          label: 'camera',
        },
      ],
      matches: new Map([
        [
          'det1',
          [
            {
              cameraId: 'cam1',
              similarity: 0.95,
              camera: {
                cameraId: 'cam1',
                modelName: 'Axis M3045',
                displayName: 'Axis M3045',
                vendor: 'Axis',
                category: 'Dome',
                productCategory: 'Network Cameras',
                productSeries: 'M Series',
                images: [],
              },
            },
          ],
        ],
      ]),
      processingTimeMs: 500,
      timestamp: Date.now(),
    };

    vi.spyOn(services.imageStore, 'store').mockResolvedValue(mockImage);
    vi.spyOn(services.identification, 'identify').mockResolvedValue(mockResult);

    render(<IdentificationFeature />, { services });

    // 2. Initial state: Upload zone visible
    expect(screen.getByText(/drag and drop an image here/i)).toBeInTheDocument();

    // 3. Simulate image upload
    const file = new File([''], 'camera.jpg', { type: 'image/jpeg' });
    const dropzone = screen.getByText(/drag and drop an image here/i).closest('div');

    // We need to trigger the drop event.
    // Since we use a headless hook useDropzone, it might be easier to trigger the hidden input if it exists,
    // or simulate the drop event on the dropzone element.

    // Let's look for a hidden file input if there is one
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    } else {
      // Fallback to drop event
      fireEvent.drop(dropzone!, {
        dataTransfer: {
          files: [file],
        },
      });
    }

    // 4. Verify image preview is shown
    await waitFor(() => expect(screen.getByText('camera.jpg')).toBeInTheDocument());
    expect(screen.getByText('Identify Cameras')).toBeInTheDocument();

    // 5. Click Identify button
    fireEvent.click(screen.getByText('Identify Cameras'));

    // 6. Verify processing state (loader)
    // IdentificationFeature shows ResultsDisplaySkeleton when pending
    // which contains skeletons.

    // 7. Verify results are displayed
    await waitFor(() => expect(screen.getAllByText(/Axis M3045/i).length).toBeGreaterThan(0), {
      timeout: 2000,
    });
    expect(screen.getAllByText(/95%/).length).toBeGreaterThan(0); // Similarity Badge
  });
});
