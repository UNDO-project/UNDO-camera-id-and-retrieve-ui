# Service Interfaces

This directory defines the contracts between modules.
Implementation details are completely hidden from consumers.

## Core Services

- `IIdentificationService`: Handles camera detection and matching.
- `ICatalogService`: Manages the camera catalog.
- `IHealthService`: Monitors system health and readiness.

## Storage Services

- `IResultStore`: Persists identification results (initially a no-op).
- `IImageStore`: Manages uploaded images (e.g., using object URLs).

## Implementation Guidelines

Follow the "Replacement Test": Could someone rewrite a module from scratch using only its interface documentation?

When implementing these interfaces:

1. Don't leak implementation details (e.g., don't expose Axios errors directly).
2. Use the primitives defined in `src/primitives/`.
3. Keep the interface clean and focused on the consumer's needs.
