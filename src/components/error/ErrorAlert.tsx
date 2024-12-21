import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-grow">
          <p className="text-red-700">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}