import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  error: string;
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null;

  return (
    <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
      <p className="text-sm text-red-700">{error}</p>
    </div>
  );
}