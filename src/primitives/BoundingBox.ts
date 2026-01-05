/**
 * Axis-aligned bounding box coordinates.
 */
export interface BoundingBox {
  x_min: number; // Left edge (inclusive)
  y_min: number; // Top edge (inclusive)
  x_max: number; // Right edge (exclusive)
  y_max: number; // Bottom edge (exclusive)
}
