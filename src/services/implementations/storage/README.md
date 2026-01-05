# Storage Implementations

This directory contains implementations of storage-related services.

- `BrowserImageStore.ts`: Implements `IImageStore` using browser `URL.createObjectURL`.
- `NoOpResultStore.ts`: A placeholder implementation of `IResultStore` that does nothing.

## Future Work

- `LocalStorageResultStore.ts`: Will implement `IResultStore` using `localStorage` to persist identification results.
