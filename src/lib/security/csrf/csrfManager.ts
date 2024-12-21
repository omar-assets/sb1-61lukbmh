import { csrfConfig } from './config';
import { generateCsrfToken } from './tokenGenerator';
import { CsrfValidationResult } from './types';
import { logger } from '../../logger';

class CsrfManager {
  private token: string | null = null;

  public initialize(): void {
    this.token = generateCsrfToken();
    this.setCookie(this.token);
  }

  public getToken(): string {
    if (!this.token) {
      this.initialize();
    }
    return this.token!;
  }

  public validate(token: string): CsrfValidationResult {
    if (!this.token) {
      return { isValid: false, error: 'No CSRF token found' };
    }

    if (!token) {
      return { isValid: false, error: 'No token provided' };
    }

    return {
      isValid: token === this.token,
      error: token !== this.token ? 'Invalid CSRF token' : undefined
    };
  }

  private setCookie(token: string): void {
    const { cookieOptions } = csrfConfig;
    const cookieValue = `${csrfConfig.cookieName}=${token}; Path=${cookieOptions.path}; SameSite=${cookieOptions.sameSite}`;
    document.cookie = cookieValue + (cookieOptions.secure ? '; Secure' : '');
  }

  public reset(): void {
    this.token = null;
    this.initialize();
  }
}

export const csrfManager = new CsrfManager();