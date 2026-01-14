import { Shield, Target, Users, Code, Zap, Globe } from 'lucide-react';
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
          The CCTV Identification and Recognition project (cIDaR) is a specialized tool designed to
          bridge the gap between physical security hardware and digital information.
        </p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">The Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            In an increasingly monitored world, identifying the hardware responsible for
            surveillance is crucial for transparency, security audits, and forensic investigations.
            cIDaR aims to provide a highly accurate, automated system for identifying security
            cameras from simple photographs.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Utilizing state-of-the-art computer vision models to distinguish between subtle
                  variations in hardware design.
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
            cIDaR began as a research initiative to catalog the vast landscape of IoT security
            devices. We realized that while there are many databases for software vulnerabilities,
            there was no unified, visual tool for identifying the physical hardware itself.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By scraping thousands of datasheets and manufacturer catalogs, we built the most
            comprehensive dataset of security cameras available, which now powers our identification
            engine.
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
                  Our front-line detector is a custom-trained YOLOv8 model capable of locating
                  security cameras in diverse urban and indoor environments.
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
                  We use deep feature extraction to convert camera images into high-dimensional
                  vectors, allowing for lightning-fast similarity searching against our catalog.
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

        <section className="bg-muted/30 mt-12 rounded-2xl p-8 text-center">
          <Users className="text-primary mx-auto mb-4 h-12 w-12" />
          <h2 className="mb-4 text-2xl font-bold">The Team</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            cIDaR is developed by a distributed team of security researchers, data scientists, and
            engineers committed to improving hardware transparency in the physical security
            industry.
          </p>
        </section>
      </div>
    </div>
  );
}
