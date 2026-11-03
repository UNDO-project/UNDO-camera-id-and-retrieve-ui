import { render, screen } from '@testing-library/react';
import { UploadProgress } from '../UploadProgress';
import type { VideoTaskProgress } from '@/primitives';
import { describe, it, expect } from 'vitest';

const base: VideoTaskProgress = {
  taskId: 'task-1',
  status: 'processing',
  progressPercent: 40,
  framesProcessed: 40,
  framesTotal: 100,
  currentFps: 12,
  elapsedSeconds: 3,
  outputUrl: null,
  error: null,
  filename: 'clip.mp4',
  createdAt: new Date(),
  expiresAt: null,
  options: null,
};

describe('UploadProgress', () => {
  it('shows the download deadline once completed with an expiry', () => {
    const expiresAt = new Date('2026-11-03T12:15:00');
    render(
      <UploadProgress
        progress={{
          ...base,
          status: 'completed',
          outputUrl: '/download',
          expiresAt,
        }}
      />
    );

    const expected = expiresAt.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    expect(
      screen.getByText(new RegExp(`Available for download until ${expected}`))
    ).toBeInTheDocument();
  });

  it('hides the deadline while processing', () => {
    render(<UploadProgress progress={{ ...base, expiresAt: new Date() }} />);

    expect(screen.queryByText(/Available for download until/)).not.toBeInTheDocument();
  });

  it('hides the deadline when completed without an expiry', () => {
    render(<UploadProgress progress={{ ...base, status: 'completed', outputUrl: '/download' }} />);

    expect(screen.queryByText(/Available for download until/)).not.toBeInTheDocument();
  });
});
