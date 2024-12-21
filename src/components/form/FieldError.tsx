import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FieldErrorProps {
  error?: string;
  id?: string;
}

export function FieldError({ error, id }: FieldErrorProps) {
  if (!error) return null;

  return (
    <p 
      id={id}
      className="mt-1 flex items-center gap-1 text-sm text-red-600 transition-opacity duration-200"
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{error}</span>
    </p>
  );
}