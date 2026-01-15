import * as React from 'react';
import NextImage from 'next/image';
import { Card, CardContent } from '@/ui/components';
import { ConfidenceBadge, SimilarityBadge } from '@/modules/common';
import type { Detection, CameraMatch } from '@/primitives';

interface DetectionCardProps {
  detection: Detection;
  bestMatch?: CameraMatch;
  onClick?: () => void;
  isSelected?: boolean;
}

export function DetectionCard({ detection, bestMatch, onClick, isSelected }: DetectionCardProps) {
  return (
    <Card
      className={`hover:border-primary cursor-pointer transition-all ${isSelected ? 'border-primary ring-primary ring-1' : ''}`}
      onClick={onClick}
    >
      <CardContent className="flex gap-3 p-3">
        <div className="bg-muted relative h-20 w-20 flex-shrink-0 overflow-hidden rounded">
          {detection.cropUrl ? (
            <NextImage
              src={detection.cropUrl}
              alt={`Detected ${detection.label} crop`}
              fill
              className="object-cover"
              sizes="80px"
              unoptimized
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
              No crop
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <div className="flex items-center justify-between">
            <span className="truncate font-medium capitalize">{detection.label}</span>
            <ConfidenceBadge score={detection.confidence} />
          </div>

          {bestMatch ? (
            <div className="text-muted-foreground text-sm">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-foreground truncate">{bestMatch.camera.modelName}</span>
                <SimilarityBadge score={bestMatch.similarity} className="origin-left scale-75" />
              </div>
              <p className="truncate text-xs">{bestMatch.camera.vendor}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm italic">No clear match found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
