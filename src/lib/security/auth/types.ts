export interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
}

export interface SessionConfig {
  maxAge: number;
  renewThreshold: number;
  inactivityTimeout: number;
}

export interface SecurityOptions {
  requireMFA?: boolean;
  passwordMinLength: number;
  passwordRequireSpecialChar: boolean;
  maxLoginAttempts: number;
}