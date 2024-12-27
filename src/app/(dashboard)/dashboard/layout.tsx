'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PageProps {
  title: string
  description: string
  showPlatformFilter?: boolean
  actions?: ReactNode
}

interface DashboardContextValue {
  pageProps: PageProps
  setPageProps: (props: PageProps) => void
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined)

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [pageProps, setPageProps] = useState<PageProps>({
    title: '',
    description: '',
    showPlatformFilter: false
  })

  return (
    <DashboardContext.Provider value={{ pageProps, setPageProps }}>
      <div className="relative min-h-screen bg-gradient-to-b from-background to-background">
        {/* Background Gradients */}
        <div className="fixed inset-0 bg-gradient-to-b from-background to-background" />
        <div className="fixed inset-0 bg-[url('/images/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-violet-500/10 to-blue-500/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background blur-3xl" />
        </div>

        {/* Page Header */}
        <div className="relative border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {pageProps.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-muted-foreground"
                  >
                    {pageProps.description}
                  </motion.p>
                </div>
                {pageProps.actions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {pageProps.actions}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  )
} 