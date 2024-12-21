import { RateLimitStore } from './types';

class RateLimitMemoryStore {
  private store = new Map<string, RateLimitStore>();

  get(key: string): RateLimitStore | undefined {
    return this.store.get(key);
  }

  set(key: string, value: RateLimitStore): void {
    this.store.set(key, value);
  }

  cleanup(windowMs: number): void {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now - value.timestamp > windowMs) {
        this.store.delete(key);
      }
    }
  }
}

export const rateLimitStore = new RateLimitMemoryStore();