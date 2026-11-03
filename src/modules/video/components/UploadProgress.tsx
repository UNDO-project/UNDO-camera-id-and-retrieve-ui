'use client';

import { VideoTaskProgress } from '@/primitives';
import { Progress, Badge, Card, Button } from '@/ui/components';
import { cn } from '@/utils/cn';
import { DownloadIcon, Loader2Icon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

interface UploadProgressProps {
  progress: VideoTaskProgress;
  onDownload?: () => void;
  onReset?: () => void;
  className?: string;
}

export function UploadProgress({ progress, onDownload, onReset, className }: UploadProgressProps) {
  const isProcessing = progress.status === 'processing' || progress.status === 'queued';
  const isCompleted = progress.status === 'completed';
  const isFailed = progress.status === 'failed';
  const expiresAt = isCompleted ? progress.expiresAt : null;

  return (
    <Card className={cn('p-6', className)}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="max-w-50 truncate font-medium sm:max-w-md" title={progress.filename}>
            {progress.filename}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {isProcessing &&
              `Processing... ${progress.framesProcessed} / ${progress.framesTotal} frames`}
            {isCompleted && 'Processing complete'}
            {isFailed && 'Processing failed'}
          </p>
          {expiresAt && (
            <p className="text-muted-foreground mt-1 text-xs">
              Available for download until {formatTime(expiresAt)}. The file is then deleted from
              the server.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {progress.options?.highQuality && <Badge variant="outline">H.264</Badge>}
          <StatusBadge status={progress.status} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>{progress.progressPercent.toFixed(0)}%</span>
          {isProcessing && <span>{progress.currentFps.toFixed(1)} FPS</span>}
        </div>
        <Progress value={progress.progressPercent} className="h-2" />
      </div>

      {progress.error && (
        <div className="bg-destructive/10 text-destructive mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{progress.error}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end gap-2">
        {onReset && (
          <Button variant="ghost" onClick={onReset}>
            Start Over
          </Button>
        )}

        {isCompleted && progress.outputUrl && (
          <Button onClick={onDownload} className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            Download Result
          </Button>
        )}
      </div>
    </Card>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'queued':
      return <Badge variant="secondary">Queued</Badge>;
    case 'processing':
      return (
        <Badge variant="default" className="gap-1">
          <Loader2Icon className="h-3 w-3 animate-spin" />
          Processing
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="default" className="gap-1 bg-green-600 hover:bg-green-700">
          <CheckCircleIcon className="h-3 w-3" />
          Completed
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircleIcon className="h-3 w-3" />
          Failed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
