import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  ContentStatus,
  MessageStatus,
  SubscriberStatus,
  PromotionStatus,
  LinkStatus
} from '@/types/dashboard'

type Status = ContentStatus | MessageStatus | SubscriberStatus | PromotionStatus | LinkStatus

interface StatusConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
}

interface StatusBadgeProps {
  status: Status
  size?: 'sm' | 'md' | 'lg'
  showDot?: boolean
  className?: string
}

const statusConfig: Record<Status, StatusConfig> = {
  // Content statuses
  draft: {
    label: 'Draft',
    color: '#9CA3AF',
    bgColor: 'rgba(156, 163, 175, 0.1)',
    borderColor: 'rgba(156, 163, 175, 0.2)'
  },
  scheduled: {
    label: 'Scheduled',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)'
  },
  published: {
    label: 'Published',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)'
  },
  archived: {
    label: 'Archived',
    color: '#6B7280',
    bgColor: 'rgba(107, 114, 128, 0.1)',
    borderColor: 'rgba(107, 114, 128, 0.2)'
  },

  // Message statuses
  unread: {
    label: 'Unread',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  },
  read: {
    label: 'Read',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)'
  },
  replied: {
    label: 'Replied',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)'
  },

  // Subscriber statuses
  active: {
    label: 'Active',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)'
  },
  expired: {
    label: 'Expired',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  },
  blocked: {
    label: 'Blocked',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)'
  },

  // Promotion statuses
  ended: {
    label: 'Ended',
    color: '#6B7280',
    bgColor: 'rgba(107, 114, 128, 0.1)',
    borderColor: 'rgba(107, 114, 128, 0.2)'
  },

  // Link statuses
  disabled: {
    label: 'Disabled',
    color: '#6B7280',
    bgColor: 'rgba(107, 114, 128, 0.1)',
    borderColor: 'rgba(107, 114, 128, 0.2)'
  }
}

const sizes = {
  sm: {
    badge: 'h-5 px-1.5 text-xs',
    dot: 'h-1.5 w-1.5'
  },
  md: {
    badge: 'h-6 px-2 text-sm',
    dot: 'h-2 w-2'
  },
  lg: {
    badge: 'h-7 px-2.5 text-base',
    dot: 'h-2.5 w-2.5'
  }
}

export function StatusBadge({
  status,
  size = 'md',
  showDot = true,
  className
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const sizeConfig = sizes[size]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-1.5 rounded-full border",
        sizeConfig.badge,
        className
      )}
      style={{
        color: config.color,
        backgroundColor: config.bgColor,
        borderColor: config.borderColor
      }}
    >
      {showDot && (
        <span
          className={cn(
            "rounded-full",
            sizeConfig.dot
          )}
          style={{ backgroundColor: config.color }}
        />
      )}
      <span className="font-medium">
        {config.label}
      </span>
    </motion.div>
  )
} 