'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

interface DashboardCardHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

interface DashboardCardContentProps {
  children: ReactNode
  className?: string
}

export function DashboardCard({ children, className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DashboardCardHeader({ children, className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function DashboardCardContent({ children, className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  )
} 