import { useCallback } from 'react';
import { useError } from '../context/ErrorContext';
import { logger } from '../lib/logger';
import { 
  AuthenticationError, 
  ValidationError, 
  NetworkError 
} from '../lib/errors/types';

export function useGlobalError() {
  const { showError } = useError();

  const handleGlobalError = useCallback((error: unknown) => {
    logger.error('Global error handler:', error);

    if (error instanceof AuthenticationError) {
      showError(error.message);
    } else if (error instanceof ValidationError) {
      showError(error.message);
    } else if (error instanceof NetworkError) {
      showError(error.message);
    } else if (error instanceof Error) {
      showError(error.message);
    } else {
      showError('An unexpected error occurred');
    }

    return error;
  }, [showError]);

  return {
    handleGlobalError
  };
}