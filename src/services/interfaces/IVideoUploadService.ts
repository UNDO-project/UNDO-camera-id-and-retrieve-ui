import type { VideoFile, VideoTask, VideoTaskProgress, VideoProcessingOptions } from '@/primitives';

/**
 * INTERFACE: IVideoUploadService
 *
 * Handles video file upload and batch processing.
 *
 * BLACK BOX: Consumers don't know if this uses:
 * - REST API, GraphQL, or local processing
 * - Polling, WebSocket, or SSE for progress updates
 */
export interface IVideoUploadService {
  /**
   * Upload a video file for processing.
   *
   * @param video - The video file to process
   * @param options - Processing options
   * @returns Promise resolving to task information
   * @throws ServiceError if upload fails
   */
  upload(video: VideoFile, options?: Partial<VideoProcessingOptions>): Promise<VideoTask>;

  /**
   * Get the current progress of a video processing task.
   *
   * @param taskId - Unique task identifier
   * @returns Promise resolving to task progress
   * @throws ServiceError if task not found
   */
  getProgress(taskId: string): Promise<VideoTaskProgress>;

  /**
   * Get the download URL for a completed video.
   *
   * @param taskId - Unique task identifier
   * @returns Download URL string
   */
  getDownloadUrl(taskId: string): string;

  /**
   * Delete a video processing task and its files.
   *
   * @param taskId - Unique task identifier
   * @throws ServiceError if task not found
   */
  deleteTask(taskId: string): Promise<void>;
}
