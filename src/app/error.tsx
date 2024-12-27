'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full p-8 text-center space-y-4">
        <div className="text-[var(--accent-1)] mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold">Something went wrong!</h2>
        <p className="text-white/60 text-sm">
          We've logged this error and will look into it. Try refreshing the page or going back.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            Go Home
          </button>
          <button
            onClick={reset}
            className="button-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 