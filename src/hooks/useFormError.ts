import { useState, useCallback } from 'react';
import { ZodError } from 'zod';
import { ValidationError } from '../lib/errors/types';
import { logger } from '../lib/logger';

export function useFormError() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormError = useCallback((error: unknown) => {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path) {
          errors[err.path[0]] = err.message;
        }
      });
      setFieldErrors(errors);
      setFormError(null);
      logger.warn('Form validation error:', errors);
    } else if (error instanceof ValidationError) {
      setFormError(error.message);
      setFieldErrors({});
      logger.error('Form validation error:', error);
    } else if (error instanceof Error) {
      setFormError(error.message);
      setFieldErrors({});
      logger.error('Form error:', error);
    } else {
      setFormError('An unexpected error occurred');
      setFieldErrors({});
      logger.error('Unknown form error:', error);
    }
  }, []);

  const clearErrors = useCallback(() => {
    setFieldErrors({});
    setFormError(null);
  }, []);

  return {
    fieldErrors,
    formError,
    handleFormError,
    clearErrors
  };
}