import * as React from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '@/ui/components';
import { cn } from '@/utils/cn';

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export function ImageViewer({ src, alt, className, aspectRatio = 'video' }: ImageViewerProps) {
  const [zoom, setZoom] = React.useState(1);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));
  const handleReset = () => setZoom(1);

  return (
    <div
      className={cn(
        'bg-muted relative overflow-hidden rounded-md border',
        aspectRatio === 'video' && 'aspect-video',
        aspectRatio === 'square' && 'aspect-square',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-full w-full transition-transform duration-200 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          unoptimized // For blob URLs and external images during prototype
        />
      </div>

      {isHovered && (
        <div className="animate-in fade-in zoom-in-95 absolute right-4 bottom-4 flex gap-2 duration-200">
          <Button variant="secondary" size="icon-sm" onClick={handleZoomOut} disabled={zoom <= 1}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon-sm" onClick={handleReset} disabled={zoom === 1}>
            <Maximize className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon-sm" onClick={handleZoomIn} disabled={zoom >= 3}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
