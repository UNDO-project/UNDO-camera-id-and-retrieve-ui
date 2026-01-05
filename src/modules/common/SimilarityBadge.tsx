import * as React from 'react';
import { Badge } from '@/ui/components';
import { cn } from '@/utils/cn';

interface SimilarityBadgeProps {
  score: number;
  className?: string;
}

export function SimilarityBadge({ score, className }: SimilarityBadgeProps) {
  // Format percentage
  const percentage = Math.round(score * 100);

  // Determine variant based on score thresholds
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  let colorClass = '';

  if (score >= 0.8) {
    colorClass = 'bg-green-500 hover:bg-green-600 text-white border-transparent';
  } else if (score >= 0.5) {
    colorClass = 'bg-yellow-500 hover:bg-yellow-600 text-white border-transparent';
  } else {
    variant = 'destructive';
  }

  return (
    <Badge variant={variant} className={cn(colorClass, className)}>
      {percentage}% Match
    </Badge>
  );
}
