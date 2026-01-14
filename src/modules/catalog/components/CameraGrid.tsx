import { CameraRecord } from '@/primitives';
import { CameraCard } from './CameraCard';
import { CameraCardSkeleton } from './CameraCardSkeleton';
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
          <CameraCardSkeleton key={i} />
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
