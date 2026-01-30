import type { StreamConfig, StreamFrame, StreamStats, StreamState } from '@/primitives';

/**
 * INTERFACE: IVideoStreamService
 *
 * Handles real-time video streaming via WebSocket.
 *
 * BLACK BOX: Consumers don't know:
 * - WebSocket implementation details
 * - Binary protocol specifics
 * - Reconnection strategies
 */
export interface IVideoStreamService {
  /**
   * Connect to the video streaming WebSocket.
   *
   * @param config - Stream configuration (mode, fps)
   * @returns Promise that resolves when connected
   * @throws ServiceError if connection fails
   */
  connect(config: StreamConfig): Promise<void>;

  /**
   * Disconnect from the video stream.
   */
  disconnect(): void;

  /**
   * Send a video frame for processing.
   *
   * @param frameData - JPEG-encoded frame as ArrayBuffer
   */
  sendFrame(frameData: ArrayBuffer): void;

  /**
   * Subscribe to processed frames.
   *
   * @param callback - Called when a processed frame is received
   * @returns Unsubscribe function
   */
  onFrame(callback: (frame: StreamFrame) => void): () => void;

  /**
   * Subscribe to connection state changes.
   *
   * @param callback - Called when state changes
   * @returns Unsubscribe function
   */
  onStateChange(callback: (state: StreamState) => void): () => void;

  /**
   * Get current connection state.
   */
  getState(): StreamState;

  /**
   * Get streaming statistics from the server.
   */
  getStats(): Promise<StreamStats>;

  /**
   * Check if currently connected.
   */
  isConnected(): boolean;
}
