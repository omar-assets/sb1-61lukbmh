export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitStore {
  key: string;
  timestamp: number;
  count: number;
}