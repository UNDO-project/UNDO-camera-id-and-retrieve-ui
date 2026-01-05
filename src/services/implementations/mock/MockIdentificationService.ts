import type { IIdentificationService } from '@/services/interfaces';
import type { Image, IdentificationParams, IdentificationResult, CameraMatch } from '@/primitives';
import { mockDetections } from './fixtures/detections';
import { mockCameras } from './fixtures/cameras';

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
        .map((camera, index) => ({
          cameraId: camera.cameraId,
          similarity: 0.9 - index * 0.1, // 0.9, 0.8, 0.7...
          camera: camera,
          catalogImageUrl: camera.imageUrl,
        }))
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
