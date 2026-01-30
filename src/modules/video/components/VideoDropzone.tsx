import { Dropzone } from '@/ui/components';
import { cn } from '@/utils/cn';
import { FilmIcon } from 'lucide-react';

interface VideoDropzoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

export function VideoDropzone({ onFileSelected, disabled, className }: VideoDropzoneProps) {
  return (
    <Dropzone
      onDrop={(files) => {
        if (files.length > 0) {
          onFileSelected(files[0]);
        }
      }}
      accept={['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']}
      maxSize={500 * 1024 * 1024} // 500MB
      disabled={disabled}
      className={cn('h-64', className)}
    >
      <p className="text-lg font-medium">Drop video file here</p>
      <p className="text-muted-foreground text-sm">MP4, WebM, MOV, AVI (max 500MB)</p>
      <div className="mt-4 flex items-center justify-center">
        <FilmIcon className="text-muted-foreground/50 h-8 w-8" />
      </div>
    </Dropzone>
  );
}
