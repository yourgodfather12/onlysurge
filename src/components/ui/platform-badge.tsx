'use client'

import { Platform } from '@/types/dashboard'
import { cn } from '@/lib/utils'
import { Heart, Star, DollarSign, Crown } from 'lucide-react'

interface PlatformBadgeProps {
  platform: Platform
  size?: 'sm' | 'md' | 'lg'
  showStatus?: boolean
}

const platformIcons = {
  onlyfans: <Heart className="h-4 w-4" />,
  fansly: <Star className="h-4 w-4" />,
  manyvids: <DollarSign className="h-4 w-4" />,
  loyalfans: <Crown className="h-4 w-4" />
}

const platformColors = {
  onlyfans: 'text-blue-500 bg-blue-500/10',
  fansly: 'text-purple-500 bg-purple-500/10',
  manyvids: 'text-green-500 bg-green-500/10',
  loyalfans: 'text-amber-500 bg-amber-500/10'
}

const statusColors = {
  connected: 'bg-emerald-500',
  disconnected: 'bg-zinc-500',
  connecting: 'bg-blue-500 animate-pulse',
  error: 'bg-red-500'
}

const sizes = {
  sm: 'text-xs px-2 py-1 gap-1',
  md: 'text-sm px-3 py-1.5 gap-1.5',
  lg: 'text-base px-4 py-2 gap-2'
}

export function PlatformBadge({ 
  platform,
  size = 'md',
  showStatus = false
}: PlatformBadgeProps) {
  if (!platform) {
    return null
  }

  const { type, status } = platform
  const icon = platformIcons[type] || null
  const colorClass = platformColors[type] || 'text-zinc-500 bg-zinc-500/10'
  const sizeClass = sizes[size] || sizes.md

  return (
    <div className={cn(
      "inline-flex items-center rounded-full font-medium",
      colorClass,
      sizeClass
    )}>
      {icon}
      <span>{platform.name}</span>
      {showStatus && status && (
        <div className={cn(
          "h-2 w-2 rounded-full ml-1",
          statusColors[status]
        )} />
      )}
    </div>
  )
} 