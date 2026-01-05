/**
 * Navigation/routing adapter.
 *
 * Web: Uses Next.js router
 * Mobile: Uses React Navigation
 */
export interface INavigationAdapter {
  /**
   * Navigate to route.
   * Web: router.push(route)
   * Mobile: navigation.navigate(route)
   */
  navigate(route: string, params?: Record<string, any>): void;

  /**
   * Go back in history.
   */
  goBack(): void;

  /**
   * Get current route.
   * Web: usePathname()
   * Mobile: navigation.getCurrentRoute()
   */
  getCurrentRoute(): string;
}
