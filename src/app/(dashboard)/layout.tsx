'use client'

import { useState, createContext, useContext } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { usePlatformStore } from '@/store/platform-store'

interface DashboardContextValue {
  pageProps: {
    title: string
    description?: string
    showPlatformFilter?: boolean
    actions?: React.ReactNode
  }
  setPageProps: (props: DashboardContextValue['pageProps']) => void
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined)

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider')
  }
  return context
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [pageProps, setPageProps] = useState<DashboardContextValue['pageProps']>({
    title: 'Dashboard',
    showPlatformFilter: true,
  })

  return (
    <DashboardContext.Provider value={{ pageProps, setPageProps }}>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </DashboardContext.Provider>
  )
} 