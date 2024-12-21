import { SecurityHeaderBuilder } from './headerBuilder';
import { securityHeadersConfig } from './config';
import { logger } from '../../logger';

class SecurityHeadersManager {
  private builder: SecurityHeaderBuilder;

  constructor() {
    this.builder = new SecurityHeaderBuilder();
  }

  public applySecurityHeaders(): void {
    try {
      if (securityHeadersConfig.csp) {
        this.builder.addContentSecurityPolicy();
      }

      if (securityHeadersConfig.hsts) {
        this.builder.addStrictTransportSecurity();
      }

      if (securityHeadersConfig.noSniff) {
        this.builder.addXContentTypeOptions();
      }

      if (securityHeadersConfig.xssProtection) {
        this.builder.addXSSProtection();
      }

      if (securityHeadersConfig.frameOptions) {
        this.builder.addFrameOptions();
      }

      if (securityHeadersConfig.referrerPolicy) {
        this.builder.addReferrerPolicy();
      }

      this.builder.addPermissionsPolicy();

      const headers = this.builder.build();
      this.setMetaTags(headers);

      logger.info('Security headers applied successfully');
    } catch (error) {
      logger.error('Failed to apply security headers:', error);
    }
  }

  private setMetaTags(headers: Record<string, string>): void {
    Object.entries(headers).forEach(([name, content]) => {
      if (name === 'Content-Security-Policy') {
        const meta = document.createElement('meta');
        meta.httpEquiv = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    });
  }
}

export const securityHeadersManager = new SecurityHeadersManager();