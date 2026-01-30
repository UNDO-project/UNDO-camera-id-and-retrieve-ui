import type { IVideoStreamService } from '@/services/interfaces';
import type { StreamConfig, StreamFrame, StreamStats, StreamState } from '@/primitives';

export class MockVideoStreamService implements IVideoStreamService {
  private state: StreamState = { status: 'disconnected' };
  private frameCallbacks: Set<(frame: StreamFrame) => void> = new Set();
  private stateCallbacks: Set<(state: StreamState) => void> = new Set();
  private streamInterval: NodeJS.Timeout | null = null;

  async connect(config: StreamConfig): Promise<void> {
    if (this.state.status !== 'disconnected') return;

    this.updateState({ status: 'connecting' });

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.updateState({ status: 'connected', fps: config.targetFps });
    this.startStreaming(config.targetFps);
  }

  disconnect(): void {
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
      this.streamInterval = null;
    }
    this.updateState({ status: 'disconnected' });
  }

  sendFrame(frameData: ArrayBuffer): void {
    // In mock, we just ignore sent frames or could echo them back
  }

  onFrame(callback: (frame: StreamFrame) => void): () => void {
    this.frameCallbacks.add(callback);
    return () => this.frameCallbacks.delete(callback);
  }

  onStateChange(callback: (state: StreamState) => void): () => void {
    this.stateCallbacks.add(callback);
    callback(this.state);
    return () => this.stateCallbacks.delete(callback);
  }

  getState(): StreamState {
    return this.state;
  }

  async getStats(): Promise<StreamStats> {
    return {
      activeConnections: 1,
      maxConnections: 10,
      totalConnectionsServed: 100,
      totalFramesReceived: 5000,
      totalFramesProcessed: 4990,
      totalFramesDropped: 10,
      averageFps: 29.5,
      averageLatencyMs: 45,
    };
  }

  isConnected(): boolean {
    return this.state.status === 'connected';
  }

  private updateState(newState: StreamState) {
    this.state = newState;
    this.stateCallbacks.forEach((cb) => cb(newState));
  }

  private startStreaming(fps: number) {
    const intervalMs = 1000 / fps;
    let frameNumber = 0;

    this.streamInterval = setInterval(() => {
      frameNumber++;
      const frame: StreamFrame = {
        imageBlob: new Blob(['mock-image-data'], { type: 'image/jpeg' }),
        metadata: {
          detections: [],
          processingTimeMs: 30,
          frameNumber,
          fpsActual: fps,
        },
        timestamp: Date.now(),
      };

      this.frameCallbacks.forEach((cb) => cb(frame));
    }, intervalMs);
  }
}
