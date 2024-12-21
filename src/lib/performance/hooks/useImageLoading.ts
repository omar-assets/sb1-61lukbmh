import { useState, useEffect } from 'react';
import { getOptimizedImageURL, generateSrcSet } from '../imageOptimization';

interface UseImageLoadingProps {
  src: string;
  sizes?: number[];
  preload?: boolean;
}

export function useImageLoading({ src, sizes = [640, 750, 828, 1080, 1200], preload = false }: UseImageLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const optimizedSrc = getOptimizedImageURL(src);
  const srcSet = generateSrcSet(src, sizes);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => setIsLoading(false);
    img.onerror = () => setError(new Error('Failed to load image'));
    
    img.src = optimizedSrc;
    if (srcSet) {
      img.srcset = srcSet;
    }

    // Preload if specified
    if (preload) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      if (srcSet) {
        link.setAttribute('imagesrcset', srcSet);
      }
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, optimizedSrc, srcSet, preload]);

  return {
    isLoading,
    error,
    optimizedSrc,
    srcSet
  };
}