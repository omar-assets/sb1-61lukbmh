import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { prefetchRoute, prefetchComponent } from '../routePrefetching';
import { publicRoutes, protectedRoutes } from '@/routes/config';

export function usePrefetch() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Get adjacent routes to current path
    const allRoutes = [...publicRoutes, ...protectedRoutes];
    const currentIndex = allRoutes.findIndex(route => route.path === pathname);
    
    if (currentIndex === -1) return;

    // Prefetch next and previous routes
    const nextRoute = allRoutes[currentIndex + 1];
    const prevRoute = allRoutes[currentIndex - 1];

    if (nextRoute) {
      prefetchRoute(nextRoute.path);
      prefetchComponent(() => nextRoute.component);
    }

    if (prevRoute) {
      prefetchRoute(prevRoute.path);
      prefetchComponent(() => prevRoute.component);
    }
  }, [pathname]);
}