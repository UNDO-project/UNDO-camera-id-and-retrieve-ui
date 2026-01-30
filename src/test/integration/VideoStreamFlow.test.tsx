import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { VideoStreamFeature } from '@/modules/video';
import { describe, it, expect, vi } from 'vitest';
import { createServices } from '@/services/factory';

describe('Video Stream Flow', () => {
  it('connects and displays stream controls', async () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });

    // We can spy on the mock service to verify calls
    const connectSpy = vi.spyOn(services.videoStream, 'connect');
    const disconnectSpy = vi.spyOn(services.videoStream, 'disconnect');

    // Mock getUserMedia to avoid errors in JSDOM
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: () => [],
        }),
      },
      writable: true,
    });

    // Mock HTMLMediaElement play/pause
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      writable: true,
      value: vi.fn().mockResolvedValue(undefined),
    });

    render(<VideoStreamFeature />, { services });

    // 1. Initial State
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Stream Settings')).toBeInTheDocument();

    // 2. Start Stream
    fireEvent.click(screen.getByText('Start'));

    // Wait for connection (Mock service has a 1s delay)
    // The button changes to "Stop" immediately (connecting state), but is disabled.
    // We must wait for it to become enabled (connected state).
    const stopButton = await screen.findByText('Stop', {}, { timeout: 2000 });
    await waitFor(() => expect(stopButton.closest('button')).not.toBeDisabled(), { timeout: 3000 });

    expect(connectSpy).toHaveBeenCalled();
    expect(screen.getByText('Stop')).toBeInTheDocument();

    // 3. Stop Stream
    fireEvent.click(stopButton);

    expect(disconnectSpy).toHaveBeenCalled();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
