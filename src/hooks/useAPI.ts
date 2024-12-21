import { useState } from 'react';
import api from '../lib/api/client';
import { useErrorHandler } from './useErrorHandler';

interface APIHookOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useAPI(options: APIHookOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorHandler();

  const request = async (
    method: string,
    url: string,
    data?: any,
    config = {}
  ) => {
    try {
      setIsLoading(true);
      const response = await api.request({
        method,
        url,
        data,
        ...config,
      });

      options.onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      const processedError = handleError(error);
      options.onError?.(processedError);
      throw processedError;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    get: (url: string, config = {}) => request('GET', url, undefined, config),
    post: (url: string, data?: any, config = {}) => request('POST', url, data, config),
    put: (url: string, data?: any, config = {}) => request('PUT', url, data, config),
    patch: (url: string, data?: any, config = {}) => request('PATCH', url, data, config),
    delete: (url: string, config = {}) => request('DELETE', url, undefined, config),
  };
}