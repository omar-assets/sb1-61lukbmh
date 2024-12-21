export type AuditEventType = 
  | 'auth.login'
  | 'auth.logout'
  | 'auth.register'
  | 'auth.password_change'
  | 'auth.password_reset'
  | 'security.mfa_enabled'
  | 'security.mfa_disabled';

export interface AuditEvent {
  type: AuditEventType;
  userId?: string;
  timestamp: number;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface AuditLogOptions {
  retention: number;
  batchSize: number;
}