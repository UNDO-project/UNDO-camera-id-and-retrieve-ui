import { Metadata } from 'next';
import { VideoStreamFeature } from '@/modules/video';

export const metadata: Metadata = {
  title: 'Live Stream | cIDaR',
  description: 'Real-time camera detection on video streams',
};

export default function StreamPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">Live Stream Analysis</h1>
        <p className="text-muted-foreground mb-8">
          Stream video from your camera or a video file for real-time detection.
        </p>
        <VideoStreamFeature />
      </div>
    </main>
  );
}
