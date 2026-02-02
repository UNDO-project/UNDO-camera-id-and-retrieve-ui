import { Shield, Users, Code, Zap, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components';

export const metadata = {
  title: 'About | cIDaR',
  description: 'Learn about the CCTV Identification and Recognition project.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">About cIDaR</h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          An experimental platform for researching computer vision approaches to CCTV
          identification. cIDaR explores what&apos;s technically possible in mapping surveillance
          hardware.
        </p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">The Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            As surveillance infrastructure expands, understanding what cameras are deployed and
            where becomes essential for public accountability. cIDaR experiments with computer
            vision techniques to identify camera hardware exploring applications in transparency
            research, investigative journalism, and civic technology.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                  <Globe className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Open Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Developing open tools and datasets that researchers, journalists, and civic
                  technologists can use and build upon.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Accountability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Empowering researchers and the public to know exactly what kind of surveillance
                  technology is present in their environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6 pt-8">
          <h2 className="text-3xl font-bold">How It Started</h2>
          <p className="text-muted-foreground leading-relaxed">
            cIDaR started from a simple question: can computer vision reliably identify camera
            models from photos taken in the wild? While software vulnerability databases are common,
            tools for identifying physical surveillance hardware were scarce.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The project grew from scraping manufacturer catalogs and datasheets to building a
            dataset of camera specifications. This powers our experimental identification pipeline—
            testing whether automated hardware recognition is viable for transparency and
            accountability work.
          </p>
        </section>

        <section className="space-y-6 pt-8">
          <h2 className="text-3xl font-bold">The Technology</h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">YOLOv8 Detection</h3>
                <p className="text-muted-foreground">
                  Our detection layer uses a custom-trained YOLOv8 model, experimenting with
                  locating security cameras in diverse environments with varying conditions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Code className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Vector Embeddings</h3>
                <p className="text-muted-foreground">
                  We experiment with deep feature extraction to convert camera images into vectors
                  for similarity matching against our dataset.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Globe className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Open Architecture</h3>
                <p className="text-muted-foreground">
                  The frontend is built with a strictly decoupled &quot;Black Box&quot;
                  architecture, ensuring it can be adapted for web, mobile, or integrated into other
                  tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-8">
          <h2 className="text-3xl font-bold">Potential Applications</h2>
          <p className="text-muted-foreground leading-relaxed">
            While cIDaR is experimental, the techniques explored here could support various
            transparency and accountability efforts:
          </p>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Users className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Investigative Journalism</h3>
                <p className="text-muted-foreground">
                  Documenting surveillance deployments in public spaces for reporting on privacy and
                  civil liberties issues.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Globe className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Urban Transparency</h3>
                <p className="text-muted-foreground">
                  Mapping camera infrastructure to understand how cities are monitored and by what
                  equipment.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Security Research</h3>
                <p className="text-muted-foreground">
                  Identifying camera models to cross-reference with vulnerability databases and
                  security advisories.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
