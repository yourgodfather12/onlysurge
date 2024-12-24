'use client'

import { ReactNode } from 'react'
import { PlatformProvider } from './platform-provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PlatformProvider>
      {children}
    </PlatformProvider>
  )
} 