'use client';

import { useCallback, useRef, useEffect } from 'react';

interface UseFrameCaptureOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  targetFps: number;
  quality?: number;
  enabled?: boolean;
  onCapture: (frameData: ArrayBuffer) => void;
}

export function useFrameCapture(options: UseFrameCaptureOptions) {
  const { videoRef, targetFps, quality = 0.85, enabled = true, onCapture } = options;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastCaptureRef = useRef<number>(0);

  const captureFrame = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return; // HAVE_CURRENT_DATA

    // Lazy-create canvas
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    return new Promise<ArrayBuffer>((resolve) => {
      canvas.toBlob(
        async (blob) => {
          if (blob) {
            resolve(await blob.arrayBuffer());
          }
        },
        'image/jpeg',
        quality
      );
    });
  }, [videoRef, quality]);

  useEffect(() => {
    if (!enabled) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const targetInterval = 1000 / targetFps;

    const loop = async (timestamp: number) => {
      if (timestamp - lastCaptureRef.current >= targetInterval) {
        const frameData = await captureFrame();
        if (frameData) {
          onCapture(frameData);
        }
        lastCaptureRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, targetFps, captureFrame, onCapture]);

  return { captureFrame };
}
