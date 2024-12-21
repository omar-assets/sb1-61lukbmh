export const defaultSanitizeOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  allowedAttributes: {
    'a': ['href', 'title', 'target']
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style', 'iframe', 'object']
} as const;

export const urlAllowList = [
  'https://brixasset.com',
  'https://www.brixasset.com',
  'https://images.unsplash.com'
];