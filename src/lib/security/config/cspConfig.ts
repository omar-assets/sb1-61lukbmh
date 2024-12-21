export const cspConfig = {
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://brixasset.com'],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'https:', 'data:', 'https://images.unsplash.com'],
    'font-src': ["'self'", 'https:', 'data:'],
    'connect-src': [
      "'self'",
      'https://brixasset.com',
      'https://*.supabase.co'
    ],
    'frame-ancestors': ["'none'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"]
  }
} as const;