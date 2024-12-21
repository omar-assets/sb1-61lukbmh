import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { BackgroundPattern } from '../ui/BackgroundPattern';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const navigate = useNavigate();

  const handleReset = () => {
    resetErrorBoundary();
    navigate('/', { replace: true });
  };

  return (
    <BackgroundPattern variant="primary">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Something went wrong
            </h2>

            <div className="text-left p-4 bg-red-50 rounded-lg mb-6">
              <p className="text-red-600 font-mono text-sm break-all">
                {error.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetErrorBoundary}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-medium transition-colors"
              >
                <RefreshCcw className="h-5 w-5" />
                Try Again
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Home className="h-5 w-5" />
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
}