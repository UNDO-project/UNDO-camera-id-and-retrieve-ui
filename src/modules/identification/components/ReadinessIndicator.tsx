import { ReadinessStatus } from '@/services/interfaces';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/ui/components';
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ReadinessIndicatorProps {
  status: ReadinessStatus;
  isLoading?: boolean;
  className?: string;
}

export function ReadinessIndicator({ status, isLoading, className }: ReadinessIndicatorProps) {
  const items = [
    { label: 'Catalog Index', ready: status.catalogLoaded },
    { label: 'Vector Embeddings', ready: status.embeddingsReady },
    { label: 'Object Detector', ready: status.detectorReady },
  ];

  const allReady = status.ready;

  return (
    <Card
      className={cn(
        'transition-colors duration-500',
        allReady
          ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20'
          : 'border-orange-200 bg-orange-50 dark:border-orange-200 dark:bg-orange-950/20',
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle
            className={cn(
              'flex items-center gap-2 text-base',
              allReady
                ? 'text-green-800 dark:text-green-200'
                : 'text-orange-800 dark:text-orange-200'
            )}
          >
            {allReady ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {allReady ? 'System Ready' : 'System Initializing'}
          </CardTitle>
          {isLoading && (
            <Loader2
              className={cn(
                'h-4 w-4 animate-spin',
                allReady ? 'text-green-600' : 'text-orange-600'
              )}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="bg-background/60 flex items-center justify-between rounded-md border p-2 px-3"
            >
              <span className="text-sm font-medium">{item.label}</span>
              {item.ready ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">Loading...</span>
                  <Loader2 className="h-3 w-3 animate-spin text-amber-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
