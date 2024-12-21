export const corsConfig = {
  allowedOrigins: [
    'https://brixasset.com',
    'https://www.brixasset.com'
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],
  exposedHeaders: ['Content-Length', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
  maxAge: 86400, // 24 hours
  credentials: true
} as const;