'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopNav } from '@/components/dashboard/TopNav'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'

interface PageProps {
  title?: string
  description?: string
  showPlatformFilter?: boolean
  actions?: React.ReactNode
}

interface DashboardContextType {
  pageProps: PageProps
  setPageProps: (props: PageProps) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isLoading: boolean
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined)

export function useDashboard() {
  const context = React.useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

interface DashboardRootLayoutProps {
  children: React.ReactNode
}

export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
  const pathname = usePathname()
  const [pageProps, setPageProps] = React.useState<PageProps>({})
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Initialize sidebar state from localStorage
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  // Persist sidebar state
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen))
    }
  }, [sidebarOpen])

  // Reset page props and show loading state on route change
  React.useEffect(() => {
    let mounted = true

    const handleRouteChange = () => {
      setIsLoading(true)
      setPageProps({})
      
      // Simulate page load
      const timer = setTimeout(() => {
        if (mounted) {
          setIsLoading(false)
        }
      }, 500)

      return () => clearTimeout(timer)
    }

    handleRouteChange()

    return () => {
      mounted = false
    }
  }, [pathname])

  const handleSidebarClose = React.useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const handleSidebarOpen = React.useCallback(() => {
    setSidebarOpen(true)
  }, [])

  const contextValue = React.useMemo(() => ({
    pageProps,
    setPageProps,
    sidebarOpen,
    setSidebarOpen,
    isLoading
  }), [pageProps, sidebarOpen, isLoading])

  return (
    <ErrorBoundary>
      <DashboardContext.Provider value={contextValue}>
        <div className="min-h-screen bg-zinc-950">
          <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
          <div className="lg:pl-64">
            <TopNav 
              onOpenSidebar={handleSidebarOpen}
              title={pageProps.title}
              description={pageProps.description}
              showPlatformFilter={pageProps.showPlatformFilter}
              actions={pageProps.actions}
            />
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  children
                )}
              </div>
            </main>
          </div>
        </div>
      </DashboardContext.Provider>
    </ErrorBoundary>
  )
} 