import { RateLimitConfig } from './types';

export const rateLimitConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // max requests per window
};