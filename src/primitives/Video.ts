/**
 * PRIMITIVE: VideoFile
 *
 * Represents an uploadable video file in the system.
 */
export interface VideoFile {
  file: File;
  metadata: {
    filename: string;
    size: number; // bytes
    mimeType: string; // video/mp4, video/webm, etc.
    duration?: number; // seconds (if available)
  };
}

/**
 * PRIMITIVE: VideoProcessingOptions
 *
 * Configuration for video processing.
 */
export interface VideoProcessingOptions {
  targetFps: number; // 1-30
  identificationMode: 'detect_only' | 'full';
  outputFormat: 'mp4';
  highQuality: boolean; // request H.264 export; backend default false
}

/**
 * PRIMITIVE: VideoTaskStatus
 */
export type VideoTaskStatus = 'queued' | 'processing' | 'completed' | 'failed';

/**
 * PRIMITIVE: VideoTask
 *
 * Represents a video processing task.
 */
export interface VideoTask {
  taskId: string;
  status: VideoTaskStatus;
  filename: string;
  fileSizeMb: number;
  createdAt: Date;
}

/**
 * PRIMITIVE: VideoTaskProgress
 *
 * Progress information for a video processing task.
 */
export interface VideoTaskProgress {
  taskId: string;
  status: VideoTaskStatus;
  progressPercent: number;
  framesProcessed: number;
  framesTotal: number;
  currentFps: number;
  elapsedSeconds: number;
  outputUrl: string | null;
  error: string | null;
  filename: string;
  createdAt: Date | null;
  options: VideoProcessingOptions | null;
}
