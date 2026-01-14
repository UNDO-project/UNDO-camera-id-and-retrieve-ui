'use client';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { useDropzone } from '@/ui/headless/useDropzone';
import { UploadIcon } from 'lucide-react';

interface DropzoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  onDrop: (files: File[]) => void;
  accept?: string[];
  maxSize?: number;
  disabled?: boolean;
}

export function Dropzone({
  className,
  onDrop,
  accept,
  maxSize,
  disabled,
  children,
  ...props
}: DropzoneProps) {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop } = useDropzone({
    onDrop,
    accept,
    maxSize,
  });

  const handleDragOverEvent = (e: React.DragEvent) => {
    if (disabled) return;
    handleDragOver(e);
  };

  const handleDragLeaveEvent = (e: React.DragEvent) => {
    if (disabled) return;
    handleDragLeave();
  };

  const handleDropEvent = (e: React.DragEvent) => {
    if (disabled) return;
    handleDrop(e);
  };

  return (
    <div
      className={cn(
        'border-muted-foreground/25 relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors',
        isDragging && !disabled && 'border-primary bg-primary/5',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
      onDragOver={handleDragOverEvent}
      onDragLeave={handleDragLeaveEvent}
      onDrop={handleDropEvent}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="bg-background rounded-full p-4 shadow-sm">
          <UploadIcon className="text-muted-foreground h-8 w-8" />
        </div>
        <div className="flex flex-col gap-1">
          {children || (
            <>
              <p className="text-lg font-medium">Drop images here</p>
              <p className="text-muted-foreground text-sm">or click to upload</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
