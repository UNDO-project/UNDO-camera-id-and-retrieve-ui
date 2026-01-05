import type { IResultStore } from '@/services/interfaces';
import type { IdentificationResult } from '@/primitives';

/**
 * Placeholder implementation that does nothing.
 *
 * TODO: Replace with LocalStorageResultStore when save feature is added.
 */
export class NoOpResultStore implements IResultStore {
  async save(result: IdentificationResult): Promise<string> {
    console.warn('NoOpResultStore: save() called but not implemented', result);
    return '';
  }

  async get(id: string): Promise<IdentificationResult | null> {
    console.warn('NoOpResultStore: get() called but not implemented', id);
    return null;
  }

  async list(): Promise<IdentificationResult[]> {
    return [];
  }

  async delete(id: string): Promise<void> {
    console.warn('NoOpResultStore: delete() called but not implemented', id);
  }
}
