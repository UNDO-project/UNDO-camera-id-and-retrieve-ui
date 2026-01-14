import { Terminal, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardDescription } from '@/ui/components';

export const metadata = {
  title: 'API Reference | cIDaR Docs',
  description: 'Detailed information about cIDaR backend endpoints.',
};

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/health',
      description: 'Check service status and version.',
      response: '{ "status": "healthy", "version": "1.0.0" }',
    },
    {
      method: 'POST',
      path: '/api/v1/identify',
      description: 'Upload an image for camera identification.',
      params: 'image (file), top_k (int), min_similarity (float)',
    },
    {
      method: 'GET',
      path: '/api/v1/catalog/stats',
      description: 'Get statistics about the indexed camera catalog.',
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">API Reference</h1>
        <p className="text-muted-foreground text-lg">
          The cIDaR API provides programmatic access to our identification engine and camera
          catalog.
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
              <Card key={ep.path}>
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-bold ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
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

        <section className="bg-primary/5 border-primary/10 rounded-2xl border p-8">
          <div className="flex items-start gap-4">
            <Lock className="text-primary mt-1 h-6 w-6" />
            <div>
              <h3 className="mb-2 text-xl font-bold">Authentication</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The public API endpoints currently do not require authentication for read-only
                access. However, rate limiting is applied based on IP address. For high-volume
                access, please contact the development team for an API key.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
