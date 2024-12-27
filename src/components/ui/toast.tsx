'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  id: string
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

const toastTypeConfig = {
  success: {
    icon: '✓',
    className: 'bg-emerald-500',
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
}

function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const config = toastTypeConfig[type]

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
  )
}

let toastCount = 0

export const toast = {
  show: (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = `toast-${toastCount++}`
    const event = new CustomEvent('toast', {
      detail: { id, message, type, duration },
    })
    document.dispatchEvent(event)
  },
  success: (message: string, duration?: number) => toast.show(message, 'success', duration),
  error: (message: string, duration?: number) => toast.show(message, 'error', duration),
  warning: (message: string, duration?: number) => toast.show(message, 'warning', duration),
  info: (message: string, duration?: number) => toast.show(message, 'info', duration),
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleToast = (e: CustomEvent<ToastProps>) => {
      setToasts((prev) => [...prev, e.detail])
    }

    document.addEventListener('toast' as any, handleToast as any)
    return () => {
      document.removeEventListener('toast' as any, handleToast as any)
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2"
      role="alert"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => {
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
} 