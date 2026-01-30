'use client';

import { Button, Label, Slider, Card } from '@/ui/components';
import { StreamConfig } from '@/primitives';
import { PlayIcon, Square, Settings2Icon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StreamControlsProps {
  isConnected: boolean;
  isConnecting: boolean;
  config: StreamConfig;
  onConfigChange: (config: StreamConfig) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  className?: string;
}

export function StreamControls({
  isConnected,
  isConnecting,
  config,
  onConfigChange,
  onConnect,
  onDisconnect,
  className,
}: StreamControlsProps) {
  const handleFpsChange = (value: number[]) => {
    onConfigChange({ ...config, targetFps: value[0] });
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({ ...config, mode: e.target.checked ? 'full' : 'detect_only' });
  };

  return (
    <Card className={cn('space-y-6 p-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-medium">
          <Settings2Icon className="h-4 w-4" />
          Stream Settings
        </h3>
        <div className="flex items-center gap-2">
          {isConnected || isConnecting ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDisconnect}
              disabled={isConnecting}
              className="gap-1"
            >
              <Square className="h-4 w-4" fill="currentColor" />
              Stop
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={onConnect} className="gap-1">
              <PlayIcon className="h-4 w-4" />
              Start
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Target FPS: {config.targetFps}</Label>
          </div>
          <Slider
            value={[config.targetFps]}
            min={1}
            max={30}
            step={1}
            onValueChange={handleFpsChange}
            disabled={isConnected || isConnecting}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="mode-toggle">Identification Mode</Label>
            <p className="text-muted-foreground text-xs">
              {config.mode === 'full'
                ? 'Detect objects and identify cameras (Slower)'
                : 'Detect objects only (Faster)'}
            </p>
          </div>
          <input
            id="mode-toggle"
            type="checkbox"
            className="text-primary focus:ring-primary h-5 w-5 rounded border-gray-300"
            checked={config.mode === 'full'}
            onChange={handleModeChange}
            disabled={isConnected || isConnecting}
          />
        </div>
      </div>
    </Card>
  );
}
