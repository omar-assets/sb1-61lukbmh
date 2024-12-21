import { useState, useCallback } from 'react';
import { sanitizeInput } from '../sanitizer';

export function useSanitizedInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { sanitized } = sanitizeInput(event.target.value);
    setValue(sanitized);
  }, []);

  return {
    value,
    onChange: handleChange,
    setValue: (newValue: string) => {
      const { sanitized } = sanitizeInput(newValue);
      setValue(sanitized);
    }
  };
}