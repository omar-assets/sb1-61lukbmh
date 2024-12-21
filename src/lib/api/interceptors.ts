import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { handleAPIError } from '../errors/api';
import { logger } from '../logger';

// Request interceptor
export function requestInterceptor(config: InternalAxiosRequestConfig) {
  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Log outgoing requests in development
  logger.info(`API Request: ${config.method?.toUpperCase()} ${config.url}`);

  return config;
}

// Response interceptor
export function responseInterceptor(response: any) {
  // Log successful responses in development
  logger.info(`API Response: ${response.status} ${response.config.url}`);
  
  return response;
}

// Error interceptor
export function errorInterceptor(error: AxiosError) {
  const processedError = handleAPIError(error);
  
  // Log error details
  logger.error('API Error:', {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    error: processedError
  });

  return Promise.reject(processedError);
}