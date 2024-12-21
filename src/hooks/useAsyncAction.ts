import { useState, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';

interface AsyncActionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export function useAsyncAction<T = any>(
  action: (...args: any[]) => Promise<T>,
  options: AsyncActionOptions<T> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorHandler();

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        const result = await action(...args);
        options.onSuccess?.(result);
        return result;
      } catch (error) {
        const processedError = handleError(error);
        options.onError?.(processedError);
        throw processedError;
      } finally {
        setIsLoading(false);
        options.onSettled?.();
      }
    },
    [action, handleError, options]
  );

  return {
    execute,
    isLoading
  };
}