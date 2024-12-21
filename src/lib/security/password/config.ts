import { PasswordRequirements } from './types';

export const passwordRequirements: PasswordRequirements = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxLength: 128
};

export const passwordBlacklist = [
  'password',
  '12345678',
  'qwerty',
  'admin123'
];