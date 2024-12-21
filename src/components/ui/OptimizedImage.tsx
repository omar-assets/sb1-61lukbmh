import { useImageLoading } from '@/lib/performance/hooks/useImageLoading';
import { ImagePlaceholder } from './ImagePlaceholder';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: number[];
  preload?: boolean;
  className?: string;
}

export function OptimizedImage({ 
  src, 
  alt,
  sizes,
  preload,
  className = '',
  ...props 
}: OptimizedImageProps) {
  const { isLoading, error, optimizedSrc, srcSet } = useImageLoading({
    src,
    sizes,
    preload
  });

  if (error) {
    return <ImagePlaceholder alt={alt} className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
}