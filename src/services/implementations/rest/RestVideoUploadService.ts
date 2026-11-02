import type { ApiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { IVideoUploadService } from '@/services/interfaces';
import type { VideoFile, VideoTask, VideoTaskProgress, VideoProcessingOptions } from '@/primitives';

export class RestVideoUploadService implements IVideoUploadService {
  constructor(
    private apiClient: ApiClient,
    private baseUrl: string = ''
  ) {}

  async upload(video: VideoFile, options?: Partial<VideoProcessingOptions>): Promise<VideoTask> {
    const formData = new FormData();
    formData.append('file', video.file);

    if (options) {
      formData.append(
        'options',
        JSON.stringify({
          target_fps: options.targetFps ?? 15,
          identification_mode: options.identificationMode ?? 'detect_only',
          output_format: options.outputFormat ?? 'mp4',
          high_quality: options.highQuality ?? false,
        })
      );
    }

    const response = await this.apiClient.post(ENDPOINTS.VIDEO_UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return this.mapUploadResponse(response.data);
  }

  async getProgress(taskId: string): Promise<VideoTaskProgress> {
    const response = await this.apiClient.get(ENDPOINTS.VIDEO_STATUS(taskId));
    return this.mapProgressResponse(response.data);
  }

  getDownloadUrl(taskId: string): string {
    return `${this.baseUrl}${ENDPOINTS.VIDEO_DOWNLOAD(taskId)}`;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.apiClient.delete(ENDPOINTS.VIDEO_DELETE(taskId));
  }

  private mapUploadResponse(data: any): VideoTask {
    return {
      taskId: data.task_id,
      status: data.status,
      filename: data.filename,
      fileSizeMb: data.file_size_mb,
      createdAt: new Date(data.created_at),
    };
  }

  private mapProgressResponse(data: any): VideoTaskProgress {
    return {
      taskId: data.task_id,
      status: data.status,
      progressPercent: data.progress_percent ?? 0,
      framesProcessed: data.frames_processed ?? 0,
      framesTotal: data.frames_total ?? 0,
      currentFps: data.current_fps ?? 0,
      elapsedSeconds: data.elapsed_seconds ?? 0,
      outputUrl: data.output_url,
      error: data.error,
      filename: data.filename ?? '',
      createdAt: data.created_at ? new Date(data.created_at) : null,
      options: data.options
        ? {
            targetFps: data.options.target_fps,
            identificationMode: data.options.identification_mode,
            outputFormat: data.options.output_format,
            highQuality: data.options.high_quality ?? false,
          }
        : null,
    };
  }
}
