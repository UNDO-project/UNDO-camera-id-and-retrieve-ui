import { Metadata } from 'next';
import { CameraDetailClient } from './CameraDetailClient';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Camera Details - ${id} | cIDaR`,
    description: 'View detailed specifications and information for this camera.',
  };
}

export default async function CameraDetailPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <ErrorBoundary>
      <CameraDetailClient id={id} />
    </ErrorBoundary>
  );
}
