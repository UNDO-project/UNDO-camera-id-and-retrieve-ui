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
  const inputRef = React.useRef<HTMLInputElement>(null);
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

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Re-use logic or pass directly if validation is handled by useDropzone or parent
      // Note: useDropzone logic handles validation on drop, we should apply similar checks here
      // or duplicate validation. For simplicity, we pass valid files to onDrop.
      // Ideally, we'd refactor useDropzone to expose a validate function.
      // For now, we'll do a quick validation consistent with useDropzone's intent or assume parent handles it
      // actually, let's replicate the basic check for consistency or move validation.

      // Basic check implementation similar to useDropzone (simplified)
      const validFiles = files.filter((file) => {
        if (maxSize && file.size > maxSize) return false;
        // Accept check handled by input accept attribute mostly, but double check
        if (accept && accept.length > 0) {
          const isAccepted = accept.some((type) => {
            if (type.endsWith('/*')) {
              return file.type.startsWith(type.slice(0, -2));
            }
            return file.type === type;
          });
          if (!isAccepted) return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        onDrop(validFiles);
      }
    }
    // Reset input value to allow selecting same file again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      className={cn(
        'border-muted-foreground/25 relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors',
        isDragging && !disabled && 'border-primary bg-primary/5',
        disabled && 'cursor-not-allowed opacity-60',
        !disabled && 'hover:bg-muted/50 cursor-pointer',
        className
      )}
      onDragOver={handleDragOverEvent}
      onDragLeave={handleDragLeaveEvent}
      onDrop={handleDropEvent}
      onClick={handleClick}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileInput}
        accept={accept?.join(',')}
        disabled={disabled}
      />
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
