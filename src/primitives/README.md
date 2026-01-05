# Core Data Primitives

This directory contains the core data types that flow through the entire system.
Everything else is built on top of these.

- `Image.ts`: Uploadable image with metadata.
- `BoundingBox.ts`: Axis-aligned bounding box coordinates.
- `Detection.ts`: Single camera detection in an image.
- `CameraRecord.ts`: Complete camera information from catalog.
- `CameraMatch.ts`: Catalog camera matched to a detection.
- `IdentificationResult.ts`: Complete identification result.
- `IdentificationParams.ts`: Parameters for identification request.
- `CatalogFilters.ts`: Filter criteria for catalog browsing.
- `CatalogStats.ts`: Statistics about the camera catalog.
- `ProcessingState.ts`: State of an async operation.

## Usage Examples

### Using IdentificationResult

```typescript
import { IdentificationResult } from './IdentificationResult';

function displayResults(result: IdentificationResult) {
  if (!result.success) return;

  result.detections.forEach((detection) => {
    console.log(`Detected camera at ${detection.bbox.x_min},${detection.bbox.y_min}`);

    const matches = result.matches.get(detection.id);
    if (matches && matches.length > 0) {
      console.log(`Best match: ${matches[0].camera.modelName} (${matches[0].similarity})`);
    }
  });
}
```
