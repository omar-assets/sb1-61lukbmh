import React, { createContext, useContext, useState, useCallback } from 'react';
import { ErrorNotification } from '../components/error/ErrorNotification';
import { logger } from '../lib/logger';

interface ErrorContextType {
  showError: (message: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  const showError = useCallback((message: string) => {
    logger.error('Global error:', message);
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    showError,
    clearError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
      {error && <ErrorNotification message={error} onClose={clearError} />}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}