import { corsConfig } from './config';

export function validateCorsOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return corsConfig.allowedOrigins.includes(origin);
}

export function getCorsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': corsConfig.allowedMethods.join(', '),
    'Access-Control-Allow-Headers': corsConfig.allowedHeaders.join(', '),
    'Access-Control-Expose-Headers': corsConfig.exposedHeaders.join(', '),
    'Access-Control-Max-Age': corsConfig.maxAge.toString(),
    'Access-Control-Allow-Credentials': corsConfig.credentials.toString()
  };
}