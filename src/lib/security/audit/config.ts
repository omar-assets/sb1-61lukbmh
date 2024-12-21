import { AuditLogOptions } from './types';

export const auditLogConfig: AuditLogOptions = {
  retention: 90 * 24 * 60 * 60 * 1000, // 90 days
  batchSize: 100
};