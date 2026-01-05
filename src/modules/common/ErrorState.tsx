import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/ui/components';
import { cn } from '@/utils/cn';

interface ErrorStateProps {
  title?: string;
  error?: Error | string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  error,
  onRetry,
  className,
}: ErrorStateProps) {
  const message = typeof error === 'string' ? error : error?.message;

  return (
    <div
      className={cn(
        'bg-destructive/5 flex flex-col items-center justify-center rounded-lg border p-8 text-center',
        className
      )}
    >
      <AlertTriangle className="text-destructive mb-4 h-10 w-10" />
      <h3 className="text-destructive mb-2 text-lg font-semibold">{title}</h3>
      {message && (
        <p className="text-muted-foreground bg-background mb-6 max-w-md rounded border p-3 font-mono text-sm">
          {message}
        </p>
      )}
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}
