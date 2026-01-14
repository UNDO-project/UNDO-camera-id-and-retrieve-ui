import { cn } from '@/utils/cn';

interface SpecificationsTableProps {
  specifications: Record<string, any>;
  className?: string;
}

export function SpecificationsTable({ specifications, className }: SpecificationsTableProps) {
  const entries = Object.entries(specifications).filter(([_, value]) => {
    // Filter out empty values or objects (objects should be flattened or handled differently)
    return value !== null && value !== undefined && typeof value !== 'object';
  });

  if (entries.length === 0) {
    return <div className="text-muted-foreground text-sm italic">No specifications available.</div>;
  }

  return (
    <div className={cn('w-full overflow-hidden rounded-md border', className)}>
      <table className="w-full text-left text-sm">
        <tbody className="divide-y">
          {entries.map(([key, value], index) => (
            <tr
              key={key}
              className={cn(
                'hover:bg-muted/50 transition-colors',
                index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
              )}
            >
              <td className="text-muted-foreground w-1/3 p-3 font-medium break-words">
                {formatKey(key)}
              </td>
              <td className="w-2/3 p-3 break-words">{formatValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatKey(key: string): string {
  // Convert camelCase or snake_case to Title Case
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatValue(value: any): string {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
}
