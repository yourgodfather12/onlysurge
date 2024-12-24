'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Platform } from '@/types/dashboard'

interface PlatformContextType {
  currentPlatform: Platform | null
  setCurrentPlatform: (platform: Platform | null) => void
  platforms: Platform[]
}

const defaultPlatforms: Platform[] = [
  {
    id: 'onlyfans',
    name: 'OnlyFans',
    type: 'onlyfans',
    icon: null,
    status: 'disconnected',
    metrics: {
      subscribers: 0,
      views: 0,
      revenue: 0
    }
  },
  {
    id: 'fansly',
    name: 'Fansly',
    type: 'fansly',
    icon: null,
    status: 'disconnected',
    metrics: {
      subscribers: 0,
      views: 0,
      revenue: 0
    }
  }
]

const PlatformContext = createContext<PlatformContextType | undefined>(undefined)

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [currentPlatform, setCurrentPlatformState] = useState<Platform | null>(null)
  const [platforms] = useState<Platform[]>(defaultPlatforms)

  const setCurrentPlatform = useCallback((platform: Platform | null) => {
    setCurrentPlatformState(platform)
  }, [])

  const value = {
    currentPlatform,
    setCurrentPlatform,
    platforms
  }

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  )
}

export function usePlatform() {
  const context = useContext(PlatformContext)
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider')
  }
  return context
} 