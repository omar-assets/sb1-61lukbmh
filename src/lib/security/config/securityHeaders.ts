export const securityHeaders = {
  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Enforce HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // Restrict referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Permissions policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
} as const;