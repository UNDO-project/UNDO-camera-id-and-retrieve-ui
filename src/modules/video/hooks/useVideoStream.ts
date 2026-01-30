import { useCallback, useEffect, useRef, useState } from 'react';
import { useVideoStreamService } from '@/container/hooks';
import type { StreamConfig, StreamFrame, StreamState } from '@/primitives';

interface UseVideoStreamOptions {
  config: StreamConfig;
  onFrame?: (frame: StreamFrame) => void;
  autoConnect?: boolean;
}

interface UseVideoStreamReturn {
  state: StreamState;
  fps: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendFrame: (frameData: ArrayBuffer) => void;
  latestFrame: StreamFrame | null;
}

export function useVideoStream(options: UseVideoStreamOptions): UseVideoStreamReturn {
  const service = useVideoStreamService();
  const [state, setState] = useState<StreamState>(service.getState());
  const [latestFrame, setLatestFrame] = useState<StreamFrame | null>(null);
  const onFrameRef = useRef(options.onFrame);

  // Keep callback ref updated
  useEffect(() => {
    onFrameRef.current = options.onFrame;
  }, [options.onFrame]);

  // Subscribe to state changes
  useEffect(() => {
    return service.onStateChange(setState);
  }, [service]);

  // Subscribe to frames
  useEffect(() => {
    return service.onFrame((frame) => {
      setLatestFrame(frame);
      onFrameRef.current?.(frame);
    });
  }, [service]);

  // Auto-connect if enabled
  useEffect(() => {
    if (options.autoConnect) {
      service.connect(options.config).catch(console.error);
    }

    return () => {
      service.disconnect();
    };
  }, [options.autoConnect, options.config, service]);

  const connect = useCallback(async () => {
    await service.connect(options.config);
  }, [service, options.config]);

  const disconnect = useCallback(() => {
    service.disconnect();
  }, [service]);

  const sendFrame = useCallback(
    (frameData: ArrayBuffer) => {
      service.sendFrame(frameData);
    },
    [service]
  );

  const fps = state.status === 'connected' ? state.fps : 0;

  return {
    state,
    fps,
    connect,
    disconnect,
    sendFrame,
    latestFrame,
  };
}
