# Service Implementations

Concrete implementations of the service interfaces.

## REST Implementations (`rest/`)

Uses the `ApiClient` to communicate with the backend API.

- `RestIdentificationService.ts`: Implements `IIdentificationService`.
  - Uses `zod` for runtime validation of API responses.
  - Maps `IdentifyResponse` to `IdentificationResult`.
- `RestCatalogService.ts`: Implements `ICatalogService`.
  - **Note**: Some methods (search, getCamera) are placeholders as the API endpoints are not yet available.
- `RestHealthService.ts`: Implements `IHealthService`.

## Storage Implementations (`storage/`)

- `BrowserImageStore.ts`: Browser-based image storage.
- `NoOpResultStore.ts`: Placeholder result persistence.

## Mock Implementations (`mock/`)

(See separate directory for mock services used in testing/development)
