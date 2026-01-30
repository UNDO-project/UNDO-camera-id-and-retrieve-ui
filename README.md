# cIDaR Frontend

> **Camera Identification and Research**
>
> AI tool for identifying security cameras from images.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech](https://img.shields.io/badge/built%20with-Next.js-black)

## 🚀 Overview

cIDaR is a specialized tool designed for researchers. It employs a computer vision pipeline to detect, crop, and match CCTV camera models against a comprehensive catalog of professional equipment.

## 🏗 Architecture

This project is built on **Black Box Architecture** principles, prioritizing modularity, testing, and replaceability.

- **Primitives**: Core domain types (e.g., `Image`, `Detection`, `CameraRecord`) are defined centrally and shared.
- **Services**: Business logic is defined by strict Interfaces (`IIdentificationService`). Implementations (REST, Mock) are injected via a **Dependency Injection** container.
- **Modules**: Features like `Identification` and `Catalog` are self-contained "black boxes" that own their UI, hooks, and logic.
- **UI Layer**: Built with **shadcn/ui** and Tailwind CSS, separating headless logic from platform-specific renderers.

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & shadcn/ui
- **State Management**: TanStack Query
- **Testing**: Vitest & React Testing Library

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cidar-frontend

# Install dependencies
npm install
```

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Local Image Proxy

When running locally, the application includes a proxy route (`/api/images`) to serve images from the local file system (e.g., `/Users/...` or `C:\...`).
This allows the UI to display images stored outside the `public/` directory without browser security errors.
The `ICatalogService` implementations automatically transform these local paths into proxy URLs.

**Important:** This is a development-only feature. In production, images should be served via a CDN or proper object storage, and the path transformation logic in `src/utils/imagePath.ts` should be disabled or updated.

## 🧪 Testing

We rely on a robust multi-layered testing strategy using **Vitest**.

### Running Tests

| Command                    | Description                                     |
| :------------------------- | :---------------------------------------------- |
| `npm run test`             | Run all tests once (CI mode)                    |
| `npm run test:watch`       | Run tests in interactive watch mode             |
| `npm run test:unit`        | Run unit tests (Modules & Services)             |
| `npm run test:integration` | Run full integration tests                      |
| `npm run test:video`       | Run video-feature specific tests                |
| `./scripts/test.sh`        | **Recommended**: Interactive menu-driven runner |

### Test Strategy

1.  **Service Tests**: Unit tests for business logic and API mappings.
    - _Example:_ `src/services/implementations/rest/__tests__/RestIdentificationService.test.ts`
2.  **Module Tests**: Component and Hook tests to verify feature logic in isolation.
    - _Example:_ `src/modules/identification/__tests__/IdentificationFeature.test.tsx`
3.  **Integration Tests**: Full workflow tests simulating real user interactions.
    - _Example:_ `src/test/integration/IdentificationFlow.test.tsx`

> **Note:** Tests run against a simulated environment using `jsdom` and mock service implementations.

## 🛡 Quality Control

We enforce code quality automatically using **Husky** and **lint-staged**.

### Pre-Commit Hooks

Before every commit, the following checks run automatically on _staged files only_:

1.  **Linting**: ESLint checks for code errors and best practices.
2.  **Formatting**: Prettier ensures consistent code style.

If any check fails, the commit is blocked. Fix the reported issues and try committing again.

## 📂 Project Structure

A quick map of the `src` directory:

```text
src/
├── api/            # HTTP Client and Endpoint definitions
├── app/            # Next.js Pages and Layouts
├── container/      # Service Container & Dependency Injection
├── modules/        # Feature Modules (Identification, Catalog, Video)
├── platform/       # Platform Adapters (Web implementations)
├── primitives/     # Core Data Types (Domain Entities)
├── services/       # Service Interfaces & Implementations (REST, WebSocket)
├── test/           # Test Setup & Utilities
└── ui/             # Reusable UI Components
```
