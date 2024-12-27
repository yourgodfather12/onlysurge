'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundParticles from './BackgroundParticles'

interface BackgroundProps {
  children: React.ReactNode
  showParticles?: boolean
  showGradient?: boolean
  showGrid?: boolean
}

export function Background({
  children,
  showParticles = true,
  showGradient = true,
  showGrid = true,
}: BackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative min-h-screen bg-dark">
        {children}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-dark">
      {/* Background Effects */}
      <AnimatePresence>
        {showGradient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/10 via-primary-blue/10 to-dark animate-gradient-xy" />
            {showGrid && (
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            )}
          </motion.div>
        )}

        {/* Animated Particles */}
        {showParticles && <BackgroundParticles />}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 