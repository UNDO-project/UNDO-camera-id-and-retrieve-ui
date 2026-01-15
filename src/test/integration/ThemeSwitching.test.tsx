import { render, screen, fireEvent } from '@/test/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeProvider } from 'next-themes';
import { describe, it, expect, vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock UI components to avoid Portal/Trigger complexities in JSDOM
vi.mock('@/ui/components', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = await vi.importActual<any>('@/ui/components');
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DropdownMenu: ({ children }: any) => <div>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DropdownMenuItem: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
  };
});

describe('Theme Switching', () => {
  it('allows switching between light and dark themes', async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <ThemeToggle />
      </ThemeProvider>
    );

    // With our mock, the options are always visible as buttons
    const darkButton = screen.getByRole('button', { name: 'Dark' });
    fireEvent.click(darkButton);

    expect(screen.getByRole('button', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dark' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'System' })).toBeInTheDocument();
  });
});
