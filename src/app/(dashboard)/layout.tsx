'use client'

import { useState, createContext, useContext, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Background } from '@/components/ui/background'

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

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Cleanup effect
  useEffect(() => {
    return () => {
      setSidebarOpen(false)
    }
  }, [])

  // Handle visibility change
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <DashboardContext.Provider value={{ pageProps, setPageProps }}>
      <div className="flex min-h-screen bg-black">
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <div className="flex-1 flex flex-col lg:pl-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  )
} 