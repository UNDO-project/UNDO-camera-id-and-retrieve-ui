import { Card, CardContent, Skeleton } from '@/ui/components';
import { DetectionCardSkeleton } from './DetectionCardSkeleton';
import { MatchListSkeleton } from './MatchListSkeleton';

export function ResultsDisplaySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column: Image placeholder */}
      <div className="space-y-4 lg:col-span-2">
        <Card className="bg-muted/30 overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="aspect-video w-full rounded-none" />
          </CardContent>
        </Card>

        {/* Detections List Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-48" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetectionCardSkeleton />
            <DetectionCardSkeleton />
            <DetectionCardSkeleton />
            <DetectionCardSkeleton />
          </div>
        </div>
      </div>

      {/* Right Column: Match List Skeleton */}
      <div className="space-y-4">
        <Skeleton className="mb-4 h-7 w-64" />
        <MatchListSkeleton />
      </div>
    </div>
  );
}
