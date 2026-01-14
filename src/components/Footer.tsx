import Link from 'next/link';
import { Aperture } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Aperture className="h-6 w-6" />
          <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            Built by the UNDO team. The source code is available on{' '}
            <a
              href="https://github.com/undo-team/cctv-scrapers"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="text-muted-foreground flex gap-4 text-sm">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/docs" className="hover:underline">
            Docs
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
