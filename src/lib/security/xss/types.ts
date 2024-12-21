export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  stripIgnoreTag?: boolean;
  stripIgnoreTagBody?: boolean;
}

export interface SanitizeResult {
  sanitized: string;
  modified: boolean;
}