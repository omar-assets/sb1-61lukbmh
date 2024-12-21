import { AxiosError } from 'axios';
import { logger } from '../logger';
import { NetworkError, ValidationError } from './types';
import { ERROR_MESSAGES } from './messages';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown): Error {
  logger.error('API Error:', error);

  if (error instanceof AxiosError) {
    // Network or connection errors
    if (!error.response) {
      return new NetworkError(ERROR_MESSAGES.network.offline);
    }

    // API response errors
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return new ValidationError(data.message || 'Invalid request');
      case 401:
      case 403:
        return new APIError(
          data.message || 'Authentication failed',
          status,
          'AUTH_ERROR'
        );
      case 404:
        return new APIError(
          data.message || 'Resource not found',
          status,
          'NOT_FOUND'
        );
      case 422:
        return new ValidationError(
          data.message || 'Validation failed',
          data.errors
        );
      case 429:
        return new APIError(
          'Too many requests. Please try again later',
          status,
          'RATE_LIMIT'
        );
      case 500:
        return new APIError(
          'Internal server error',
          status,
          'SERVER_ERROR'
        );
      default:
        return new APIError(
          'An unexpected error occurred',
          status,
          'UNKNOWN_ERROR'
        );
    }
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return error;
  }

  return new Error('An unknown error occurred');
}