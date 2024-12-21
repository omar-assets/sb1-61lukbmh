import { securityHeaders } from '../config/securityHeaders';
import { cspConfig } from '../config/cspConfig';

export function generateCSP(): string {
  return Object.entries(cspConfig.directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

export function validateOrigin(origin: string): boolean {
  const allowedOrigins = [
    'https://brixasset.com',
    'https://www.brixasset.com'
  ];
  return allowedOrigins.includes(origin);
}

export function sanitizeRedirectUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
  } catch {
    return '/';
  }
}