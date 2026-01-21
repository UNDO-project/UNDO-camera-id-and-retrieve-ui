import * as React from 'react';
import { Dropzone } from '@/ui/components';
import { FileImage } from 'lucide-react';

interface ImageUploadZoneProps {
  onImageSelected: (file: File) => void;
  isProcessing?: boolean;
}

export function ImageUploadZone({ onImageSelected, isProcessing }: ImageUploadZoneProps) {
  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      onImageSelected(files[0]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Dropzone
        onDrop={handleDrop}
        accept={['image/jpeg', 'image/png', 'image/webp']}
        maxSize={10 * 1024 * 1024} // 10MB
        disabled={isProcessing}
        className="h-64 border-dashed"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-muted rounded-full p-4">
            <FileImage className="text-muted-foreground h-8 w-8" />
          </div>
          <div>
            <p className="text-lg font-medium">Drag and drop an image here</p>
            <p className="text-lg font-medium">or click to upload</p>
            <p className="text-muted-foreground text-sm">Supports JPEG, PNG, WEBP up to 10MB</p>
          </div>
        </div>
      </Dropzone>
    </div>
  );
}
