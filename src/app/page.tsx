'use client';

import Link from 'next/link';
import {
  Aperture,
  Search,
  Upload,
  Database,
  Zap,
  Shield,
  Cpu,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { Button, Card, CardContent } from '@/ui/components';
import { useCatalogStats } from '@/modules/catalog/hooks/useCatalogStats';

export default function Home() {
  const { data: stats, isLoading } = useCatalogStats();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="bg-background relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="relative z-10 container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Next-generation Camera Identification</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Identify Any Security Camera with <span className="text-primary">AI</span>
            </h1>
            <p className="text-muted-foreground mb-10 text-lg sm:text-xl">
              Upload an image of a security camera and our advanced computer vision model will
              instantly find the exact model, manufacturer, and technical specifications.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/identify" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Identify Camera
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/catalog" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 -z-10 h-full w-full opacity-20 dark:opacity-10">
          <div className="bg-primary absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Database className="text-primary mb-2 h-8 w-8" />
              <div className="text-3xl font-bold">
                {isLoading ? '...' : stats?.totalCameras.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-sm">Cameras Indexed</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Shield className="text-primary mb-2 h-8 w-8" />
              <div className="text-3xl font-bold">{isLoading ? '...' : stats?.vendors.length}</div>
              <p className="text-muted-foreground text-sm">Manufacturers</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Cpu className="text-primary mb-2 h-8 w-8" />
              <div className="text-3xl font-bold">YOLOv8</div>
              <p className="text-muted-foreground text-sm">Core Model</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <BarChart3 className="text-primary mb-2 h-8 w-8" />
              <div className="text-3xl font-bold">98.2%</div>
              <p className="text-muted-foreground text-sm">Accuracy</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Our pipeline uses a combination of object detection and feature matching to identify
              hardware with high precision.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">1. Upload</h3>
              <p className="text-muted-foreground">
                Upload a photo or provide a URL of any security camera found in the wild.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">2. Analyze</h3>
              <p className="text-muted-foreground">
                Our YOLOv8 detector locates the camera and extracts visual features for matching.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Aperture className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">3. Identify</h3>
              <p className="text-muted-foreground">
                We match features against our curated catalog of thousands of professional cameras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="container px-4">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Built for Professionals</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              cIDaR is designed for security consultants, forensic investigators, and researchers
              who need reliable equipment identification.
            </p>
            <ul className="space-y-4">
              {[
                'Massive database of Axis, HikVision, Dahua, and more',
                'Detailed technical specifications for every model',
                'Visual similarity search based on deep learning',
                'Datasheet and documentation links included',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-primary/10 text-primary mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Zap className="h-3 w-3" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button asChild variant="link" className="text-primary p-0 hover:no-underline">
                <Link href="/about" className="group flex items-center gap-2">
                  Learn more about the project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-muted/50 relative aspect-video overflow-hidden rounded-2xl border shadow-2xl">
              <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
                <Aperture className="h-24 w-24 opacity-20" />
              </div>
              {/* Optional: Add a screenshot placeholder image here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
