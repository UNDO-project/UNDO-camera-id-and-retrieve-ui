import '@testing-library/jest-dom';

// Polyfill ResizeObserver for Radix UI / shadcn/ui components
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
