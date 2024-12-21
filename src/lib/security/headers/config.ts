import { SecurityHeadersConfig, SecurityHeadersOptions } from './types';

export const securityHeadersConfig: SecurityHeadersConfig = {
  csp: true,
  hsts: true,
  noSniff: true,
  xssProtection: true,
  frameOptions: true,
  referrerPolicy: true
};

export const securityHeadersOptions: SecurityHeadersOptions = {
  enableReporting: true,
  reportUri: 'https://brixasset.com/security/reports',
  hstsMaxAge: 31536000,
  hstsIncludeSubdomains: true,
  hstsPreload: true
};