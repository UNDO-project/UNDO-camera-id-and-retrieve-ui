import { renderHook, act } from '@testing-library/react';
import { useVideoStream } from '../useVideoStream';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { StreamState } from '@/primitives';

const mockConnect = vi.fn();
const mockDisconnect = vi.fn();
const mockOnStateChange = vi.fn();
const mockOnFrame = vi.fn();
const mockGetState = vi.fn(() => ({ status: 'disconnected' }));

vi.mock('@/container/hooks', () => ({
  useVideoStreamService: () => ({
    connect: mockConnect,
    disconnect: mockDisconnect,
    onStateChange: mockOnStateChange,
    onFrame: mockOnFrame,
    getState: mockGetState,
    sendFrame: vi.fn(),
  }),
}));

describe('useVideoStream', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnStateChange.mockReturnValue(() => {});
    mockOnFrame.mockReturnValue(() => {});
    mockConnect.mockResolvedValue(undefined);
  });

  it('connects on mount if autoConnect is true', () => {
    const config = { mode: 'detect_only', targetFps: 15 } as any;

    renderHook(() => useVideoStream({ config, autoConnect: true }));

    expect(mockConnect).toHaveBeenCalledWith(config);
  });

  it('does not connect on mount if autoConnect is false', () => {
    const config = { mode: 'detect_only', targetFps: 15 } as any;

    renderHook(() => useVideoStream({ config, autoConnect: false }));

    expect(mockConnect).not.toHaveBeenCalled();
  });

  it('updates state when service emits change', () => {
    const config = { mode: 'detect_only', targetFps: 15 } as any;

    // Capture the callback passed to onStateChange
    let stateCallback: (state: StreamState) => void = () => {};
    mockOnStateChange.mockImplementation((cb) => {
      stateCallback = cb;
      return () => {};
    });

    const { result } = renderHook(() => useVideoStream({ config }));

    act(() => {
      stateCallback({ status: 'connected', fps: 30 });
    });

    expect(result.current.state).toEqual({ status: 'connected', fps: 30 });
    expect(result.current.fps).toBe(30);
  });
});
