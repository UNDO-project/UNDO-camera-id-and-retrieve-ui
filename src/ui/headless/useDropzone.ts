import { useState, useCallback } from 'react';

interface UseDropzoneOptions {
  accept?: string[];
  maxSize?: number;
  onDrop: (files: File[]) => void;
}

/**
 * Headless hook for file dropzone logic.
 * Handles drag events, state management, and file validation.
 *
 * @param options - Dropzone configuration including accepted types and size limits
 * @returns Drag state and event handlers
 */
export function useDropzone(options: UseDropzoneOptions) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter((file) => {
        // Check MIME type if accept is provided
        if (options.accept && options.accept.length > 0) {
          // Simple check: does file.type start with any accepted string?
          // e.g. 'image/*' matches 'image/png'
          const isAccepted = options.accept.some((type) => {
            if (type.endsWith('/*')) {
              const baseType = type.slice(0, -2);
              return file.type.startsWith(baseType);
            }
            return file.type === type;
          });
          if (!isAccepted) return false;
        }

        if (options.maxSize && file.size > options.maxSize) return false;
        return true;
      });

      if (validFiles.length > 0) {
        options.onDrop(validFiles);
      }
    },
    [options]
  );

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
