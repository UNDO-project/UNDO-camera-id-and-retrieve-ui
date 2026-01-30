import type { Detection } from './Detection';
import type { CameraMatch } from './CameraMatch';

/**
 * PRIMITIVE: StreamConfig
 *
 * Configuration for WebSocket video streaming.
 */
export interface StreamConfig {
  mode: 'detect_only' | 'full';
  targetFps: number; // 1-30
}

/**
 * PRIMITIVE: StreamDetection
 *
 * Detection result from video stream (simplified for real-time).
 */
export interface StreamDetection {
  bbox: [number, number, number, number]; // [x1, y1, x2, y2] pixels
  confidence: number; // 0-1
  class: string; // "camera"
  matches?: StreamCameraMatch[]; // Only in 'full' mode
}

/**
 * PRIMITIVE: StreamCameraMatch
 *
 * Simplified camera match for real-time streaming.
 */
export interface StreamCameraMatch {
  cameraId: string;
  similarity: number;
  modelName: string;
  manufacturer: string;
}

/**
 * PRIMITIVE: FrameMetadata
 *
 * Metadata returned with each processed frame.
 */
export interface FrameMetadata {
  detections: StreamDetection[];
  processingTimeMs: number;
  frameNumber: number;
  fpsActual: number;
}

/**
 * PRIMITIVE: StreamFrame
 *
 * A processed frame with its metadata.
 */
export interface StreamFrame {
  imageBlob: Blob;
  metadata: FrameMetadata;
  timestamp: number;
}

/**
 * PRIMITIVE: StreamState
 *
 * State of the WebSocket stream connection.
 */
export type StreamState =
  | { status: 'disconnected' }
  | { status: 'connecting' }
  | { status: 'connected'; fps: number }
  | { status: 'error'; error: Error };

/**
 * PRIMITIVE: StreamStats
 *
 * Statistics about the streaming service.
 */
export interface StreamStats {
  activeConnections: number;
  maxConnections: number;
  totalConnectionsServed: number;
  totalFramesReceived: number;
  totalFramesProcessed: number;
  totalFramesDropped: number;
  averageFps: number;
  averageLatencyMs: number;
}
