import * as React from 'react';
import type { Detection } from '@/primitives';

interface BoundingBoxOverlayProps {
  detections: Detection[];
  onSelectDetection: (detection: Detection) => void;
  selectedId?: string;
  imageWidth: number;
  imageHeight: number;
}

export function BoundingBoxOverlay({
  detections,
  onSelectDetection,
  selectedId,
  imageWidth,
  imageHeight,
}: BoundingBoxOverlayProps) {
  if (!imageWidth || !imageHeight) return null;

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full">
      <svg
        viewBox={`0 0 ${imageWidth} ${imageHeight}`}
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        {detections.map((detection) => {
          const { x_min, y_min, x_max, y_max } = detection.bbox;
          const width = x_max - x_min;
          const height = y_max - y_min;
          const isSelected = detection.id === selectedId;

          return (
            <g
              key={detection.id}
              className="pointer-events-auto cursor-pointer focus:outline-none"
              onClick={() => onSelectDetection(detection)}
              role="button"
              aria-label={`Select detection: ${detection.label} (${Math.round(detection.confidence * 100)}% confidence)`}
              aria-pressed={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectDetection(detection);
                }
              }}
            >
              <rect
                x={x_min}
                y={y_min}
                width={width}
                height={height}
                fill="transparent"
                stroke={isSelected ? '#2563eb' : '#ef4444'}
                strokeWidth={Math.max(2, imageWidth * 0.005)} // Scale stroke with image
                className="hover:stroke-primary transition-all hover:stroke-[3px]"
              />
              <rect
                x={x_min}
                y={y_min - imageHeight * 0.05}
                width={width}
                height={imageHeight * 0.05}
                fill={isSelected ? '#2563eb' : '#ef4444'}
                className="transition-colors"
              />
              <text
                x={x_min + width * 0.05}
                y={y_min - imageHeight * 0.015}
                fill="white"
                fontSize={imageHeight * 0.03}
                fontWeight="bold"
                className="pointer-events-none"
              >
                {Math.round(detection.confidence * 100)}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
