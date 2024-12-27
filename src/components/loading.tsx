'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  delay?: number;
}

export function Loading({ 
  message = 'Loading...', 
  fullScreen = true,
  delay = 400 
}: LoadingProps) {
  const [showDelayed, setShowDelayed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowDelayed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!mounted) return null;
  if (!showDelayed) return null;

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'
    : 'flex items-center justify-center p-4';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={containerClasses}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="h-12 w-12">
              <motion.span
                className="absolute h-full w-full rounded-full border-2 border-primary-pink"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.span
                className="absolute h-full w-full rounded-full border-2 border-primary-pink"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2,
                }}
              />
            </div>
          </motion.div>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-foreground/80"
            >
              {message}
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function LoadingSpinner({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-6 w-6',
    large: 'h-8 w-8',
  };

  return (
    <svg
      className={`animate-spin text-foreground/50 ${sizeClasses[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-current"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-current"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-current"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
    </span>
  );
} 