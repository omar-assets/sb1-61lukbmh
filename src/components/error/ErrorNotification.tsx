import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function ErrorNotification({ 
  message, 
  onClose, 
  duration = 5000 
}: ErrorNotificationProps) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg border border-red-200 p-4 max-w-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-gray-900 font-medium">Error</p>
            <p className="text-gray-600 mt-1">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}