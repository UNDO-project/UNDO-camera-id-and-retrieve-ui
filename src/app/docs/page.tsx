import Link from 'next/link';
import { BookOpen, Rocket, Cpu, Code, ArrowRight, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@/ui/components';

export const metadata = {
  title: 'Documentation | cIDaR',
  description: 'Technical documentation for the CCTV Identification and Recognition project.',
};

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Learn how to set up the project locally and understand the core concepts.',
      icon: Rocket,
      href: '/docs/getting-started',
      color: 'text-blue-500',
    },
    {
      title: 'Identification Pipeline',
      description: 'Deep dive into the computer vision pipeline from detection to matching.',
      icon: Cpu,
      href: '/docs/pipeline',
      color: 'text-purple-500',
    },
    {
      title: 'API Reference',
      description: 'Detailed information about the backend endpoints and data structures.',
      icon: Code,
      href: '/docs/api',
      color: 'text-green-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to the technical documentation for cIDaR. Here you will find everything you need
          to understand, contribute to, or integrate with the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <section.icon className={`h-10 w-10 ${section.color} mb-2`} />
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
                <Link href={section.href} className="flex items-center gap-2">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FileText className="h-6 w-6" />
            Project Architecture
          </h2>
          <p className="text-muted-foreground">
            cIDaR follows a strict <strong>Black Box Architecture</strong> designed for maximum
            replaceability and platform independence. This ensures that the frontend remains
            isolated from the specifics of the backend implementation.
          </p>
          <div className="space-y-4">
            {[
              'Primitives: Immutable core data structures.',
              'Services: Interface-driven business logic.',
              'Platform: Abstraction for Web vs Mobile APIs.',
              'UI: Headless logic separated from visual renderers.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <Button asChild variant="outline">
            <Link href="https://github.com/your-repo/docs/architecture" target="_blank">
              View Architecture Plan
            </Link>
          </Button>
        </div>

        <div className="bg-muted/30 rounded-2xl border p-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="h-6 w-6" />
            Quick Reference
          </h2>
          <div className="space-y-4">
            <div className="bg-background rounded-lg border p-4">
              <p className="text-muted-foreground mb-1 font-mono text-xs uppercase">
                Frontend Stack
              </p>
              <p className="text-sm font-medium">
                Next.js 15+, TypeScript, Tailwind CSS, Shadcn/UI
              </p>
            </div>
            <div className="bg-background rounded-lg border p-4">
              <p className="text-muted-foreground mb-1 font-mono text-xs uppercase">
                Backend Stack
              </p>
              <p className="text-sm font-medium">FastAPI, YOLOv8, PyTorch, FAISS (Vector DB)</p>
            </div>
            <div className="bg-background rounded-lg border p-4">
              <p className="text-muted-foreground mb-1 font-mono text-xs uppercase">Deployment</p>
              <p className="text-sm font-medium">Vercel (Frontend), Docker/Cloud Run (Backend)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
