import { useRouter, usePathname } from 'next/navigation';
import type { INavigationAdapter } from '@/platform/interfaces';

export class NextNavigationAdapter implements INavigationAdapter {
  private router: ReturnType<typeof useRouter>;
  private pathname: string;

  constructor(router: ReturnType<typeof useRouter>, pathname: string) {
    this.router = router;
    this.pathname = pathname;
  }

  navigate(route: string, params?: Record<string, any>): void {
    if (params) {
      const searchParams = new URLSearchParams(params);
      this.router.push(`${route}?${searchParams.toString()}`);
    } else {
      this.router.push(route);
    }
  }

  goBack(): void {
    this.router.back();
  }

  getCurrentRoute(): string {
    return this.pathname;
  }
}
