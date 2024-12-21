import { TokenPayload } from './types';
import { logger } from '../../logger';

export function validateToken(token: string): boolean {
  try {
    if (!token) return false;

    const payload = parseToken(token);
    if (!payload) return false;

    // Check token expiration
    if (payload.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Token validation error:', error);
    return false;
  }
}

function parseToken(token: string): TokenPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    logger.error('Token parsing error:', error);
    return null;
  }
}