import { Card, CardContent, Skeleton } from '@/ui/components';
import { DetectionCardSkeleton } from './DetectionCardSkeleton';
import { MatchListSkeleton } from './MatchListSkeleton';

export function ResultsDisplaySkeleton() {
  return (
    <div className="space-y-8">
      {/* Top Section: Image + Detections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
        <Card className="bg-muted/30 overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="aspect-video w-full rounded-none" />
          </CardContent>
        </Card>

        {/* Detections List Skeleton */}
        <div className="space-y-2 lg:w-72">
          <Skeleton className="h-7 w-48" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <DetectionCardSkeleton />
            <DetectionCardSkeleton />
            <DetectionCardSkeleton />
            <DetectionCardSkeleton />
          </div>
        </div>
      </div>

      {/* Bottom Section: Match List Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-64" />
        <MatchListSkeleton />
      </div>
    </div>
  );
}
