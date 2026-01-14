'use client';

import { useEffect, useState } from 'react';
import { useCatalogService } from '@/container/hooks';
import { CameraRecord } from '@/primitives';
import { CameraDetailProps } from './types';
import { SpecificationsTable } from './components/SpecificationsTable';
import { SpecificationsTableSkeleton } from './components/SpecificationsTableSkeleton';
import { VendorBadge } from './components/VendorBadge';
import { CameraCard } from './components/CameraCard';
import { ImageViewer } from '@/modules/common/ImageViewer';
import { ErrorState } from '@/modules/common/ErrorState';
import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Skeleton,
  Badge,
  toast,
} from '@/ui/components';
import { ArrowLeft, FileText, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export function CameraDetail({ cameraId, onBack }: CameraDetailProps) {
  const catalogService = useCatalogService();
  const [camera, setCamera] = useState<CameraRecord | null>(null);
  const [related, setRelated] = useState<CameraRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await catalogService.getCamera(cameraId);
        if (mounted) {
          setCamera(data);
          setActiveImageIndex(0); // Reset image index

          // Fetch related cameras (by series if available, else category)
          try {
            const relatedData = await catalogService.getRelatedCameras(
              cameraId,
              data.productSeries ? 'series' : 'category'
            );
            if (mounted) setRelated(relatedData);
          } catch (e) {
            console.warn('Failed to load related cameras', e);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load camera details');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (cameraId) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, [cameraId, catalogService]);

  if (loading) {
    return <DetailSkeleton onBack={onBack} />;
  }

  if (error || !camera) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Button>
        <ErrorState
          title="Camera Not Found"
          error={error || 'The requested camera could not be loaded.'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const allImages =
    camera.images && camera.images.length > 0
      ? camera.images
      : camera.imageUrl
        ? [camera.imageUrl]
        : [];

  const currentImageUrl = allImages[activeImageIndex];

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground -ml-2 w-fit gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{camera.modelName}</h1>
              <VendorBadge vendor={camera.vendor} />
              <Badge variant="outline">{camera.category}</Badge>
            </div>
            <p className="text-muted-foreground text-lg">{camera.displayName}</p>
          </div>

          <div className="flex gap-2">
            {camera.datasheetUrl && (
              <Button asChild variant="outline">
                <a href={camera.datasheetUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Datasheet
                </a>
              </Button>
            )}
            {/* Placeholder for future actions like "Add to Compare" */}
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Images */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-muted/10 flex aspect-square items-center justify-center overflow-hidden rounded-lg border">
            {currentImageUrl ? (
              <ImageViewer
                src={currentImageUrl}
                alt={camera.modelName}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-muted-foreground flex flex-col items-center">
                <ImageIcon className="mb-2 h-16 w-16 opacity-50" />
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={cn(
                    'relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-all',
                    activeImageIndex === idx
                      ? 'ring-primary border-primary ring-2'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`View ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Specs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {camera.description || 'No description available for this model.'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Product Series</h4>
                  <p className="text-muted-foreground">{camera.productSeries || 'N/A'}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Category</h4>
                  <p className="text-muted-foreground">
                    {camera.productCategory || camera.category || 'N/A'}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <SpecificationsTable specifications={camera.specifications} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Cameras */}
      {related.length > 0 && (
        <div className="space-y-4 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Related Cameras</h2>
            <Badge variant="secondary" className="text-xs">
              {camera.productSeries
                ? `Series: ${camera.productSeries}`
                : `Category: ${camera.category}`}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map((rel) => (
              <CameraCard
                key={rel.cameraId}
                camera={rel}
                // Note: We'd likely want to navigate to the new ID here.
                // The parent handling onBack/navigation handles this,
                // or we'd emit an event if CameraCard supports it.
                // For this implementations, purely presentational.
                onClick={() => {
                  // Assuming the parent (CatalogPage) will treat this click
                  // by checking URL changes or we could expose onCameraSelect to CameraDetail props.
                  // But per spec, CameraDetail just shows detail.
                  // Ideally we'd link to /catalog/[id]
                  window.location.href = `/catalog/${rel.cameraId}`;
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSkeleton({ onBack }: { onBack?: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground -ml-2 w-fit gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Button>
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Skeleton className="h-96 w-full rounded-lg" />
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-10 w-full max-w-md" />
          <SpecificationsTableSkeleton rows={8} />
        </div>
      </div>
    </div>
  );
}
