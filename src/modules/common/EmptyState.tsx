import * as React from 'react';
import { FileQuestion } from 'lucide-react';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'No data found',
  description = 'Try adjusting your filters or search query.',
  icon,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'bg-muted/50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center',
        className
      )}
    >
      <div className="bg-background mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        {icon || <FileQuestion className="text-muted-foreground h-6 w-6" />}
      </div>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">{description}</p>
      {children}
    </div>
  );
}
