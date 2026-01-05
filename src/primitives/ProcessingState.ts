/**
 * State of an async operation.
 */
export type ProcessingState =
  | { status: 'idle' }
  | { status: 'processing'; progress?: number }
  | { status: 'success' }
  | { status: 'error'; error: Error };
