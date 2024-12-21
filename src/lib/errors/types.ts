import { AuthError } from '@supabase/supabase-js';

export interface AppError extends Error {
  code: string;
  status?: number;
  context?: Record<string, unknown>;
}

export class ValidationError extends Error implements AppError {
  code = 'VALIDATION_ERROR';
  constructor(message: string, public context?: Record<string, unknown>) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error implements AppError {
  code = 'AUTHENTICATION_ERROR';
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class NetworkError extends Error implements AppError {
  code = 'NETWORK_ERROR';
  constructor(message: string = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}