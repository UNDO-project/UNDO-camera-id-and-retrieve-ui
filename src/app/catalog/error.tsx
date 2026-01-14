'use client';

import { useEffect } from 'react';
import { Button } from '@/ui/components';
import { ErrorState } from '@/modules/common';

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-16">
      <ErrorState
        title="Something went wrong in the catalog"
        error={error.message}
        onRetry={() => reset()}
      />
      <div className="mt-4 flex justify-center">
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
