import { rateLimitConfig } from './config';
import { rateLimitStore } from './store';

export function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(clientId);

  if (!record) {
    rateLimitStore.set(clientId, {
      key: clientId,
      timestamp: now,
      count: 1
    });
    return true;
  }

  if (now - record.timestamp > rateLimitConfig.windowMs) {
    rateLimitStore.set(clientId, {
      key: clientId,
      timestamp: now,
      count: 1
    });
    return true;
  }

  if (record.count >= rateLimitConfig.maxRequests) {
    return false;
  }

  record.count++;
  rateLimitStore.set(clientId, record);
  return true;
}

// Cleanup old records periodically
setInterval(() => {
  rateLimitStore.cleanup(rateLimitConfig.windowMs);
}, rateLimitConfig.windowMs);