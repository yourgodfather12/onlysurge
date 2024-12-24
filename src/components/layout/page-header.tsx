'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Platform } from '@/lib/platform-context'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  platforms?: Platform[]
  currentPlatform?: Platform | null
  onPlatformChange?: (platform: Platform | null) => void
}

export function PageHeader({
  title,
  description,
  actions,
  platforms,
  currentPlatform,
  onPlatformChange,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold text-gradient">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-zinc-400">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {platforms && onPlatformChange && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlatformChange(null)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                !currentPlatform
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              All Platforms
            </button>
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => onPlatformChange(platform)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  currentPlatform?.id === platform.id
                    ? `bg-${platform.color}-500/10 text-${platform.color}-500`
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {platform.icon}
                {platform.name}
              </button>
            ))}
          </div>
        )}
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>
    </motion.div>
  )
} 