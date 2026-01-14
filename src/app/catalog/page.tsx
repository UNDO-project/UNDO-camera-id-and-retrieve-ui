import { Metadata } from 'next';
import { CatalogPageClient } from './CatalogPageClient';

export const metadata: Metadata = {
  title: 'Camera Catalog | cIDaR',
  description: 'Browse and search our extensive collection of security cameras.',
};

export default function CatalogPage() {
  return <CatalogPageClient />;
}
