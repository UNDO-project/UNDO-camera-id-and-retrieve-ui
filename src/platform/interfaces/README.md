# Platform Abstraction Interfaces

This directory defines the contracts for platform-specific functionality.
This abstraction allows the application to run on both Web (Next.js) and Mobile (React Native) with shared business logic.

- `IPlatformAdapter`: Handles device interactions (file picking, downloading, sharing).
- `INavigationAdapter`: Abstracts routing (Next.js Router vs React Navigation).

## Implementation Guidelines

When implementing these interfaces:

1. Keep the interface platform-agnostic (don't return DOM elements).
2. Handle platform-specific errors internally or wrap them in a generic error.
3. Use conditional imports in the factory if necessary.
