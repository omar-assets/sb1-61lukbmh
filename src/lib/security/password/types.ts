export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxLength: number;
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}