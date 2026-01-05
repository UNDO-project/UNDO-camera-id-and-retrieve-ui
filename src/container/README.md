# Dependency Injection Container

This module manages the lifecycle of services and injects them into the React component tree using Context.

## Components

- `ServiceContainer.tsx`: Top-level provider that initializes services via the factory and exposes them via Context.
- `hooks.ts`: Custom hooks for consuming individual services (e.g., `useIdentificationService`).

## Usage

Wrap your application root with `ServiceContainer`:

```tsx
// src/app/layout.tsx
import { ServiceContainer } from '@/container';

export default function RootLayout({ children }) {
  return <ServiceContainer>{children}</ServiceContainer>;
}
```

Consume services in components:

```tsx
// src/modules/identification/IdentificationFeature.tsx
import { useIdentificationService } from '@/container/hooks';

export function IdentificationFeature() {
  const service = useIdentificationService();

  const handleIdentify = async (image) => {
    const result = await service.identify(image, params);
  };
}
```

## Configuration

The container uses environment variables to configure the services:

- `NEXT_PUBLIC_API_URL`: Base URL for the backend API.
- `NEXT_PUBLIC_ENABLE_MOCK_SERVICES`: Set to 'true' to use mock services instead of REST.
