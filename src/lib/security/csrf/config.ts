export const csrfConfig = {
  headerName: 'X-CSRF-Token',
  cookieName: 'csrf-token',
  tokenLength: 32,
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/'
  }
} as const;