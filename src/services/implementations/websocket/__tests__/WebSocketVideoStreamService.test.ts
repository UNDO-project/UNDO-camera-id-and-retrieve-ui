import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WebSocketVideoStreamService } from '../WebSocketVideoStreamService';
import type { StreamConfig } from '@/primitives';

// Mock WebSocket class
class MockWebSocket {
  onopen: (() => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((err: any) => void) | null = null;
  onmessage: ((event: any) => void) | null = null;
  readyState = 0; // CONNECTING

  static OPEN = 1;

  constructor(public url: string) {
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      this.onopen?.();
    }, 10); // Small delay to simulate async
  }

  send = vi.fn();
  close = vi.fn(() => {
    this.onclose?.();
  });
}

global.WebSocket = MockWebSocket as any;

// Mock Blob.arrayBuffer if not present (JSDOM environment often misses this)
if (!Blob.prototype.arrayBuffer) {
  Blob.prototype.arrayBuffer = async function () {
    return new ArrayBuffer(this.size);
  };
}

describe('WebSocketVideoStreamService', () => {
  let service: WebSocketVideoStreamService;
  const baseUrl = 'http://localhost';

  beforeEach(() => {
    service = new WebSocketVideoStreamService(baseUrl);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('connects with correct URL parameters', async () => {
    const config: StreamConfig = { mode: 'detect_only', targetFps: 15 };

    await expect(service.connect(config)).resolves.toBeUndefined();
    expect(service.isConnected()).toBe(true);
  });

  it('handles incoming frames and pairs metadata', async () => {
    const config: StreamConfig = { mode: 'detect_only', targetFps: 15 };
    await service.connect(config);

    const frameCallback = vi.fn();
    service.onFrame(frameCallback);

    // Simulate WebSocket message
    const ws = (service as any).ws as MockWebSocket;

    // 1. Send Binary Frame
    const blob = new Blob(['fake-image'], { type: 'image/jpeg' });
    const arrayBuffer = await blob.arrayBuffer();
    ws.onmessage?.({ data: arrayBuffer });

    // 2. Send Metadata
    const metadata = {
      detections: [],
      processing_time_ms: 10,
      frame_number: 1,
      fps_actual: 15,
    };
    ws.onmessage?.({ data: JSON.stringify(metadata) });

    expect(frameCallback).toHaveBeenCalledTimes(1);
    const frame = frameCallback.mock.calls[0][0];
    expect(frame.metadata.frameNumber).toBe(1);
    expect(frame.imageBlob).toBeDefined();
  });

  it('handles state changes', async () => {
    const stateCallback = vi.fn();
    service.onStateChange(stateCallback);

    await service.connect({ mode: 'full', targetFps: 30 });

    expect(stateCallback).toHaveBeenCalledWith(expect.objectContaining({ status: 'connected' }));

    service.disconnect();
    expect(stateCallback).toHaveBeenCalledWith(expect.objectContaining({ status: 'disconnected' }));
  });
});
