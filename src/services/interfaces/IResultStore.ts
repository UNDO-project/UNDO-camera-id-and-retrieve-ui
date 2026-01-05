import type { IdentificationResult } from '@/primitives';

/**
 * Result persistence service.
 *
 * NOTE: Placeholder for future save feature.
 * Current implementation is NoOpResultStore (does nothing).
 *
 * BLACK BOX: Consumers don't know if this uses:
 * - localStorage, IndexedDB, or remote API
 * - Compression, encryption, or plain storage
 */
export interface IResultStore {
  /**
   * Save an identification result.
   *
   * @returns ID of the saved result
   */
  save(result: IdentificationResult): Promise<string>;

  /**
   * Get a saved result by ID.
   */
  get(id: string): Promise<IdentificationResult | null>;

  /**
   * List all saved results.
   */
  list(): Promise<IdentificationResult[]>;

  /**
   * Delete a saved result.
   */
  delete(id: string): Promise<void>;
}
