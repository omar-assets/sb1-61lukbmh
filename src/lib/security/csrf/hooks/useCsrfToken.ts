import { useEffect } from 'react';
import { csrfManager } from '../csrfManager';

export function useCsrfToken() {
  useEffect(() => {
    if (!csrfManager.getToken()) {
      csrfManager.initialize();
    }
  }, []);

  return {
    token: csrfManager.getToken(),
    reset: () => csrfManager.reset()
  };
}