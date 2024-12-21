export const ERROR_MESSAGES = {
  auth: {
    invalid_credentials: 'Invalid email or password. Please try again.',
    email_taken: 'An account with this email already exists. Please sign in or use a different email.',
    weak_password: 'Password is too weak. Please choose a stronger password.',
    session_expired: 'Your session has expired. Please sign in again.',
    too_many_requests: 'Too many attempts. Please try again later.',
    network_error: 'Unable to connect. Please check your internet connection.',
    unknown_error: 'Authentication failed. Please try again.'
  },
  network: {
    offline: 'You appear to be offline. Please check your connection.',
    timeout: 'Request timed out. Please try again.'
  },
  unknown: 'An unexpected error occurred. Please try again.'
} as const;