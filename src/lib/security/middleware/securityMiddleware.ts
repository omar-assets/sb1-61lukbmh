import { generateCSP } from '../utils/securityUtils';
import { securityHeaders } from '../config/securityHeaders';
import { securityHeadersManager } from '../headers/securityHeaders';

export function applySecurityHeaders(): void {
  securityHeadersManager.applySecurityHeaders();
}

// Initialize security features
export function initializeSecurity(): void {
  applySecurityHeaders();
  
  // Prevent XSS in localStorage
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key: string, value: string) {
    if (typeof value === 'string') {
      value = value.replace(/<[^>]*>/g, '');
    }
    originalSetItem.call(localStorage, key, value);
  };
}