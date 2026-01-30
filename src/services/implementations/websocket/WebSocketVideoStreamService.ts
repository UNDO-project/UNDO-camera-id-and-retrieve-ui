import type { IVideoStreamService } from '@/services/interfaces';
import type { StreamConfig, StreamFrame, StreamStats, StreamState } from '@/primitives';
import { ENDPOINTS } from '@/api/endpoints';

type FrameCallback = (frame: StreamFrame) => void;
type StateCallback = (state: StreamState) => void;

export class WebSocketVideoStreamService implements IVideoStreamService {
  private ws: WebSocket | null = null;
  private state: StreamState = { status: 'disconnected' };
  private pendingFrame: Blob | null = null;
  private frameCallbacks: Set<FrameCallback> = new Set();
  private stateCallbacks: Set<StateCallback> = new Set();
  private baseUrl: string;
  private config: StreamConfig | null = null;

  // Reconnection state
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(baseUrl: string) {
    // Convert http(s) to ws(s)
    this.baseUrl = baseUrl.replace(/^http/, 'ws');
  }

  async connect(config: StreamConfig): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    this.config = config;
    this.setState({ status: 'connecting' });

    return new Promise((resolve, reject) => {
      const wsUrl = `${this.baseUrl}/api/v1/ws/video-stream?mode=${config.mode}&target_fps=${config.targetFps}`;
      this.ws = new WebSocket(wsUrl);
      this.ws.binaryType = 'arraybuffer';

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.setState({ status: 'connected', fps: 0 });
        resolve();
      };

      this.ws.onclose = () => {
        this.handleDisconnect();
      };

      this.ws.onerror = () => {
        const error = new Error('WebSocket connection failed');
        this.setState({ status: 'error', error });
        reject(error);
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event);
      };
    });
  }

  disconnect(): void {
    this.clearReconnectTimeout();
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent auto-reconnect
    this.ws?.close();
    this.ws = null;
    this.pendingFrame = null;
    this.setState({ status: 'disconnected' });
  }

  sendFrame(frameData: ArrayBuffer): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(frameData);
    }
  }

  onFrame(callback: FrameCallback): () => void {
    this.frameCallbacks.add(callback);
    return () => this.frameCallbacks.delete(callback);
  }

  onStateChange(callback: StateCallback): () => void {
    this.stateCallbacks.add(callback);
    // Immediately call with current state
    callback(this.state);
    return () => this.stateCallbacks.delete(callback);
  }

  getState(): StreamState {
    return this.state;
  }

  async getStats(): Promise<StreamStats> {
    // This uses HTTP, not WebSocket
    const response = await fetch(`${this.baseUrl.replace(/^ws/, 'http')}${ENDPOINTS.STREAM_STATS}`);
    const data = await response.json();
    return {
      activeConnections: data.active_connections,
      maxConnections: data.max_connections,
      totalConnectionsServed: data.total_connections_served,
      totalFramesReceived: data.total_frames_received,
      totalFramesProcessed: data.total_frames_processed,
      totalFramesDropped: data.total_frames_dropped,
      averageFps: data.average_fps,
      averageLatencyMs: data.average_latency_ms,
    };
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  private handleMessage(event: MessageEvent): void {
    if (event.data instanceof ArrayBuffer) {
      // Binary message: annotated JPEG frame
      this.pendingFrame = new Blob([event.data], { type: 'image/jpeg' });
    } else {
      // Text message: JSON metadata
      try {
        const metadata = JSON.parse(event.data);
        if (this.pendingFrame) {
          const frame: StreamFrame = {
            imageBlob: this.pendingFrame,
            metadata: {
              detections: metadata.detections ?? [],
              processingTimeMs: metadata.processing_time_ms ?? 0,
              frameNumber: metadata.frame_number ?? 0,
              fpsActual: metadata.fps_actual ?? 0,
            },
            timestamp: Date.now(),
          };

          // Update FPS in state
          if (this.state.status === 'connected') {
            this.setState({ status: 'connected', fps: frame.metadata.fpsActual });
          }

          // Notify subscribers
          this.frameCallbacks.forEach((cb) => cb(frame));
          this.pendingFrame = null;
        }
      } catch (e) {
        console.error('Failed to parse frame metadata:', e);
      }
    }
  }

  private handleDisconnect(): void {
    this.ws = null;
    this.pendingFrame = null;

    // Attempt reconnection if not intentionally disconnected
    if (this.reconnectAttempts < this.maxReconnectAttempts && this.config) {
      this.scheduleReconnect();
    } else {
      this.setState({ status: 'disconnected' });
    }
  }

  private scheduleReconnect(): void {
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;

    this.reconnectTimeoutId = setTimeout(async () => {
      if (this.config) {
        try {
          await this.connect(this.config);
        } catch (e) {
          // Will retry on next disconnect
        }
      }
    }, delay);
  }

  private clearReconnectTimeout(): void {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
  }

  private setState(state: StreamState): void {
    this.state = state;
    this.stateCallbacks.forEach((cb) => cb(state));
  }
}
