import { Card, CardContent, Skeleton } from '@/ui/components';

export function DetectionCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="flex gap-3 p-3">
        {/* Image placeholder */}
        <Skeleton className="h-20 w-20 flex-shrink-0 rounded" />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
