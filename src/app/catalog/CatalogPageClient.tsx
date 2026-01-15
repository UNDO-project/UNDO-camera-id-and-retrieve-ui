'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/ui/components';

const CatalogBrowser = dynamic(
  () => import('@/modules/catalog').then((mod) => mod.CatalogBrowser),
  {
    loading: () => (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 w-full md:w-1/3" />
          <Skeleton className="h-10 w-full md:w-2/3" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-lg" />
          ))}
        </div>
      </div>
    ),
  }
);

export function CatalogPageClient() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <CatalogBrowser onCameraSelect={(camera) => router.push(`/catalog/${camera.cameraId}`)} />
    </div>
  );
}
