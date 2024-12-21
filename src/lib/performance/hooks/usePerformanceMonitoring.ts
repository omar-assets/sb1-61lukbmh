import { useEffect, useCallback } from 'react';
import { captureWebVitals, isPerformanceGood } from '../metrics';
import { logger } from '../../logger';

export function usePerformanceMonitoring() {
  const handlePerfMetric = useCallback((metric: any) => {
    if (!metric) return;
    
    const { name, value } = metric;
    logger.info(`Performance metric - ${name}:`, value);
    
    if (import.meta.env.PROD) {
      // Send to analytics service
      console.log(`[Analytics] ${name}:`, value);
    }
    
    if (!isPerformanceGood({ [name]: value })) {
      logger.warn(`Poor performance detected - ${name}:`, value);
    }
  }, []);

  useEffect(() => {
    const cleanup = captureWebVitals(handlePerfMetric);
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [handlePerfMetric]);
}