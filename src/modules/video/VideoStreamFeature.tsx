'use client';

import { useRef, useState } from 'react';
import { useVideoStream, useFrameCapture } from './hooks';
import { StreamDisplay } from './components/StreamDisplay';
import { StreamControls } from './components/StreamControls';
import type { StreamConfig } from '@/primitives';
import { cn } from '@/utils/cn';
import { Card } from '@/ui/components';
import { AlertCircleIcon } from 'lucide-react';

interface VideoStreamFeatureProps {
  className?: string;
}

export function VideoStreamFeature({ className }: VideoStreamFeatureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [config, setConfig] = useState<StreamConfig>({
    mode: 'detect_only',
    targetFps: 15,
  });
  const [cameraError, setCameraError] = useState<string | null>(null);

  const { state, connect, disconnect, sendFrame, latestFrame } = useVideoStream({
    config,
    autoConnect: false,
  });

  const isConnecting = state.status === 'connecting';
  const isStreamConnected = state.status === 'connected';

  // Start camera when component mounts or when needed
  const startCamera = async () => {
    try {
      setCameraError(null);

      // Check if mediaDevices API is available (requires secure context)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          'Camera API not available. Please ensure you are using HTTPS or localhost.'
        );
      }

      // Check if any video input devices exist
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      console.log('Found video devices:', videoDevices);

      if (videoDevices.length === 0) {
        throw new Error('No camera found on this device.');
      }

      let stream: MediaStream | null = null;

      // Try to get rear camera first (skip complex constraints on Firefox)
      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

      if (!isFirefox) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: { ideal: 'environment' },
            },
          });
        } catch (err) {
          console.warn('Failed to get preferred camera, will try fallback...', err);
        }
      }

      // Fallback to simple constraints (or primary for Firefox)
      if (!stream) {
        console.log('Attempting simple video constraints...');
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      }

      console.log('Got stream:', stream);
      console.log('Stream tracks:', stream.getVideoTracks());

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        console.log('Video playing, readyState:', videoRef.current.readyState);
      }
    } catch (err) {
      console.error('Failed to access camera:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);

      // Provide more specific error messages
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        setCameraError(
          'Camera permission denied. Please allow camera access in your browser settings.'
        );
      } else if (errorMessage.includes('NotFoundError') || errorMessage.includes('not be found')) {
        setCameraError('No camera found. Please connect a camera and try again.');
      } else if (errorMessage.includes('NotReadableError')) {
        setCameraError(
          'Camera is in use by another application. Please close other apps using the camera.'
        );
      } else {
        setCameraError(
          errorMessage ||
            'Could not access camera. Please ensure you have granted permission and a camera is available.'
        );
      }
    }
  };

  useFrameCapture({
    videoRef,
    targetFps: config.targetFps,
    enabled: isStreamConnected,
    onCapture: sendFrame,
  });

  const handleConnect = async () => {
    // Ensure camera is running before connecting
    if (!videoRef.current?.srcObject) {
      await startCamera();
    }
    // Only connect if camera started successfully
    if (!cameraError) {
      await connect();
    }
  };

  return (
    <div className={cn('grid gap-6 lg:grid-cols-[1fr_300px]', className)}>
      <div className="space-y-4">
        {/* Main Display */}
        <div className="relative">
          <StreamDisplay frame={latestFrame} isConnected={isStreamConnected || isConnecting} />

          {/* Error Overlay */}
          {(state.status === 'error' || cameraError) && (
            <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center p-6">
              <Card className="border-destructive/50 bg-destructive/5 max-w-md p-6">
                <div className="text-destructive mb-2 flex items-center gap-2">
                  <AlertCircleIcon className="h-5 w-5" />
                  <h3 className="font-medium">Stream Error</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {cameraError ||
                    (state.status === 'error' && state.error?.message) ||
                    'Connection failed'}
                </p>
                <button
                  onClick={() => {
                    disconnect();
                    setCameraError(null);
                  }}
                  className="mt-4 text-sm font-medium underline underline-offset-4"
                >
                  Close
                </button>
              </Card>
            </div>
          )}
        </div>

        {/* Video Input (for capture) - small preview for debugging */}
        <video
          ref={videoRef}
          className="aspect-video w-48 rounded border border-dashed opacity-50"
          muted
          playsInline
          autoPlay
        />

        {/* Local Preview (optional, helpful for debugging) */}
        {/* <div className="w-48 aspect-video bg-black rounded overflow-hidden opacity-50">
          <video 
            ref={(el) => {
              // Hack to allow dual ref usage if needed, but for now just using the hidden one is fine.
              // We'd need to clone the stream to show it here if we wanted.
            }} 
            autoPlay 
            muted 
            className="w-full h-full object-cover" 
          />
        </div> */}
      </div>

      <div>
        <StreamControls
          isConnected={isStreamConnected}
          isConnecting={isConnecting}
          config={config}
          onConfigChange={setConfig}
          onConnect={handleConnect}
          onDisconnect={disconnect}
        />

        {/* Stats could go here */}
      </div>
    </div>
  );
}
