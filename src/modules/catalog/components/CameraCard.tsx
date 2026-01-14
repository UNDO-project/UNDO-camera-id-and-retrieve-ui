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
          <img
            src={camera.imageUrl}
            alt={camera.modelName}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
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
        <div className="text-muted-foreground line-clamp-2 min-h-[2.5em] text-sm">
          {camera.description || 'No description available.'}
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
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
