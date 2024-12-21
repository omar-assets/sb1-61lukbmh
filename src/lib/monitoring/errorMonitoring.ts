import { logger } from '../logger';

interface ErrorMetadata {
  timestamp: string;
  url: string;
  userAgent: string;
  [key: string]: any;
}

class ErrorMonitoring {
  private static instance: ErrorMonitoring;
  private isDevelopment = import.meta.env.DEV;

  private constructor() {
    this.setupGlobalHandlers();
  }

  static getInstance(): ErrorMonitoring {
    if (!ErrorMonitoring.instance) {
      ErrorMonitoring.instance = new ErrorMonitoring();
    }
    return ErrorMonitoring.instance;
  }

  private getErrorMetadata(): ErrorMetadata {
    return {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  private setupGlobalHandlers() {
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(event.reason, 'Unhandled Promise Rejection');
    });

    window.addEventListener('error', (event) => {
      this.captureError(event.error, 'Uncaught Error');
    });
  }

  public captureError(error: Error | unknown, context?: string) {
    const metadata = this.getErrorMetadata();
    const errorInfo = {
      name: error instanceof Error ? error.name : 'Unknown Error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context,
      metadata
    };

    logger.error('Error captured:', errorInfo);

    if (!this.isDevelopment) {
      // In production, you would send this to your error tracking service
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  public captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    const metadata = this.getErrorMetadata();
    logger[level]('Message captured:', { message, metadata });

    if (!this.isDevelopment) {
      // Send to error tracking service in production
    }
  }
}

export const errorMonitoring = ErrorMonitoring.getInstance();