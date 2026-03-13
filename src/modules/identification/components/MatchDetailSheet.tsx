'use client';

import * as React from 'react';
import NextImage from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button,
  Badge,
  Separator,
} from '@/ui/components';
import { SimilarityBadge } from '@/modules/common';
import { ExternalLink } from 'lucide-react';
import type { CameraMatch } from '@/primitives';

interface MatchDetailSheetProps {
  match: CameraMatch | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatchDetailSheet({ match, open, onOpenChange }: MatchDetailSheetProps) {
  if (!match) return null;

  const { camera } = match;
  const specs = camera.specs;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <div className="flex items-start justify-between gap-3 pr-6">
            <div>
              <SheetTitle className="text-lg">{camera.modelName}</SheetTitle>
              <SheetDescription>
                {camera.vendor} &bull; {camera.category}
              </SheetDescription>
            </div>
            <SimilarityBadge score={match.similarity} />
          </div>
        </SheetHeader>

        {/* Camera Image */}
        <div className="px-4">
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
            {match.catalogImageUrl ? (
              <NextImage
                src={match.catalogImageUrl}
                alt={camera.modelName}
                fill
                className="object-cover"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            ) : (
              <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {camera.description && (
          <div className="px-4">
            <p className="text-muted-foreground text-sm leading-relaxed">{camera.description}</p>
          </div>
        )}

        <Separator className="mx-4 w-auto" />

        {/* Quick Specs */}
        <div className="space-y-3 px-4">
          <h4 className="text-sm font-semibold">Quick Specs</h4>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Series</dt>
            <dd className="font-medium">{camera.productSeries || '—'}</dd>

            <dt className="text-muted-foreground">Category</dt>
            <dd className="font-medium">{camera.productCategory || '—'}</dd>

            {specs?.maxResolution && (
              <>
                <dt className="text-muted-foreground">Resolution</dt>
                <dd className="font-medium">{specs.maxResolution}</dd>
              </>
            )}

            {specs?.lens && (
              <>
                <dt className="text-muted-foreground">Lens</dt>
                <dd className="font-medium">{specs.lens}</dd>
              </>
            )}

            {specs?.horizontalFov && (
              <>
                <dt className="text-muted-foreground">Horizontal FoV</dt>
                <dd className="font-medium">{specs.horizontalFov}</dd>
              </>
            )}
          </dl>
        </div>

        {/* Footer Actions */}
        <SheetFooter className="flex-row gap-2 border-t pt-4">
          <Button asChild className="flex-1 gap-2">
            <a href={`/catalog/${match.cameraId}`} target="_blank" rel="noopener noreferrer">
              View Full Details
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          {camera.datasheetUrl && (
            <Button variant="outline" className="gap-2" asChild>
              <a href={camera.datasheetUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Datasheet
              </a>
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
