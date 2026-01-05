import type { Detection } from '@/primitives';

export const mockDetections: Detection[] = [
  {
    id: 'det_001',
    bbox: {
      x_min: 100,
      y_min: 200,
      x_max: 300,
      y_max: 400,
    },
    confidence: 0.95,
    label: 'camera',
    cropUrl: 'https://via.placeholder.com/200x200?text=Crop+1',
  },
  {
    id: 'det_002',
    bbox: {
      x_min: 500,
      y_min: 150,
      x_max: 650,
      y_max: 300,
    },
    confidence: 0.88,
    label: 'camera',
    cropUrl: 'https://via.placeholder.com/150x150?text=Crop+2',
  },
];
