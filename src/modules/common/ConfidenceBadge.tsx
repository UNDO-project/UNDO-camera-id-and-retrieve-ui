import * as React from 'react';
import { Badge } from '@/ui/components';
import { cn } from '@/utils/cn';

interface ConfidenceBadgeProps {
  score: number;
  className?: string;
}

export function ConfidenceBadge({ score, className }: ConfidenceBadgeProps) {
  const percentage = Math.round(score * 100);

  return (
    <Badge variant="outline" className={cn('font-mono text-xs', className)}>
      CONF: {percentage}%
    </Badge>
  );
}
