import type { IPlatformAdapter, INavigationAdapter } from './interfaces';
import { WebPlatformAdapter } from './web/WebPlatformAdapter';
// import { MobilePlatformAdapter } from './mobile/MobilePlatformAdapter'; // Future

export function createPlatformAdapter(platform: 'web' | 'mobile'): IPlatformAdapter {
  if (platform === 'web') {
    return new WebPlatformAdapter();
  }
  throw new Error(`Platform ${platform} not implemented`);
}

// Note: Navigation adapter is usually created inside a React component or hook
// because it depends on hooks like useRouter.
// This factory might be used in a Context Provider.
export function createNavigationAdapter(
  platform: 'web' | 'mobile',
  ...args: any[]
): INavigationAdapter {
  // Implementation depends on how we inject it.
  // For now, we'll leave it as a placeholder or handle it in the ServiceContainer.
  throw new Error(
    'Navigation adapter creation should be handled in React Context due to hook dependencies.'
  );
}
