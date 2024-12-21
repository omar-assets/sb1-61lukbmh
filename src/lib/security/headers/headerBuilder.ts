import { SecurityHeadersOptions } from './types';
import { securityHeadersOptions } from './config';
import { generateCSP } from '../utils/securityUtils';

export class SecurityHeaderBuilder {
  private headers: Record<string, string> = {};
  private options: SecurityHeadersOptions;

  constructor(options: Partial<SecurityHeadersOptions> = {}) {
    this.options = { ...securityHeadersOptions, ...options };
  }

  public addContentSecurityPolicy(): this {
    const csp = generateCSP();
    this.headers['Content-Security-Policy'] = csp;
    
    if (this.options.enableReporting) {
      this.headers['Content-Security-Policy-Report-Only'] = csp;
    }
    
    return this;
  }

  public addStrictTransportSecurity(): this {
    const { hstsMaxAge, hstsIncludeSubdomains, hstsPreload } = this.options;
    let header = `max-age=${hstsMaxAge}`;
    
    if (hstsIncludeSubdomains) {
      header += '; includeSubDomains';
    }
    
    if (hstsPreload) {
      header += '; preload';
    }
    
    this.headers['Strict-Transport-Security'] = header;
    return this;
  }

  public addXContentTypeOptions(): this {
    this.headers['X-Content-Type-Options'] = 'nosniff';
    return this;
  }

  public addXSSProtection(): this {
    this.headers['X-XSS-Protection'] = '1; mode=block';
    return this;
  }

  public addFrameOptions(): this {
    this.headers['X-Frame-Options'] = 'DENY';
    return this;
  }

  public addReferrerPolicy(): this {
    this.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    return this;
  }

  public addPermissionsPolicy(): this {
    this.headers['Permissions-Policy'] = 
      'camera=(), microphone=(), geolocation=(), payment=()';
    return this;
  }

  public build(): Record<string, string> {
    return this.headers;
  }
}