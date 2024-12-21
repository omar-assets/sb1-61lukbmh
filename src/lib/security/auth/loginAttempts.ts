import { securityOptions } from './config';

class LoginAttemptTracker {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();

  public recordAttempt(email: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(email) || { count: 0, lastAttempt: now };

    // Reset if last attempt was more than 30 minutes ago
    if (now - record.lastAttempt > 30 * 60 * 1000) {
      record.count = 0;
    }

    record.count++;
    record.lastAttempt = now;
    this.attempts.set(email, record);

    return record.count <= securityOptions.maxLoginAttempts;
  }

  public resetAttempts(email: string): void {
    this.attempts.delete(email);
  }

  public getRemainingAttempts(email: string): number {
    const record = this.attempts.get(email);
    if (!record) return securityOptions.maxLoginAttempts;
    return Math.max(0, securityOptions.maxLoginAttempts - record.count);
  }
}

export const loginAttemptTracker = new LoginAttemptTracker();