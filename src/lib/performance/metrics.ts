import { ReportHandler } from 'web-vitals';

export interface PerformanceMetrics {
  fcp: number;  // First Contentful Paint
  lcp: number;  // Largest Contentful Paint
  fid: number;  // First Input Delay
  cls: number;  // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export function captureWebVitals(onPerfEntry: ReportHandler): void {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      }).catch(error => {
        console.error('Error loading web-vitals:', error);
      });
    } catch (error) {
      console.error('Error capturing web vitals:', error);
    }
  }
}

export function isPerformanceGood(metrics: Partial<PerformanceMetrics>): boolean {
  const thresholds = {
    fcp: 1800,   // Good if < 1.8s
    lcp: 2500,   // Good if < 2.5s
    fid: 100,    // Good if < 100ms
    cls: 0.1,    // Good if < 0.1
    ttfb: 600    // Good if < 600ms
  };

  return Object.entries(metrics).every(([key, value]) => {
    if (!value) return true;
    return value <= thresholds[key as keyof typeof thresholds];
  });
}