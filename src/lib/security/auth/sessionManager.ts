import { sessionConfig } from './config';
import { logger } from '../../logger';

class SessionManager {
  private lastActivity: number = Date.now();
  private renewalTimeout: NodeJS.Timeout | null = null;
  private inactivityTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.setupInactivityCheck();
    this.setupTokenRenewal();
  }

  private setupInactivityCheck() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    this.inactivityTimeout = setInterval(() => {
      const timeSinceLastActivity = Date.now() - this.lastActivity;
      if (timeSinceLastActivity > sessionConfig.inactivityTimeout) {
        this.endSession();
      }
    }, 60000); // Check every minute
  }

  private setupTokenRenewal() {
    if (this.renewalTimeout) {
      clearTimeout(this.renewalTimeout);
    }

    const timeUntilRenewal = sessionConfig.renewThreshold;
    this.renewalTimeout = setTimeout(() => {
      this.renewToken();
    }, timeUntilRenewal);
  }

  public updateActivity() {
    this.lastActivity = Date.now();
  }

  private async renewToken() {
    try {
      // Token renewal logic will be implemented here
      logger.info('Token renewal initiated');
      this.setupTokenRenewal();
    } catch (error) {
      logger.error('Token renewal failed:', error);
      this.endSession();
    }
  }

  private endSession() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
    if (this.renewalTimeout) {
      clearTimeout(this.renewalTimeout);
    }
    // Clear session data
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  public cleanup() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
    if (this.renewalTimeout) {
      clearTimeout(this.renewalTimeout);
    }
  }
}

export const sessionManager = new SessionManager();