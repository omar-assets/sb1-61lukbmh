import { csrfManager } from './csrfManager';
import { csrfConfig } from './config';
import { logger } from '../../logger';

export const csrfMiddleware = {
  validateRequest(headers: Headers): boolean {
    try {
      const token = headers.get(csrfConfig.headerName);
      if (!token) {
        logger.warn('Missing CSRF token in request');
        return false;
      }

      const { isValid, error } = csrfManager.validate(token);
      if (!isValid) {
        logger.warn('CSRF validation failed:', error);
      }

      return isValid;
    } catch (error) {
      logger.error('CSRF middleware error:', error);
      return false;
    }
  }
};