# UI Primitives

This directory contains the platform-agnostic UI building blocks.

## Architecture

We follow a separation of concerns pattern:

1. **Headless Logic (`headless/`)**: Platform-agnostic state management and logic (hooks).
   - _Example:_ `useButton.ts`, `useDialog.ts`
   - _Goal:_ Share logic between Web and Mobile.

2. **Renderers (`renderers/`)**: Platform-specific UI implementations.
   - **Web (`renderers/web/`)**: Uses [shadcn/ui](https://ui.shadcn.com/) (React + Tailwind).
   - **Mobile (`renderers/mobile/`)**: (Future) Uses React Native components.

3. **Public Components (`components/`)**: The public API that exports the appropriate renderer.
   - _Example:_ `components/index.ts` re-exports from `renderers/web` (for now).

## Usage

Import components from the public alias `@/ui/components`:

```tsx
import { Button } from '@/ui/components';

export function MyComponent() {
  return <Button>Click me</Button>;
}
```

## Adding New Components

1. Run `npx shadcn@latest add <component>`
2. Move the component from `src/components/ui/` to `src/ui/renderers/web/`.
3. Update imports in the moved file (e.g., `@/lib/utils` -> `@/utils/cn`).
4. Export the component in `src/ui/components/index.ts`.
