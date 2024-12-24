'use client'

import * as React from 'react'
import { Platform } from '@/types/dashboard'
import { usePlatform } from '@/lib/platform-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PlatformBadge } from './platform-badge'

export const PlatformSelect = React.memo(function PlatformSelect() {
  const { currentPlatform, setCurrentPlatform, platforms } = usePlatform()

  const handlePlatformSelect = React.useCallback((platform: Platform) => {
    setCurrentPlatform(platform)
  }, [setCurrentPlatform])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {currentPlatform ? (
            <PlatformBadge platform={currentPlatform} />
          ) : (
            <span>Select Platform</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {platforms.map(platform => (
          <DropdownMenuItem
            key={platform.id}
            onClick={() => handlePlatformSelect(platform)}
          >
            <PlatformBadge platform={platform} showStatus />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}) 