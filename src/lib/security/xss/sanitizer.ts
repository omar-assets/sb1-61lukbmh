import { SanitizeOptions, SanitizeResult } from './types';
import { defaultSanitizeOptions, urlAllowList } from './config';
import { logger } from '../../logger';

export function sanitizeInput(input: string, options: Partial<SanitizeOptions> = {}): SanitizeResult {
  const mergedOptions = { ...defaultSanitizeOptions, ...options };
  const originalInput = input;

  try {
    // Remove potentially dangerous HTML
    input = input.replace(/<\s*script\b[^>]*>(.*?)<\s*\/\s*script\s*>/gi, '');
    input = input.replace(/<\s*style\b[^>]*>(.*?)<\s*\/\s*style\s*>/gi, '');
    
    // Remove dangerous attributes
    input = input.replace(/javascript:/gi, '');
    input = input.replace(/data:/gi, '');
    input = input.replace(/vbscript:/gi, '');
    
    // Encode special characters
    input = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');

    return {
      sanitized: input,
      modified: input !== originalInput
    };
  } catch (error) {
    logger.error('Input sanitization error:', error);
    return {
      sanitized: '',
      modified: true
    };
  }
}

export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (urlAllowList.some(allowed => parsed.origin.endsWith(allowed))) {
      return url;
    }
    return '#';
  } catch {
    return '#';
  }
}

export function sanitizeHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}