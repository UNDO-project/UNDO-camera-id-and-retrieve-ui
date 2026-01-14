'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Aperture, Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { useHealthService } from '@/container/hooks';
import { useEffect, useState } from 'react';
import type { HealthStatus } from '@/services/interfaces';
import { cn } from '@/utils/cn';

export function Header() {
  const pathname = usePathname();
  const healthService = useHealthService();
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const status = await healthService.checkHealth();
        setHealth(status);
      } catch (e) {
        setHealth({ status: 'unhealthy', version: 'unknown' });
      }
    };

    // Initial check
    checkHealth();

    // Check every minute
    const interval = setInterval(checkHealth, 60000);
    return () => clearInterval(interval);
  }, [healthService]);

  const navItems = [
    { title: 'Identify', href: '/identify' },
    { title: 'Catalog', href: '/catalog' },
    { title: 'About', href: '/about' },
    { title: 'Docs', href: '/docs' },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center px-4">
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Aperture className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">cIDaR</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:text-foreground/80 transition-colors',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Optional search or other controls */}
          </div>
          <div className="flex items-center gap-2">
            {/* Health Indicator */}
            <div className="bg-muted/50 hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs md:flex">
              <Activity
                className={`h-3.5 w-3.5 ${
                  health?.status === 'healthy' ? 'text-green-500' : 'text-red-500'
                }`}
              />
              <span className="text-muted-foreground">
                {health?.status === 'healthy' ? 'System Online' : 'System Offline'}
              </span>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
