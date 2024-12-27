'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

const toastTypeConfig = {
  success: {
    icon: '✓',
    className: 'bg-green-500',
  },
  error: {
    icon: '✕',
    className: 'bg-red-500',
  },
  warning: {
    icon: '⚠',
    className: 'bg-yellow-500',
  },
  info: {
    icon: 'ℹ',
    className: 'bg-blue-500',
  },
};

function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = toastTypeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg ${config.className}`}
    >
      <span className="text-lg">{config.icon}</span>
      <p>{message}</p>
      <button
        onClick={onClose}
        className="ml-2 rounded-full p-1 hover:bg-black/10"
        aria-label="Close notification"
      >
        ✕
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export function ToastContainer({ position = 'bottom-center' }: ToastContainerProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);

  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'toast-portal';
    document.body.appendChild(container);
    setPortalContainer(container);

    const handleToast = (event: CustomEvent<ToastProps>) => {
      const { id, message, type, duration } = event.detail;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    container.addEventListener('toast' as any, handleToast as any);

    return () => {
      container.removeEventListener('toast' as any, handleToast as any);
      document.body.removeChild(container);
    };
  }, []);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  if (!portalContainer) return null;

  return createPortal(
    <div
      className={`fixed z-50 flex flex-col items-center gap-2 ${positionClasses[position]}`}
      role="alert"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => {
              setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>,
    portalContainer
  );
}

let toastCount = 0;

export const toast = {
  _container: null as Element | null,
  
  _ensureContainer() {
    if (!this._container) {
      this._container = document.getElementById('toast-portal');
    }
    return this._container;
  },

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const container = this._ensureContainer();
    if (!container) return;

    const id = `toast-${toastCount++}`;
    const event = new CustomEvent('toast', {
      detail: { id, message, type, duration },
    });
    container.dispatchEvent(event);
  },

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  },

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  },

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  },

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  },
}; 