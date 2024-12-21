import { SessionConfig, SecurityOptions } from './types';

export const sessionConfig: SessionConfig = {
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  renewThreshold: 4 * 60 * 60 * 1000, // 4 hours
  inactivityTimeout: 30 * 60 * 1000 // 30 minutes
};

export const securityOptions: SecurityOptions = {
  requireMFA: false,
  passwordMinLength: 12,
  passwordRequireSpecialChar: true,
  maxLoginAttempts: 5
};