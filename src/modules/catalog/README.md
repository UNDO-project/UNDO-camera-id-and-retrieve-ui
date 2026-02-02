# Dataset Module

Browse and search the camera dataset.

## Public Interface

- `CatalogBrowser`: Main component for browsing and searching.
  - Props: `CatalogBrowserProps`
- `CameraDetail`: View for a single camera.
  - Props: `CameraDetailProps`

## Internal Components (Private)

- `SearchBar`: Search input with debounce.
- `FilterPanel`: Faceted filters for vendor, category, etc.
- `CameraGrid`: Responsive grid of camera cards.
- `CameraCard`: Summary view of a camera.
- `SpecificationsTable`: Detailed specs table.

## Hooks (Private)

- `useCatalogSearch`: Wraps `ICatalogService.search`.
- `useCatalogStats`: Wraps `ICatalogService.getStats`.
- `useCamera`: Wraps `ICatalogService.getCamera`.

## Dependencies (Injected)

- `ICatalogService`: via `useCatalogService` hook.

## Replaceability

This module is a "Black Box". It can be completely rewritten as long as it exports `CatalogBrowser` and `CameraDetail` with the same props.
