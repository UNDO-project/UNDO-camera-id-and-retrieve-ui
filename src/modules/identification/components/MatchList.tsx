import * as React from 'react';
import NextImage from 'next/image';
import { Card, Button } from '@/ui/components';
import { SimilarityBadge } from '@/modules/common';
import type { CameraMatch } from '@/primitives';
import { ExternalLink, Info } from 'lucide-react';

interface MatchListProps {
  matches: CameraMatch[];
  onSelectMatch?: (match: CameraMatch) => void;
}

export function MatchList({ matches, onSelectMatch }: MatchListProps) {
  if (matches.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No matches found for this detection.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {matches.map((match) => (
        <Card key={match.cameraId} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="bg-muted relative aspect-video w-full sm:aspect-square sm:w-36 md:w-40">
              {match.catalogImageUrl ? (
                <NextImage
                  src={match.catalogImageUrl}
                  alt={match.camera.modelName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 160px"
                />
              ) : (
                <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
                  No Image
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{match.camera.modelName}</h4>
                    <p className="text-muted-foreground text-sm">
                      {match.camera.vendor} • {match.camera.category}
                    </p>
                  </div>
                  <SimilarityBadge score={match.similarity} />
                </div>

                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                  {match.camera.description || 'No description available.'}
                </p>
              </div>

              <div className="mt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => onSelectMatch?.(match)}
                >
                  <Info className="h-4 w-4" />
                  Details
                </Button>
                {match.camera.datasheetUrl && (
                  <Button variant="ghost" size="sm" className="gap-2" asChild>
                    <a href={match.camera.datasheetUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Datasheet
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
