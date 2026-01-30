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

  // Start camera when component mounts or when needed
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment',
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Failed to access camera:', err);
      setCameraError('Could not access camera. Please ensure you have granted permission.');
    }
  };

  useFrameCapture({
    videoRef,
    targetFps: config.targetFps,
    enabled: isConnected,
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

  const isConnecting = state.status === 'connecting';
  const isStreamConnected = state.status === 'connected';

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

        {/* Hidden Video Input (for capture) */}
        <video ref={videoRef} className="hidden" muted playsInline />

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
