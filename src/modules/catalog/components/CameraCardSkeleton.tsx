import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@/ui/components';
import { cn } from '@/utils/cn';

export function CameraCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('flex h-full flex-col overflow-hidden', className)}>
      <div className="bg-muted aspect-video w-full">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <CardHeader className="p-4 pb-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
      </CardHeader>

      <CardContent className="flex-grow p-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mt-4 flex gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
