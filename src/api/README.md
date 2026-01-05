# API Client Module

This module handles all HTTP communication with the backend.

- `client.ts`: Wraps Axios with a clean interface.
- `endpoints.ts`: Centralized API endpoint constants.
- `types.ts`: TypeScript types generated from `openapi.json`.
- `interceptors/`: Request/Response interceptors (error handling, retries).

## Usage

```typescript
import { createApiClient } from './client';
import { ENDPOINTS } from './endpoints';

const api = createApiClient({ baseUrl: 'http://localhost:8000' });

async function checkHealth() {
  try {
    const response = await api.get(ENDPOINTS.HEALTH);
    console.log(response.data);
  } catch (error) {
    // Error is already typed as ApiError
    console.error(error);
  }
}
```

## Updating Types

To update the API types from the backend OpenAPI spec:

```bash
npx openapi-typescript openapi.json -o src/api/types.ts
```
