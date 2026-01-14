import { Skeleton, Separator, Button } from '@/ui/components';
import { ArrowLeft } from 'lucide-react';

export default function CameraDetailLoading() {
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="text-muted-foreground -ml-2 w-fit gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Button>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-16 w-16 rounded-md" />
            <Skeleton className="h-16 w-16 rounded-md" />
            <Skeleton className="h-16 w-16 rounded-md" />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
