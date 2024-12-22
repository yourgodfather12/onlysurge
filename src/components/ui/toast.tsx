'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useToast } from './use-toast'

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`
              min-w-[300px] p-4 rounded-lg shadow-lg
              ${
                toast.variant === 'destructive'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-900 text-white'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="font-medium mb-1">{toast.title}</h3>
                {toast.description && (
                  <p className="text-sm opacity-90">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className={`
                  p-1 rounded-md hover:bg-white/20 transition-colors
                  ${toast.variant === 'destructive' ? 'text-white' : 'text-gray-400'}
                `}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 