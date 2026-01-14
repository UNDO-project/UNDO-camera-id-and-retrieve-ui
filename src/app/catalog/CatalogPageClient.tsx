'use client';

import { useRouter } from 'next/navigation';
import { CatalogBrowser } from '@/modules/catalog';

export function CatalogPageClient() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <CatalogBrowser onCameraSelect={(camera) => router.push(`/catalog/${camera.cameraId}`)} />
    </div>
  );
}
