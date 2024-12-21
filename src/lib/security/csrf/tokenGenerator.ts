import { csrfConfig } from './config';
import { logger } from '../../logger';

export function generateCsrfToken(): string {
  try {
    const array = new Uint8Array(csrfConfig.tokenLength);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    logger.error('CSRF token generation error:', error);
    throw new Error('Failed to generate CSRF token');
  }
}