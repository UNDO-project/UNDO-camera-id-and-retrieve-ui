import * as React from 'react';
import { ImageUploadZone } from './components/ImageUploadZone';
import { SettingsPanel } from './components/SettingsPanel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Button } from '@/ui/components';
import { useIdentificationService, useImageStore } from '@/container/hooks';
import type { Image, IdentificationParams, IdentificationResult } from '@/primitives';
import { IdentificationFeatureProps } from './types';
import { Loader2, RefreshCw } from 'lucide-react';
import { ErrorState } from '@/modules/common';

export function IdentificationFeature({ onComplete, className }: IdentificationFeatureProps) {
  const identificationService = useIdentificationService();
  const imageStore = useImageStore();

  const [image, setImage] = React.useState<Image | null>(null);
  const [params, setParams] = React.useState<IdentificationParams>({
    topK: 5,
    minSimilarity: 0.3,
  });

  const [status, setStatus] = React.useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [result, setResult] = React.useState<IdentificationResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleImageSelected = async (file: File) => {
    try {
      const storedImage = await imageStore.store(file);
      setImage(storedImage);
      setStatus('idle');
      setResult(null);
      setError(null);
    } catch (err) {
      console.error('Failed to store image', err);
      setError('Failed to process image file.');
    }
  };

  const handleIdentify = async () => {
    if (!image) return;

    setStatus('processing');
    setError(null);

    try {
      const res = await identificationService.identify(image, params);
      setResult(res);
      setStatus('success');
      onComplete?.(res);
    } catch (err: any) {
      console.error('Identification failed', err);
      setStatus('error');
      setError(err.message || 'Failed to identify cameras. Please try again.');
    }
  };

  const handleReset = () => {
    if (image) {
      imageStore.release(image);
    }
    setImage(null);
    setResult(null);
    setStatus('idle');
    setError(null);
  };

  React.useEffect(() => {
    return () => {
      if (image) {
        imageStore.release(image);
      }
    };
  }, [image, imageStore]);

  return (
    <div className={`space-y-8 ${className || ''}`}>
      {!image ? (
        <div className="mx-auto max-w-2xl">
          <ImageUploadZone onImageSelected={handleImageSelected} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header / Controls */}
          <div className="bg-muted/30 flex flex-col items-start justify-between gap-4 rounded-lg p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded bg-black">
                <img src={image.preview} alt="Upload" className="h-full w-full object-cover" />
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
              <Button variant="outline" onClick={handleReset} disabled={status === 'processing'}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Image
              </Button>
              {status !== 'success' && (
                <Button
                  onClick={handleIdentify}
                  disabled={status === 'processing'}
                  className="flex-1 sm:flex-none"
                >
                  {status === 'processing' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Identify Cameras
                </Button>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          {status === 'error' && (
            <ErrorState
              title="Identification Failed"
              error={error || 'Unknown error'}
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

          {/* Settings (Hide when viewing results to reduce clutter, or keep as sidebar?) */}
          {status !== 'success' && status !== 'error' && (
            <div className="mx-auto max-w-2xl">
              <SettingsPanel
                params={params}
                onChange={setParams}
                disabled={status === 'processing'}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
