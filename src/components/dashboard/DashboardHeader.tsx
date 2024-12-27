'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDashboard } from '@/app/(dashboard)/layout'
import { PlatformSelect } from '@/components/ui/platform-select'

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { pageProps } = useDashboard()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">{pageProps.title}</h1>
            {pageProps.description && (
              <p className="text-sm text-muted-foreground">
                {pageProps.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {pageProps.showPlatformFilter && (
              <div className="hidden md:block">
                <PlatformSelect />
              </div>
            )}
            {pageProps.actions}
          </div>
        </div>
      </div>
    </header>
  )
} 