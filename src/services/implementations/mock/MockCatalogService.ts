import type { ICatalogService } from '@/services/interfaces';
import type { CameraRecord, CatalogFilters, CatalogStats } from '@/primitives';
import { mockCameras } from './fixtures/cameras';

export class MockCatalogService implements ICatalogService {
  async getStats(): Promise<CatalogStats> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      totalCameras: 1250,
      vendors: [
        { name: 'Axis', count: 450 },
        { name: 'Hikvision', count: 320 },
        { name: 'Hanwha', count: 200 },
      ],
      categories: [
        { name: 'Dome', count: 600 },
        { name: 'Bullet', count: 400 },
        { name: 'PTZ', count: 250 },
      ],
      embeddingsLoaded: true,
    };
  }

  async search(query: string, filters?: CatalogFilters): Promise<CameraRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple filter implementation
    let results = [...mockCameras];

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (c) => c.modelName.toLowerCase().includes(q) || c.displayName.toLowerCase().includes(q)
      );
    }

    if (filters?.vendors?.length) {
      results = results.filter((c) => filters.vendors.includes(c.vendor));
    }

    return results;
  }

  async getCamera(id: string): Promise<CameraRecord> {
    const camera = mockCameras.find((c) => c.cameraId === id);
    if (!camera) throw new Error('Camera not found');
    return camera;
  }

  async getRelatedCameras(cameraId: string, type: 'series' | 'category'): Promise<CameraRecord[]> {
    // Return other cameras as "related"
    return mockCameras.filter((c) => c.cameraId !== cameraId).slice(0, 5);
  }
}
