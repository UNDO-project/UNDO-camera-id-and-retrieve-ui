import type { IVideoUploadService } from '@/services/interfaces';
import type { VideoFile, VideoTask, VideoTaskProgress, VideoProcessingOptions } from '@/primitives';

export class MockVideoUploadService implements IVideoUploadService {
  private tasks = new Map<string, VideoTaskProgress>();

  async upload(video: VideoFile, options?: Partial<VideoProcessingOptions>): Promise<VideoTask> {
    const taskId = crypto.randomUUID();
    const task: VideoTask = {
      taskId,
      status: 'queued',
      filename: video.metadata.filename,
      fileSizeMb: video.metadata.size / (1024 * 1024),
      createdAt: new Date(),
    };

    const progress: VideoTaskProgress = {
      ...task,
      progressPercent: 0,
      framesProcessed: 0,
      framesTotal: 1000,
      currentFps: 0,
      elapsedSeconds: 0,
      outputUrl: null,
      error: null,
      options: {
        targetFps: options?.targetFps ?? 15,
        identificationMode: options?.identificationMode ?? 'detect_only',
        outputFormat: options?.outputFormat ?? 'mp4',
        highQuality: options?.highQuality ?? false,
      },
    };

    this.tasks.set(taskId, progress);

    // Simulate processing
    this.simulateProcessing(taskId);

    return task;
  }

  async getProgress(taskId: string): Promise<VideoTaskProgress> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  getDownloadUrl(taskId: string): string {
    return `/mock/download/${taskId}.mp4`;
  }

  async deleteTask(taskId: string): Promise<void> {
    if (!this.tasks.has(taskId)) {
      throw new Error('Task not found');
    }
    this.tasks.delete(taskId);
  }

  private simulateProcessing(taskId: string) {
    let progress = 0;
    const interval = setInterval(() => {
      const task = this.tasks.get(taskId);
      if (!task) {
        clearInterval(interval);
        return;
      }

      progress += 5;
      if (progress <= 100) {
        this.tasks.set(taskId, {
          ...task,
          status: 'processing',
          progressPercent: progress,
          framesProcessed: Math.floor((progress / 100) * task.framesTotal),
          currentFps: 30,
          elapsedSeconds: progress / 5,
        });
      } else {
        this.tasks.set(taskId, {
          ...task,
          status: 'completed',
          progressPercent: 100,
          framesProcessed: task.framesTotal,
          outputUrl: this.getDownloadUrl(taskId),
        });
        clearInterval(interval);
      }
    }, 500);
  }
}
