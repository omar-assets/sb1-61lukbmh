import { logger } from '../logger';

const prefetchedRoutes = new Set<string>();

export function prefetchRoute(route: string) {
  if (prefetchedRoutes.has(route)) return;

  try {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    link.as = 'document';
    document.head.appendChild(link);
    prefetchedRoutes.add(route);
  } catch (error) {
    logger.error('Route prefetch error:', error);
  }
}

export function prefetchComponent(importFn: () => Promise<any>) {
  try {
    importFn();
  } catch (error) {
    logger.error('Component prefetch error:', error);
  }
}