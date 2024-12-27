'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Platform {
  type: string
  name: string
  icon?: string
}

interface PlatformBadgeProps {
  platform: Platform
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PlatformBadge({ platform, size = 'md', className }: PlatformBadgeProps) {
  const sizeClasses = {
    sm: 'h-6 px-2',
    md: 'h-8 px-3',
    lg: 'h-10 px-4'
  }

  const platformColors = {
    onlyfans: 'bg-[#00AFF0]/10 text-[#00AFF0]',
    fansly: 'bg-[#0091EA]/10 text-[#0091EA]',
    instagram: 'bg-[#E4405F]/10 text-[#E4405F]',
    twitter: 'bg-[#1DA1F2]/10 text-[#1DA1F2]',
    tiktok: 'bg-black/10 text-white',
    youtube: 'bg-[#FF0000]/10 text-[#FF0000]'
  }

  const platformNames = {
    onlyfans: 'OnlyFans',
    fansly: 'Fansly',
    instagram: 'Instagram',
    twitter: 'Twitter',
    tiktok: 'TikTok',
    youtube: 'YouTube'
  }

  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center',
        platformColors[platform.type as keyof typeof platformColors] || 'bg-zinc-900/50 text-zinc-400',
        sizeClasses[size],
        className
      )}
    >
      {platform.icon ? (
        <div className="flex items-center gap-2">
          <Image
            src={platform.icon}
            alt={platform.name}
            width={size === 'lg' ? 24 : size === 'md' ? 20 : 16}
            height={size === 'lg' ? 24 : size === 'md' ? 20 : 16}
            className="object-contain"
          />
          <span className="text-xs font-medium">
            {platformNames[platform.type as keyof typeof platformNames] || platform.name}
          </span>
        </div>
      ) : (
        <span className="text-xs font-medium">
          {platformNames[platform.type as keyof typeof platformNames] || platform.name}
        </span>
      )}
    </div>
  )
} 