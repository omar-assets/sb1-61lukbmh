export interface CsrfConfig {
  headerName: string;
  cookieName: string;
  tokenLength: number;
  cookieOptions: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
    path: string;
  };
}

export interface CsrfValidationResult {
  isValid: boolean;
  error?: string;
}