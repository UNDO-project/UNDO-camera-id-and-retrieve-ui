import type { IIdentificationService } from '@/services/interfaces';
import type { Image, IdentificationParams, IdentificationResult, CameraMatch } from '@/primitives';
import { mockDetections } from './fixtures/detections';
import { mockCameras } from './fixtures/cameras';
import { transformLocalImagePath, transformLocalImagePaths } from '@/utils/imagePath';

export class MockIdentificationService implements IIdentificationService {
  async identify(image: Image, params: IdentificationParams): Promise<IdentificationResult> {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock matches for each detection
    const matches = new Map<string, CameraMatch[]>();

    mockDetections.forEach((detection) => {
      // Pick random cameras as matches
      const detectionMatches: CameraMatch[] = mockCameras
        .slice(0, params.topK)
        .map((camera, index) => {
          // Transform the nested camera record paths
          const transformedCamera = {
            ...camera,
            imageUrl: transformLocalImagePath(camera.imageUrl),
            images: transformLocalImagePaths(camera.images || []),
          };

          return {
            cameraId: camera.cameraId,
            similarity: 0.9 - index * 0.1, // 0.9, 0.8, 0.7...
            camera: transformedCamera,
            catalogImageUrl: transformLocalImagePath(camera.imageUrl),
          };
        })
        .filter((m) => m.similarity >= params.minSimilarity);

      matches.set(detection.id, detectionMatches);
    });

    return {
      success: true,
      detections: mockDetections,
      matches,
      processingTimeMs: 1250,
      timestamp: Date.now(),
    };
  }

  async isReady(): Promise<boolean> {
    return true;
  }
}
