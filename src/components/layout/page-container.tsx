'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn('space-y-6 p-6', className)}
    >
      {children}
    </motion.div>
  )
}

interface PageSectionProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  collapsible?: boolean
}

export function PageSection({
  children,
  className,
  title,
  description,
  collapsible = false,
}: PageSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex flex-col gap-4', className)}
    >
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-lg font-semibold text-gradient">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-zinc-400">{description}</p>
          )}
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </motion.div>
  )
}

interface PageGridProps {
  children: ReactNode
  className?: string
  columns?: number
}

export function PageGrid({
  children,
  className,
  columns = 3,
}: PageGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        {
          'md:grid-cols-2 lg:grid-cols-3': columns === 3,
          'md:grid-cols-2': columns === 2,
          'lg:grid-cols-4': columns === 4,
        },
        className
      )}
    >
      {children}
    </div>
  )
} 