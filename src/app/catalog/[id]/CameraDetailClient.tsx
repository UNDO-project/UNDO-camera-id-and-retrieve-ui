'use client';

import { useRouter } from 'next/navigation';
import { CameraDetail } from '@/modules/catalog';

interface CameraDetailClientProps {
  id: string;
}

export function CameraDetailClient({ id }: CameraDetailClientProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <CameraDetail cameraId={id} onBack={() => router.push('/catalog')} />
    </div>
  );
}
