'use client'

import { Platform } from '@/types/dashboard'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface PlatformBadgeProps {
  platform: Platform
  showStatus?: boolean
  className?: string
}

export function PlatformBadge({
  platform,
  showStatus = false,
  className,
}: PlatformBadgeProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative h-4 w-4">
        <Image
          src={platform.icon}
          alt={platform.name}
          className="object-contain"
          fill
          sizes="1rem"
        />
      </div>
      <span className="text-sm font-medium">{platform.name}</span>
      {showStatus && (
        <div
          className={cn(
            'h-2 w-2 rounded-full',
            platform.status === 'online'
              ? 'bg-green-500'
              : platform.status === 'offline'
              ? 'bg-red-500'
              : 'bg-yellow-500'
          )}
        />
      )}
    </div>
  )
} 