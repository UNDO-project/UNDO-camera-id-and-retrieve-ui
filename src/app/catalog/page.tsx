import { Metadata } from 'next';
import { CatalogPageClient } from './CatalogPageClient';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Camera Catalog | cIDaR',
  description: 'Browse and search our dataset of security cameras.',
};

export default function CatalogPage() {
  return (
    <ErrorBoundary>
      <CatalogPageClient />
    </ErrorBoundary>
  );
}
