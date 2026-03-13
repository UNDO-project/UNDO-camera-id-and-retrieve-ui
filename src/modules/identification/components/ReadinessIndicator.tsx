import { ReadinessStatus } from '@/services/interfaces';
import { Badge } from '@/ui/components';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ReadinessIndicatorProps {
  status: ReadinessStatus;
  isLoading?: boolean;
  className?: string;
}

export function ReadinessIndicator({ status, isLoading, className }: ReadinessIndicatorProps) {
  const items = [
    { label: 'Catalog', ready: status.catalogLoaded },
    { label: 'Embeddings', ready: status.embeddingsReady },
    { label: 'Detector', ready: status.detectorReady },
  ];

  const allReady = status.ready;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors duration-500',
        allReady
          ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20'
          : 'border-orange-200 bg-orange-50 dark:border-orange-200 dark:bg-orange-950/20',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1.5 text-sm font-semibold',
          allReady ? 'text-green-800 dark:text-green-200' : 'text-orange-800 dark:text-orange-200'
        )}
      >
        {allReady ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        <span>{allReady ? 'Ready' : 'Initializing'}</span>
        {isLoading && (
          <Loader2
            className={cn(
              'h-3.5 w-3.5 animate-spin',
              allReady ? 'text-green-600' : 'text-orange-600'
            )}
          />
        )}
      </div>

      <div className="bg-border hidden h-4 w-px sm:block" />

      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <Badge
            key={item.label}
            variant={item.ready ? 'default' : 'secondary'}
            className={cn(
              'gap-1.5 text-xs',
              item.ready
                ? 'border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-200'
                : 'border-orange-200 bg-orange-100 text-orange-800 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-200'
            )}
          >
            {item.ready ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <Loader2 className="h-3 w-3 animate-spin" />
            )}
            {item.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
