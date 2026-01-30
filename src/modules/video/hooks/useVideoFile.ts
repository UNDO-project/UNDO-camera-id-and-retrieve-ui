import { useState, useCallback } from 'react';
import type { VideoFile } from '@/primitives';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];

interface UseVideoFileReturn {
  video: VideoFile | null;
  error: string | null;
  handleFileSelected: (file: File) => void;
  clearVideo: () => void;
}

export function useVideoFile(): UseVideoFileReturn {
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = useCallback((file: File) => {
    setError(null);

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Allowed: MP4, WebM, MOV, AVI');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return;
    }

    setVideo({
      file,
      metadata: {
        filename: file.name,
        size: file.size,
        mimeType: file.type,
      },
    });
  }, []);

  const clearVideo = useCallback(() => {
    setVideo(null);
    setError(null);
  }, []);

  return { video, error, handleFileSelected, clearVideo };
}
