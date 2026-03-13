import * as React from 'react';
import NextImage from 'next/image';
import type { IdentificationResult, Detection } from '@/primitives';
import { DetectionCard } from './DetectionCard';
import { MatchList } from './MatchList';
import { BoundingBoxOverlay } from './BoundingBoxOverlay';
import { Card, CardContent } from '@/ui/components';

interface ResultsDisplayProps {
  result: IdentificationResult;
  imagePreview: string;
  imageMetadata: { width: number; height: number };
}

export function ResultsDisplay({ result, imagePreview, imageMetadata }: ResultsDisplayProps) {
  const [selectedDetectionId, setSelectedDetectionId] = React.useState<string | undefined>(
    result.detections[0]?.id
  );

  const selectedDetection = result.detections.find((d) => d.id === selectedDetectionId);
  const selectedMatches = selectedDetection ? result.matches.get(selectedDetection.id) || [] : [];

  const handleSelectDetection = (detection: Detection) => {
    setSelectedDetectionId(detection.id);
  };

  return (
    <div className="space-y-8">
      {/* Top Section: Image + Detections side by side */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
        <Card className="bg-muted/30 overflow-hidden">
          <CardContent className="relative p-0">
            <div className="relative w-full">
              <NextImage
                src={imagePreview}
                alt="Analyzed"
                width={imageMetadata.width}
                height={imageMetadata.height}
                className="block h-auto w-full"
                priority
                unoptimized
              />
              <BoundingBoxOverlay
                detections={result.detections}
                selectedId={selectedDetectionId}
                onSelectDetection={handleSelectDetection}
                imageWidth={imageMetadata.width}
                imageHeight={imageMetadata.height}
              />
            </div>
          </CardContent>
        </Card>

        {/* Detections List */}
        <div className="space-y-2 lg:w-72">
          <h3 className="text-lg font-semibold">Detections ({result.detections.length})</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {result.detections.map((detection) => {
              const bestMatch = result.matches.get(detection.id)?.[0];
              return (
                <DetectionCard
                  key={detection.id}
                  detection={detection}
                  bestMatch={bestMatch}
                  isSelected={detection.id === selectedDetectionId}
                  onClick={() => handleSelectDetection(detection)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Full-width matches */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {selectedDetection
            ? `Matches for ${selectedDetection.label} (${Math.round(selectedDetection.confidence * 100)}%)`
            : 'Select a detection'}
        </h3>

        {selectedDetection ? (
          <MatchList matches={selectedMatches} />
        ) : (
          <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
            Select a detection box on the image or a card below to see matches.
          </div>
        )}
      </div>
    </div>
  );
}
