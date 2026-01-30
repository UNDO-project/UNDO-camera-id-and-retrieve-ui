import { Metadata } from 'next';
import { VideoUploadFeature } from '@/modules/video';

export const metadata: Metadata = {
  title: 'Video Processing | cIDaR',
  description: 'Process video files to detect and identify cameras',
};

export default function VideoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Video Processing</h1>
        <p className="text-muted-foreground mb-8">
          Upload a video file to detect and identify cameras frame by frame.
        </p>
        <VideoUploadFeature />
      </div>
    </main>
  );
}
