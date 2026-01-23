import NextImage from 'next/image';
import { CameraRecord } from '@/primitives';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from '@/ui/components';
import { VendorBadge } from './VendorBadge';
import { cn } from '@/utils/cn';
import { Eye } from 'lucide-react';

interface CameraCardProps {
  camera: CameraRecord;
  onClick?: (camera: CameraRecord) => void;
  className?: string;
}

export function CameraCard({ camera, onClick, className }: CameraCardProps) {
  return (
    <Card
      className={cn(
        'hover:border-primary/50 group flex h-full cursor-pointer flex-col overflow-hidden transition-colors',
        className
      )}
      onClick={() => onClick?.(camera)}
    >
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        {camera.imageUrl ? (
          <NextImage
            src={camera.imageUrl}
            alt={camera.modelName}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="text-muted-foreground bg-secondary/30 flex h-full w-full items-center justify-center">
            <span className="text-sm">No Preview</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <VendorBadge vendor={camera.vendor} />
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="line-clamp-1 text-lg" title={camera.displayName}>
          {camera.displayName}
        </CardTitle>
        <CardDescription className="line-clamp-1">{camera.modelName}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow p-4 pt-2">
        <div className="text-muted-foreground mb-4 line-clamp-2 min-h-[2.5em] text-sm">
          {camera.description || 'No description available.'}
        </div>

        {camera.specs && (
          <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
            {camera.specs.maxResolution && (
              <div>
                <span className="text-muted-foreground block font-medium">Resolution</span>
                {camera.specs.maxResolution}
              </div>
            )}
            {camera.specs.lens && (
              <div>
                <span className="text-muted-foreground block font-medium">Lens</span>
                {camera.specs.lens}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          <span className="bg-secondary inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-gray-500/10 ring-inset">
            {camera.category}
          </span>
          <span className="bg-secondary inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-gray-500/10 ring-inset">
            {camera.productSeries}
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-0">
        <Button
          variant="outline"
          className="group-hover:bg-primary group-hover:text-primary-foreground w-full gap-2 transition-colors"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
