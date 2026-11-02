import { Terminal, Globe, Lock, Radio } from 'lucide-react';
import { Card, CardContent, CardHeader, CardDescription } from '@/ui/components';

export const metadata = {
  title: 'API Reference | cIDaR Docs',
  description: 'Detailed information about cIDaR backend endpoints.',
};

export default function ApiDocsPage() {
  const endpoints = [
    // Health
    {
      method: 'GET',
      path: '/api/v1/health',
      description: 'Basic health check endpoint.',
      category: 'Health',
    },
    {
      method: 'GET',
      path: '/api/v1/health/ready',
      description: 'Readiness check including catalog, embeddings, and detector status.',
      category: 'Health',
    },
    // Identification
    {
      method: 'POST',
      path: '/api/v1/identify',
      description: 'Upload an image for camera detection and identification.',
      params: 'image (file), top_k (int, 1-20), min_similarity (float, 0-1)',
      category: 'Identification',
    },
    // Video Processing
    {
      method: 'POST',
      path: '/api/v1/process-video',
      description: 'Upload a video file for frame-by-frame camera detection.',
      params: 'file (video), options (JSON: target_fps, identification_mode, high_quality)',
      category: 'Video',
    },
    {
      method: 'GET',
      path: '/api/v1/video-status/{task_id}',
      description: 'Get progress of a video processing task.',
      category: 'Video',
    },
    {
      method: 'GET',
      path: '/api/v1/video-download/{task_id}',
      description: 'Download the processed video file.',
      category: 'Video',
    },
    {
      method: 'DELETE',
      path: '/api/v1/video-task/{task_id}',
      description: 'Delete a video processing task and its files.',
      category: 'Video',
    },
    // Catalog
    {
      method: 'GET',
      path: '/api/v1/catalog/stats',
      description: 'Get statistics about the camera catalog.',
      category: 'Catalog',
    },
    {
      method: 'GET',
      path: '/api/v1/catalog/cameras',
      description: 'List cameras with pagination and filtering.',
      params: 'page, limit, vendor, category, series, search',
      category: 'Catalog',
    },
    {
      method: 'GET',
      path: '/api/v1/catalog/cameras/{camera_id}',
      description: 'Get full details for a specific camera.',
      category: 'Catalog',
    },
    {
      method: 'GET',
      path: '/api/v1/catalog/facets',
      description: 'Get available filter options with counts.',
      category: 'Catalog',
    },
    {
      method: 'POST',
      path: '/api/v1/catalog/reload',
      description: 'Reload the catalog and embeddings (admin).',
      category: 'Catalog',
    },
    // Streaming
    {
      method: 'GET',
      path: '/api/v1/stream/stats',
      description: 'Get WebSocket streaming statistics.',
      category: 'Streaming',
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">API Reference</h1>
        <p className="text-muted-foreground text-lg">
          The cIDaR API provides experimental endpoints for camera identification, video processing,
          and catalog access. These endpoints power the frontend and can be used for integration
          testing.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Globe className="text-primary h-6 w-6" />
            Base URL
          </h2>
          <div className="bg-muted rounded-lg border p-4 font-mono text-sm">
            {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
          </div>
        </section>

        <section>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Terminal className="text-primary h-6 w-6" />
            Endpoints
          </h2>
          <div className="space-y-6">
            {endpoints.map((ep) => (
              <Card key={ep.path + ep.method}>
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-bold ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : ep.method === 'POST'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <code className="text-sm font-bold">{ep.path}</code>
                  </div>
                  <CardDescription>{ep.description}</CardDescription>
                </CardHeader>
                {ep.params && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase">
                      Parameters
                    </p>
                    <code className="text-xs">{ep.params}</code>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted/30 rounded-2xl border p-8">
          <div className="flex items-start gap-4">
            <Radio className="text-primary mt-1 h-6 w-6" />
            <div>
              <h3 className="mb-2 text-xl font-bold">WebSocket Streaming</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Real-time video streaming uses WebSocket connections at{' '}
                <code className="bg-muted rounded px-1">ws://host/api/v1/stream</code>. Clients send
                video frames as base64-encoded images and receive detection results in real-time.
                See the Stream page for interactive testing.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 border-primary/10 rounded-2xl border p-8">
          <div className="flex items-start gap-4">
            <Lock className="text-primary mt-1 h-6 w-6" />
            <div>
              <h3 className="mb-2 text-xl font-bold">Authentication</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                These experimental API endpoints do not require authentication. Rate limiting may be
                applied based on IP address. For research collaborations or high-volume access,
                reach out to discuss options.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
