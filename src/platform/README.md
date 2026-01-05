# Platform Abstraction

Abstracts platform-specific functionality to allow web -> mobile transition.

- `interfaces/`: Platform-agnostic contracts.
- `web/`: Implementations using DOM and Next.js APIs.
- `mobile/`: (Future) Implementations using React Native APIs.
- `factory.ts`: Helpers to create the correct adapter for the current platform.

## Implementations

### Web

- `WebPlatformAdapter`: Uses `input[type=file]`, `fetch`, `navigator.share`.
- `NextNavigationAdapter`: Wraps `next/navigation` hooks.

## Usage

```typescript
// In a non-React context (or root initialization)
const platformAdapter = createPlatformAdapter('web');

// Inside a component for navigation (due to hooks)
const router = useRouter();
const pathname = usePathname();
const navAdapter = new NextNavigationAdapter(router, pathname);
```
