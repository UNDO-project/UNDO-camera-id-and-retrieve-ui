import { Badge } from '@/ui/components';
import { cn } from '@/utils/cn';

interface VendorBadgeProps {
  vendor: string;
  className?: string;
}

export function VendorBadge({ vendor, className }: VendorBadgeProps) {
  // We could add vendor-specific coloring logic here later
  return (
    <Badge variant="secondary" className={cn('font-medium', className)}>
      {vendor}
    </Badge>
  );
}
