'use client';

import { useState, useCallback, useEffect } from 'react';
import type { CatalogBrowserProps } from './types';
import { CatalogFilters } from '@/primitives';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { CameraGrid } from './components/CameraGrid';
import { useCatalogSearch } from './hooks/useCatalogSearch';
import { useCatalogStats } from './hooks/useCatalogStats';
import { ErrorState } from '@/modules/common';
import { toast } from '@/ui/components';

import { Pagination } from './components/Pagination';

export function CatalogBrowser({ initialFilters, onCameraSelect }: CatalogBrowserProps) {
  const [filters, setFilters] = useState<CatalogFilters>({
    searchQuery: '',
    vendors: [],
    categories: [],
    series: [],
    page: 1,
    limit: 20,
    ...initialFilters,
  });

  const { data: stats } = useCatalogStats();
  const {
    data: searchResult,
    isLoading: searchLoading,
    error,
    refetch,
  } = useCatalogSearch(filters.searchQuery, filters);

  const cameras = searchResult?.cameras || [];
  const pagination = searchResult?.pagination;

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load cameras');
    }
  }, [error]);

  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query, page: 1 }));
  }, []);

  const handleFilterChange = useCallback((newFilters: CatalogFilters) => {
    setFilters((prev) => ({ ...newFilters, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Camera Dataset</h1>
          <p className="text-muted-foreground">
            Browse and search our dataset of security cameras.
          </p>
        </div>
        <SearchBar
          value={filters.searchQuery}
          onChange={handleSearchChange}
          className="md:max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <FilterPanel filters={filters} stats={stats} onFilterChange={handleFilterChange} />
        </aside>

        <main>
          {error ? (
            <ErrorState title="Failed to load cameras" error={error} onRetry={() => refetch()} />
          ) : (
            <>
              <CameraGrid
                cameras={cameras}
                isLoading={searchLoading}
                onCameraClick={onCameraSelect}
              />
              {pagination && !searchLoading && cameras.length > 0 && (
                <Pagination
                  page={pagination.page}
                  limit={pagination.limit}
                  total={pagination.total}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
