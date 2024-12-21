import { PasswordRequirements, PasswordValidationResult } from './types';
import { passwordRequirements, passwordBlacklist } from './config';

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < passwordRequirements.minLength) {
    errors.push(`Password must be at least ${passwordRequirements.minLength} characters long`);
  }

  if (password.length > passwordRequirements.maxLength) {
    errors.push(`Password must not exceed ${passwordRequirements.maxLength} characters`);
  }

  if (passwordRequirements.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (passwordRequirements.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (passwordRequirements.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (passwordRequirements.requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  if (passwordBlacklist.some(banned => password.toLowerCase().includes(banned))) {
    errors.push('Password contains forbidden sequences');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}