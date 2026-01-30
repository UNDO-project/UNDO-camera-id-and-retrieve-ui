'use client';

import { useEffect, useRef } from 'react';
import type { StreamFrame } from '@/primitives';
import { cn } from '@/utils/cn';
import { Skeleton } from '@/ui/components';

interface StreamDisplayProps {
  frame: StreamFrame | null;
  isConnected: boolean;
  className?: string;
}

export function StreamDisplay({ frame, isConnected, className }: StreamDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frame?.imageBlob) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const url = URL.createObjectURL(frame.imageBlob);
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // We can revoke immediately after drawing since we don't need the URL anymore for this frame
      URL.revokeObjectURL(url);
    };

    img.src = url;

    return () => {
      // Safety cleanup if unmounted before load
      URL.revokeObjectURL(url);
    };
  }, [frame]);

  if (!isConnected) {
    return (
      <div
        className={cn(
          'bg-muted/20 border-muted flex aspect-video items-center justify-center rounded-lg border-2 border-dashed',
          className
        )}
      >
        <p className="text-muted-foreground">Stream disconnected</p>
      </div>
    );
  }

  if (!frame) {
    return (
      <div className={cn('relative aspect-video', className)}>
        <Skeleton className="h-full w-full rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground font-medium">Waiting for frames...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-black', className)}>
      <canvas ref={canvasRef} className="block h-full w-full object-contain" />
      <div className="absolute top-2 right-2 rounded bg-black/50 px-2 py-1 font-mono text-xs text-white">
        FPS: {frame.metadata.fpsActual.toFixed(1)}
      </div>
    </div>
  );
}
