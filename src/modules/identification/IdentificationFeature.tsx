'use client';
import * as React from 'react';
import NextImage from 'next/image';
import { ImageUploadZone } from './components/ImageUploadZone';
import { SettingsPanel } from './components/SettingsPanel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ResultsDisplaySkeleton } from './components/ResultsDisplaySkeleton';
import { ReadinessIndicator } from './components/ReadinessIndicator';
import { Button, toast } from '@/ui/components';
import { useIdentification } from './hooks/useIdentification';
import { useImageUpload } from './hooks/useImageUpload';
import { useReadiness } from '@/modules/common/hooks/useReadiness';
import type { IdentificationParams } from '@/primitives';
import { IdentificationFeatureProps } from './types';
import { Loader2, RefreshCw } from 'lucide-react';
import { ErrorState } from '@/modules/common';

export function IdentificationFeature({ onComplete, className }: IdentificationFeatureProps) {
  const { image, error: uploadError, handleImageSelected, clearImage } = useImageUpload();
  const identificationMutation = useIdentification();
  const { data: readiness, isLoading: isReadinessLoading } = useReadiness();

  const [params, setParams] = React.useState<IdentificationParams>({
    topK: 5,
    minSimilarity: 0.3,
  });

  // Derived state from mutation
  const status = identificationMutation.status;
  const result = identificationMutation.data;
  const apiError = identificationMutation.error;

  const handleIdentify = () => {
    if (!image) return;
    identificationMutation.mutate(
      { image, params },
      {
        onSuccess: (data) => {
          onComplete?.(data);
          toast.success('Identification complete');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Identification failed');
        },
      }
    );
  };

  const handleReset = () => {
    clearImage();
    identificationMutation.reset();
  };

  // Cleanup image on unmount
  React.useEffect(() => {
    return () => {
      // clearImage handles cleanup but we need to ensure it runs on unmount
    };
  }, []);

  const isSystemReady = readiness?.ready ?? false;

  return (
    <div className={`grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr_300px] ${className || ''}`}>
      {/* Left Sidebar */}
      <div className="order-last space-y-6 lg:order-first">
        {readiness && (
          <div className="sticky top-20">
            <ReadinessIndicator status={readiness} isLoading={isReadinessLoading} />
          </div>
        )}
      </div>

      {/* Main Column */}
      <div className="flex flex-col">
        {!image ? (
          <div className="flex min-h-[60vh] flex-1 flex-col justify-center py-12">
            <div className="mx-auto w-full max-w-2xl space-y-4">
              <ImageUploadZone onImageSelected={handleImageSelected} disabled={!isSystemReady} />
              {uploadError && <ErrorState title="Upload Failed" error={uploadError} />}
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-4xl space-y-6 pt-4">
            {/* Header / Controls */}
            <div className="bg-muted/30 flex flex-col items-start justify-between gap-4 rounded-lg p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded bg-black">
                  <NextImage
                    src={image.preview}
                    alt="Upload"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-medium">{image.file.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {image.metadata.width}x{image.metadata.height} •{' '}
                    {(image.metadata.size / 1024).toFixed(0)}KB
                  </p>
                </div>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <Button variant="outline" onClick={handleReset} disabled={status === 'pending'}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  New Image
                </Button>
                {status !== 'success' && (
                  <Button
                    onClick={handleIdentify}
                    disabled={status === 'pending' || !isSystemReady}
                    className="flex-1 sm:flex-none"
                  >
                    {status === 'pending' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Identify Cameras
                  </Button>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            {status === 'pending' && <ResultsDisplaySkeleton />}

            {status === 'error' && (
              <ErrorState
                title="Identification Failed"
                error={apiError instanceof Error ? apiError.message : 'Unknown error'}
                onRetry={handleIdentify}
              />
            )}

            {status === 'success' && result && (
              <ResultsDisplay
                result={result}
                imagePreview={image.preview}
                imageMetadata={image.metadata}
              />
            )}

            {/* Settings */}
            {status !== 'success' && status !== 'error' && (
              <div className="mx-auto w-full max-w-2xl">
                <SettingsPanel
                  params={params}
                  onChange={setParams}
                  disabled={status === 'pending'}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Spacer (Hidden on mobile) */}
      <div className="hidden lg:block" aria-hidden="true" />
    </div>
  );
}
