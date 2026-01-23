import type { ICatalogService, PaginatedCameras } from '@/services/interfaces';
import type { CameraRecord, CatalogFilters, CatalogStats } from '@/primitives';
import { mockCameras } from './fixtures/cameras';
import { transformLocalImagePath, transformLocalImagePaths } from '@/utils/imagePath';

export class MockCatalogService implements ICatalogService {
  async getStats(): Promise<CatalogStats> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      totalCameras: 1250,
      vendors: [
        { value: 'Axis', count: 450 },
        { value: 'Hikvision', count: 320 },
        { value: 'Hanwha', count: 200 },
      ],
      categories: [
        { value: 'Dome', count: 600 },
        { value: 'Bullet', count: 400 },
        { value: 'PTZ', count: 250 },
      ],
      series: [],
      embeddingsLoaded: true,
    };
  }

  async search(query: string, filters?: CatalogFilters): Promise<PaginatedCameras> {
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

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;

    const cameras = results.slice(start, end).map((c) => this.transformCamera(c));

    return {
      cameras,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getCamera(id: string): Promise<CameraRecord> {
    const camera = mockCameras.find((c) => c.cameraId === id);
    if (!camera) throw new Error('Camera not found');
    return this.transformCamera(camera);
  }

  async getRelatedCameras(cameraId: string, type: 'series' | 'category'): Promise<CameraRecord[]> {
    // Return other cameras as "related"
    const results = mockCameras.filter((c) => c.cameraId !== cameraId).slice(0, 5);
    return results.map((c) => this.transformCamera(c));
  }

  private transformCamera(camera: CameraRecord): CameraRecord {
    return {
      ...camera,
      imageUrl: transformLocalImagePath(camera.imageUrl),
      images: transformLocalImagePaths(camera.images || []),
    };
  }
}
