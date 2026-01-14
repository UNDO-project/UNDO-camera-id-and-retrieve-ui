import { CameraRecord } from '@/primitives';
import { CameraCard } from './CameraCard';
import { Skeleton } from '@/ui/components';
import { EmptyState } from '@/modules/common';

interface CameraGridProps {
  cameras: CameraRecord[];
  onCameraClick?: (camera: CameraRecord) => void;
  isLoading?: boolean;
}

export function CameraGrid({ cameras, onCameraClick, isLoading }: CameraGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex h-[350px] flex-col space-y-4 rounded-xl border p-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="mt-auto pt-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cameras.length === 0) {
    return (
      <EmptyState
        title="No cameras found"
        description="Try adjusting your search or filters to find what you're looking for."
        className="min-h-[400px]"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cameras.map((camera) => (
        <CameraCard key={camera.cameraId} camera={camera} onClick={onCameraClick} />
      ))}
    </div>
  );
}
