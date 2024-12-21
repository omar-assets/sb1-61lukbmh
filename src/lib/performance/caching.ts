interface CacheConfig {
  maxAge: number;
  staleWhileRevalidate?: number;
}

const defaultConfig: CacheConfig = {
  maxAge: 3600,
  staleWhileRevalidate: 86400
};

export function generateCacheHeaders(config: Partial<CacheConfig> = {}): string {
  const { maxAge, staleWhileRevalidate } = { ...defaultConfig, ...config };
  
  let header = `max-age=${maxAge}, public`;
  
  if (staleWhileRevalidate) {
    header += `, stale-while-revalidate=${staleWhileRevalidate}`;
  }
  
  return header;
}

export function applyRouteCache(path: string): CacheConfig {
  // Define caching strategies for different routes
  const strategies: Record<string, CacheConfig> = {
    '/': { maxAge: 3600, staleWhileRevalidate: 86400 },
    '/about': { maxAge: 86400, staleWhileRevalidate: 604800 },
    '/marketplace': { maxAge: 300, staleWhileRevalidate: 3600 },
    '/how-it-works': { maxAge: 86400, staleWhileRevalidate: 604800 }
  };

  return strategies[path] || defaultConfig;
}