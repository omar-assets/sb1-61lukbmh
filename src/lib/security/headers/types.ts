export interface SecurityHeadersConfig {
  csp: boolean;
  hsts: boolean;
  noSniff: boolean;
  xssProtection: boolean;
  frameOptions: boolean;
  referrerPolicy: boolean;
}

export interface SecurityHeadersOptions {
  enableReporting?: boolean;
  reportUri?: string;
  hstsMaxAge?: number;
  hstsIncludeSubdomains?: boolean;
  hstsPreload?: boolean;
}