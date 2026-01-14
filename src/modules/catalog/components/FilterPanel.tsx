import { CatalogFilters, CatalogStats } from '@/primitives';
import { Badge, Button, Separator } from '@/ui/components';
import { Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FilterPanelProps {
  filters: CatalogFilters;
  stats?: CatalogStats;
  onFilterChange: (filters: CatalogFilters) => void;
  className?: string;
}

export function FilterPanel({ filters, stats, onFilterChange, className }: FilterPanelProps) {
  const toggleVendor = (vendor: string) => {
    const nextVendors = filters.vendors.includes(vendor)
      ? filters.vendors.filter((v) => v !== vendor)
      : [...filters.vendors, vendor];
    onFilterChange({ ...filters, vendors: nextVendors });
  };

  const toggleCategory = (category: string) => {
    const nextCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: nextCategories });
  };

  const clearFilters = () => {
    onFilterChange({
      ...filters,
      vendors: [],
      categories: [],
      series: [],
    });
  };

  const hasActiveFilters = filters.vendors.length > 0 || filters.categories.length > 0;

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Filter className="h-4 w-4" />
          Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Vendors
        </h4>
        <div className="flex flex-wrap gap-2">
          {stats?.vendors.map((v) => (
            <Badge
              key={v.name}
              variant={filters.vendors.includes(v.name) ? 'default' : 'secondary'}
              className="cursor-pointer px-2 py-1"
              onClick={() => toggleVendor(v.name)}
              role="button"
              aria-pressed={filters.vendors.includes(v.name)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleVendor(v.name);
                }
              }}
            >
              {v.name} ({v.count})
            </Badge>
          ))}
          {!stats &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-muted h-6 w-16 animate-pulse rounded" />
            ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {stats?.categories.map((c) => (
            <Badge
              key={c.name}
              variant={filters.categories.includes(c.name) ? 'default' : 'secondary'}
              className="cursor-pointer px-2 py-1"
              onClick={() => toggleCategory(c.name)}
              role="button"
              aria-pressed={filters.categories.includes(c.name)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCategory(c.name);
                }
              }}
            >
              {c.name} ({c.count})
            </Badge>
          ))}
          {!stats &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-muted h-6 w-20 animate-pulse rounded" />
            ))}
        </div>
      </div>
    </div>
  );
}
