# cIDaR Frontend

> **Camera Identification and Research**
>
> An experimental platform for researching computer vision approaches to CCTV identification.

![Status](https://img.shields.io/badge/status-active-success.svg)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Tech](https://img.shields.io/badge/built%20with-Next.js-black)

## 🚀 Overview

cIDaR is a research tool exploring how computer vision can identify surveillance cameras from images and video. It experiments with detection, feature extraction, and similarity matching against a dataset of known camera models.

This is a platform for transparency research, investigative journalism, and civic technology applications.

## ✨ Features

- **Image Upload**: Test single-frame camera detection and identification
- **Video Processing**: Analyze recorded video frame-by-frame
- **Live Streaming**: Real-time detection via WebSocket connections
- **Camera Dataset**: Browse indexed camera models with specifications

## 🛠 Tech Stack

| Layer     | Technology                     |
| :-------- | :----------------------------- |
| Framework | Next.js 15+ (App Router)       |
| Language  | TypeScript (Strict Mode)       |
| Styling   | Tailwind CSS & shadcn/ui       |
| State     | TanStack Query                 |
| Testing   | Vitest & React Testing Library |

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/jethronap/UNDO-camera-id-and-retrieve-ui
cd cidar-frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment

Copy `.env.example` to `.env.local` and configure the API URL:

```bash
cp .env.example .env.local
```

## 🧪 Testing

| Command                    | Description                    |
| :------------------------- | :----------------------------- |
| `npm run test`             | Run all tests (CI mode)        |
| `npm run test:watch`       | Interactive watch mode         |
| `npm run test:unit`        | Unit tests only                |
| `npm run test:integration` | Integration tests only         |
| `./scripts/test.sh`        | Interactive menu-driven runner |

## 📂 Project Structure

```
src/
├── api/            # HTTP Client and Endpoint definitions
├── app/            # Next.js Pages and Layouts
├── components/     # Shared Components (Header, Footer, etc.)
├── container/      # Service Container & Dependency Injection
├── lib/            # Third-party library configurations
├── modules/        # Feature Modules (Identification, Catalog, Video)
├── platform/       # Platform Adapters (Web implementations)
├── primitives/     # Core Data Types (Domain Entities)
├── services/       # Service Interfaces & Implementations
├── test/           # Test Setup & Utilities
├── ui/             # Reusable UI Components (shadcn/ui)
└── utils/          # Utility functions
```

## 🏗 Architecture

The frontend uses a decoupled "Black Box" architecture:

- **Services**: Business logic defined by interfaces, with injectable implementations
- **Modules**: Self-contained features owning their UI, hooks, and logic
- **Primitives**: Shared domain types across the application

This makes it easier to experiment with different CV approaches without rewriting the UI.

## 🔒 Privacy

cIDaR keeps no logs. Uploaded images and videos are processed in memory and deleted after analysis. See the [Privacy page](https://cidar.app/privacy) for details.

## 📄 License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

## 🔗 Links

- [UNDO Project](https://undo-project.info)
- [Backend Repository](https://github.com/jethronap/UNDO-camera-id-and-retrieve)
