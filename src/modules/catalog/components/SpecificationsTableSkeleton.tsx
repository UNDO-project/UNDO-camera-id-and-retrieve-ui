import { Skeleton } from '@/ui/components';
import { cn } from '@/utils/cn';

export function SpecificationsTableSkeleton({
  className,
  rows = 5,
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <div className={cn('w-full overflow-hidden rounded-md border', className)}>
      <table className="w-full text-left text-sm">
        <tbody className="divide-y">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className={cn(i % 2 === 0 ? 'bg-background' : 'bg-muted/20')}>
              <td className="w-1/3 p-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="w-2/3 p-3">
                <Skeleton className="h-4 w-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
