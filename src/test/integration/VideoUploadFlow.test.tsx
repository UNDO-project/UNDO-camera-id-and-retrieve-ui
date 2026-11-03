import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { VideoUploadFeature } from '@/modules/video';
import { describe, it, expect } from 'vitest';
import { createServices } from '@/services/factory';

describe('Video Upload Flow', () => {
  it('handles full upload lifecycle', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });

    render(<VideoUploadFeature />, { services });

    // 1. Initial State
    expect(screen.getByText(/drop video file here/i)).toBeInTheDocument();

    // 2. Simulate File Drop
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' });

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    } else {
      const dropzone = screen.getByText(/drop video file here/i).closest('div');
      fireEvent.drop(dropzone!, { dataTransfer: { files: [file] } });
    }

    // 3. Verify Queued/Processing State
    await waitFor(() => expect(screen.getByText('test-video.mp4')).toBeInTheDocument());

    // It should eventually show processing progress
    await waitFor(() => expect(screen.queryByText(/Processing.../)).toBeInTheDocument());

    // 4. Verify Completion
    // The mock service takes ~10 seconds to complete (20 steps * 500ms)
    await waitFor(() => expect(screen.getByText(/Completed/)).toBeInTheDocument(), {
      timeout: 15000,
    });

    // 5. Verify Download Button
    expect(screen.getByText(/Download Result/i)).toBeInTheDocument();
  }, 20000); // Increase test timeout to 20s

  it('sends the high quality option when toggled before upload', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });

    render(<VideoUploadFeature />, { services });

    const checkbox = screen.getByLabelText(/h\.264 export/i);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const file = new File(['dummy content'], 'hq-video.mp4', { type: 'video/mp4' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByText('hq-video.mp4')).toBeInTheDocument());
    // The mock service echoes the requested option back in progress
    await waitFor(() => expect(screen.getByText('H.264')).toBeInTheDocument());
  });

  it('does not send high quality by default', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });

    render(<VideoUploadFeature />, { services });

    const file = new File(['dummy content'], 'default-video.mp4', { type: 'video/mp4' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByText('default-video.mp4')).toBeInTheDocument());
    expect(screen.queryByText('H.264')).not.toBeInTheDocument();
  });
});
