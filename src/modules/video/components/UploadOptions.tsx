'use client';

import { Label } from '@/ui/components';
import { cn } from '@/utils/cn';

interface UploadOptionsProps {
  highQuality: boolean;
  onHighQualityChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function UploadOptions({
  highQuality,
  onHighQualityChange,
  disabled,
  className,
}: UploadOptionsProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="space-y-0.5">
        <Label htmlFor="high-quality-toggle">High quality export (H.264)</Label>
        <p className="text-muted-foreground text-xs">
          Larger file, better picture. Falls back to standard quality if the server cannot encode
          H.264.
        </p>
      </div>
      <input
        id="high-quality-toggle"
        type="checkbox"
        className="text-primary focus:ring-primary h-5 w-5 rounded border-gray-300"
        checked={highQuality}
        onChange={(e) => onHighQualityChange(e.target.checked)}
        disabled={disabled}
      />
    </div>
  );
}
