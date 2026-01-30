'use client';

import Link from 'next/link';
import { Menu, Aperture } from 'lucide-react';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/ui/components';
import { useState, useEffect } from 'react';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-lg font-bold"
          onClick={() => setOpen(false)}
        >
          <Aperture className="h-6 w-6" />
          <span>cIDaR</span>
        </Link>
        <div className="flex flex-col gap-4">
          <Link
            href="/identify"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Identify
          </Link>
          <Link
            href="/video"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Video
          </Link>
          <Link
            href="/video/stream"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Stream
          </Link>
          <Link
            href="/catalog"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Catalog
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Docs
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
