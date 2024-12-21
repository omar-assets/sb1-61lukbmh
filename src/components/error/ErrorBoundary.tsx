import React, { Component, ErrorInfo } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { logger } from '../../lib/logger';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error caught by boundary:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorFallback 
          error={this.state.error} 
          resetErrorBoundary={this.handleReset} 
        />
      );
    }

    return this.props.children;
  }
}