import { sanitizeInput } from './sanitizer';

export function createXssMiddleware() {
  return {
    sanitizeRequestData(data: unknown): unknown {
      if (typeof data === 'string') {
        return sanitizeInput(data).sanitized;
      }
      
      if (Array.isArray(data)) {
        return data.map(item => this.sanitizeRequestData(item));
      }
      
      if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            key,
            this.sanitizeRequestData(value)
          ])
        );
      }
      
      return data;
    }
  };
}

export const xssMiddleware = createXssMiddleware();