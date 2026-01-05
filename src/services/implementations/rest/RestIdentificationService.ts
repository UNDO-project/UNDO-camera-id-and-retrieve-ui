import type { IIdentificationService } from '@/services/interfaces';
import type {
  Image,
  IdentificationParams,
  IdentificationResult,
  CameraMatch,
  Detection,
  CameraRecord,
} from '@/primitives';
import type { ApiClient } from '@/api';
import { ENDPOINTS } from '@/api/endpoints';
import { z } from 'zod';

export class RestIdentificationService implements IIdentificationService {
  constructor(private apiClient: ApiClient) {}

  async identify(image: Image, params: IdentificationParams): Promise<IdentificationResult> {
    const formData = new FormData();
    formData.append('image', image.file);

    const response = await this.apiClient.post(ENDPOINTS.IDENTIFY, formData, {
      params: {
        top_k: params.topK,
        min_similarity: params.minSimilarity,
      },
    });

    return this.mapResponse(response.data);
  }

  async isReady(): Promise<boolean> {
    try {
      const response = await this.apiClient.get(ENDPOINTS.READINESS);
      return response.data.ready === true;
    } catch {
      return false;
    }
  }

  private mapResponse(data: any): IdentificationResult {
    // 1. Validate response structure using Zod
    const parsedData = IdentifyResponseSchema.parse(data);

    // 2. Map to internal primitives
    const detections: Detection[] = [];
    const matches = new Map<string, CameraMatch[]>();

    parsedData.results.forEach((result) => {
      // Create Detection primitive
      const detection: Detection = {
        id: crypto.randomUUID(), // API doesn't return ID, generate one
        bbox: {
          x_min: result.detection.bbox.x_min,
          y_min: result.detection.bbox.y_min,
          x_max: result.detection.bbox.x_max,
          y_max: result.detection.bbox.y_max,
        },
        confidence: result.detection.confidence,
        label: result.detection.label,
        cropUrl: result.detection.crop_path || undefined, // API path needs full URL? Assuming handled elsewhere or relative
      };

      detections.push(detection);

      // Map Matches for this detection
      const cameraMatches: CameraMatch[] = (result.matches || []).map((match) => {
        // Fallback for missing record (though schema says nullable, app logic needs it)
        // In a real scenario, we might fetch missing records or skip.
        // For now, we construct a partial record if null, or assume it exists.
        // Given schema: record is nullable.

        if (!match.record) {
          throw new Error(`Match for camera ${match.camera_id} is missing record data.`);
        }

        const record: CameraRecord = {
          cameraId: match.record.camera_id,
          modelName: match.record.model_name,
          displayName: match.record.display_name,
          description: match.record.description || undefined,
          vendor: match.record.source,
          category: match.record.category,
          productCategory: match.record.product_category,
          productSeries: match.record.product_series,
          imageUrl: match.record.image_url || undefined,
          images: match.record.images || [],
          datasheetUrl: match.record.datasheet_url || undefined,
          specifications: match.record.specifications || {},
          specificationsHtml: match.record.specifications_html || {},
        };

        return {
          cameraId: match.camera_id,
          similarity: match.score,
          camera: record,
          catalogImageUrl: match.catalog_image_path || undefined,
        };
      });

      matches.set(detection.id, cameraMatches);
    });

    return {
      success: parsedData.success,
      detections,
      matches,
      processingTimeMs: parsedData.processing_time_ms,
      timestamp: Date.now(),
    };
  }
}

// --- Zod Schemas based on openapi.json ---

const BoundingBoxSchema = z.object({
  x_min: z.number(),
  y_min: z.number(),
  x_max: z.number(),
  y_max: z.number(),
});

const CameraDetectionSchema = z.object({
  image_path: z.string(),
  crop_path: z.string().nullable().optional(),
  bbox: BoundingBoxSchema,
  confidence: z.number(),
  label: z.string().default('camera'),
  class_id: z.number().nullable().optional(),
});

const CameraRecordSchema = z.object({
  camera_id: z.string(),
  model_name: z.string(),
  display_name: z.string(),
  description: z.string().nullable().optional(),
  specifications: z.record(z.any()).default({}),
  image_url: z.string().nullable().optional(),
  image_data: z.string().nullable().optional(), // binary
  images: z.array(z.string()).default([]),
  image_files: z.array(z.string()).default([]),
  datasheet_url: z.string().nullable().optional(),
  datasheet_pdf: z.string().nullable().optional(), // binary
  datasheet_file: z.string().nullable().optional(),
  specifications_html: z.record(z.record(z.any())).default({}),
  source: z.string(),
  category: z.string(),
  product_category: z.string(),
  product_series: z.string(),
});

const CameraMatchSchema = z.object({
  camera_id: z.string(),
  score: z.number(),
  catalog_image_path: z.string().nullable().optional(),
  source: z.string(),
  record: CameraRecordSchema.nullable().optional(),
});

const RetrievalResultSchema = z.object({
  detection: CameraDetectionSchema,
  matches: z.array(CameraMatchSchema).default([]),
});

const IdentifyResponseSchema = z.object({
  success: z.boolean(),
  detections_count: z.number(),
  results: z.array(RetrievalResultSchema),
  processing_time_ms: z.number(),
});
