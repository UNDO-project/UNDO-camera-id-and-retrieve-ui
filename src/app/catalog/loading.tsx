import { Skeleton } from '@/ui/components';
import { CameraCardSkeleton } from '@/modules/catalog/components/CameraCardSkeleton';

export default function CatalogLoading() {
  return (
    <div className="container mx-auto flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-full md:max-w-sm" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </aside>

        <main>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CameraCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
