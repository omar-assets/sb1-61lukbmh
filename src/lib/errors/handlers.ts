import { AuthError } from '@supabase/supabase-js';
import { ERROR_MESSAGES } from './messages';
import { AuthenticationError, NetworkError } from './types';
import { logger } from '../logger';

export function handleAuthError(error: unknown): Error {
  logger.error('Authentication error:', error);

  // Handle Supabase AuthApiError
  if (error && typeof error === 'object' && '__isAuthError' in error) {
    const authError = error as AuthError & { code?: string };
    
    // Check specific error codes
    if (authError.code === 'user_already_exists') {
      return new AuthenticationError(ERROR_MESSAGES.auth.email_taken);
    }

    switch (authError.status) {
      case 400:
        return new AuthenticationError(ERROR_MESSAGES.auth.invalid_credentials);
      case 401:
        return new AuthenticationError(ERROR_MESSAGES.auth.session_expired);
      case 422:
        return new AuthenticationError(ERROR_MESSAGES.auth.email_taken);
      case 429:
        return new AuthenticationError(ERROR_MESSAGES.auth.too_many_requests);
      default:
        return new AuthenticationError(ERROR_MESSAGES.auth.unknown_error);
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('network')) {
      return new NetworkError(ERROR_MESSAGES.network.offline);
    }
    return error;
  }

  return new Error(ERROR_MESSAGES.unknown);
}