import { IdentificationFeature } from '@/modules/identification';
import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Identify Camera - cIDaR',
  description: 'Upload an image to identify CCTV cameras using AI.',
};

export default function IdentifyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Identify Camera</h1>
        <p className="text-muted-foreground">
          Upload an image containing a CCTV camera to find matching models in our catalog.
        </p>
      </div>

      <ErrorBoundary>
        <IdentificationFeature />
      </ErrorBoundary>
    </div>
  );
}
