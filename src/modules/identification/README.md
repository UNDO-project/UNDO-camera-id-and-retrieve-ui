# Identification Module

Handle camera detection and matching workflow.

## Public Interface

- `IdentificationFeature`: Main orchestrator component.
  - Props: `IdentificationFeatureProps`
  - Events: `onComplete(result: IdentificationResult)`

## Internal Components (Private)

- `ImageUploadZone`: Area for dragging/selecting images.
- `SettingsPanel`: Configuration for detection (topK, similarity).
- `ResultsDisplay`: Visual display of detections and matches.
- `DetectionCard`: Individual detection summary.
- `MatchList`: List of matched cameras.
- `BoundingBoxOverlay`: Visual overlay on the uploaded image.

## Hooks (Private)

- `useIdentification`: Wraps `IIdentificationService`.
- `useImageUpload`: Handles file processing and storage.

## Dependencies (Injected)

- `IIdentificationService`: via `useIdentificationService` hook.
- `IImageStore`: via `useImageStore` hook.
- `INavigationAdapter`: via platform context (if needed).

## Replaceability

This module is a "Black Box". It can be completely rewritten as long as it exports `IdentificationFeature` with the same props. No other module should import from `./components/` or `./hooks/`.
