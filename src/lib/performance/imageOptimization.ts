import { logger } from '../logger';

interface ImageDimensions {
  width: number;
  height: number;
}

export function getOptimizedImageURL(url: string, dimensions?: ImageDimensions): string {
  if (!url) return '';
  
  try {
    const imageURL = new URL(url);
    
    // Only optimize Unsplash images
    if (imageURL.hostname === 'images.unsplash.com') {
      const params = new URLSearchParams(imageURL.search);
      params.set('auto', 'format');
      params.set('q', '80');
      
      if (dimensions) {
        params.set('w', dimensions.width.toString());
        params.set('h', dimensions.height.toString());
      }
      
      imageURL.search = params.toString();
      return imageURL.toString();
    }
    
    return url;
  } catch (error) {
    logger.error('Image optimization error:', error);
    return url;
  }
}

export function generateSrcSet(url: string, sizes: number[]): string {
  if (!url) return '';
  
  try {
    return sizes
      .map(size => `${getOptimizedImageURL(url, { width: size, height: Math.round(size * 0.5625) })} ${size}w`)
      .join(', ');
  } catch (error) {
    logger.error('SrcSet generation error:', error);
    return url;
  }
}