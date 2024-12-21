import { useState, useCallback } from 'react';
import { AuthenticationError, NetworkError, ValidationError } from '../lib/errors/types';
import { logger } from '../lib/logger';

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    logger.error('Error handled:', error);

    if (error instanceof AuthenticationError) {
      setError(error.message);
    } else if (error instanceof ValidationError) {
      setError(error.message);
    } else if (error instanceof NetworkError) {
      setError(error.message);
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unexpected error occurred');
    }

    return error;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}