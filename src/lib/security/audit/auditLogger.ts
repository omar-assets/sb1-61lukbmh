import { AuditEvent, AuditEventType } from './types';
import { auditLogConfig } from './config';
import { logger } from '../../logger';

class AuditLogger {
  private events: AuditEvent[] = [];

  public log(
    type: AuditEventType,
    userId?: string,
    metadata?: Record<string, unknown>
  ): void {
    const event: AuditEvent = {
      type,
      userId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      metadata
    };

    this.events.push(event);
    logger.info('Audit event logged:', event);

    if (this.events.length >= auditLogConfig.batchSize) {
      this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    try {
      // In production, send to secure audit log storage
      // For now, we'll just log to console in development
      if (import.meta.env.DEV) {
        logger.info('Audit log batch:', this.events);
      }
      
      this.events = [];
    } catch (error) {
      logger.error('Failed to flush audit logs:', error);
    }
  }

  public cleanup(): void {
    const cutoff = Date.now() - auditLogConfig.retention;
    this.events = this.events.filter(event => event.timestamp > cutoff);
  }
}

export const auditLogger = new AuditLogger();

// Cleanup old events periodically
setInterval(() => {
  auditLogger.cleanup();
}, 24 * 60 * 60 * 1000); // Daily cleanup