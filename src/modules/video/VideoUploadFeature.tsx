'use client';

import { useEffect, useState } from 'react';
import { useVideoFile, useVideoUpload, useVideoProgress, useDeleteVideoTask } from './hooks';
import { VideoDropzone } from './components/VideoDropzone';
import { UploadOptions } from './components/UploadOptions';
import { UploadProgress } from './components/UploadProgress';
import { AlertCircleIcon } from 'lucide-react';
import { Card } from '@/ui/components';

interface VideoUploadFeatureProps {
  onComplete?: (taskId: string) => void;
  className?: string;
}

export function VideoUploadFeature({ onComplete, className }: VideoUploadFeatureProps) {
  const { video, error: fileError, handleFileSelected, clearVideo } = useVideoFile();
  const uploadMutation = useVideoUpload();
  const deleteTask = useDeleteVideoTask();
  const [highQuality, setHighQuality] = useState(false);

  const { data: progress } = useVideoProgress({
    taskId: uploadMutation.data?.taskId ?? null,
    enabled: !!uploadMutation.data?.taskId,
  });

  // Handle auto-start upload when file is selected
  useEffect(() => {
    if (video && !uploadMutation.isPending && !uploadMutation.data) {
      uploadMutation.mutate({ video, options: { highQuality } });
    }
  }, [video, uploadMutation, highQuality]);

  // Handle completion callback
  useEffect(() => {
    if (progress?.status === 'completed' && onComplete) {
      onComplete(progress.taskId);
    }
  }, [progress?.status, progress?.taskId, onComplete]);

  const handleDownload = () => {
    if (progress?.outputUrl) {
      window.open(progress.outputUrl, '_blank');
    }
  };

  const handleReset = () => {
    // Release the server-side task right away instead of waiting for the
    // retention sweeper. Fire-and-forget: the reset must never depend on it.
    const taskId = uploadMutation.data?.taskId;
    if (taskId) {
      deleteTask.mutate(taskId, { onError: () => undefined });
    }
    clearVideo();
    uploadMutation.reset();
  };

  // 1. Error state (File validation or API error)
  if (fileError || uploadMutation.isError) {
    return (
      <Card className="border-destructive/50 bg-destructive/5 p-6">
        <div className="text-destructive mb-2 flex items-center gap-2">
          <AlertCircleIcon className="h-5 w-5" />
          <h3 className="font-medium">Upload Failed</h3>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          {fileError || uploadMutation.error?.message || 'An unknown error occurred'}
        </p>
        <button
          onClick={handleReset}
          className="hover:text-primary text-sm font-medium underline underline-offset-4"
        >
          Try again
        </button>
      </Card>
    );
  }

  // 2. Processing/Completed state
  if (progress || uploadMutation.isPending) {
    // If we have progress data, use it.
    // If not but mutation is pending/success, show initial state using local video metadata
    const displayProgress = progress ?? {
      taskId: 'pending',
      status: 'queued',
      progressPercent: 0,
      framesProcessed: 0,
      framesTotal: 0,
      currentFps: 0,
      elapsedSeconds: 0,
      outputUrl: null,
      error: null,
      filename: video?.metadata.filename ?? 'Video',
      createdAt: new Date(),
      expiresAt: null,
      options: null,
    };

    return (
      <UploadProgress
        progress={displayProgress}
        onDownload={handleDownload}
        onReset={handleReset}
        className={className}
      />
    );
  }

  // 3. Idle state (Options + Dropzone)
  return (
    <div className="space-y-4">
      <UploadOptions highQuality={highQuality} onHighQualityChange={setHighQuality} />
      <VideoDropzone onFileSelected={handleFileSelected} className={className} />
    </div>
  );
}
