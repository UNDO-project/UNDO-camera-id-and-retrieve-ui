import { Card, Skeleton } from '@/ui/components';

export function MatchListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Image placeholder */}
            <Skeleton className="aspect-video w-full rounded-none sm:aspect-square sm:w-36 md:w-40" />

            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="mb-2 flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="mb-3 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              <div className="mt-2 flex gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
