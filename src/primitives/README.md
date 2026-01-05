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
