'use client'

import * as React from 'react'
import { Menu, ChevronDown, User, Settings, LogOut, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlatformSelect } from '@/components/ui/platform-select'
import { usePlatform } from '@/lib/platform-context'
import { cn } from '@/lib/utils'

interface TopNavProps {
  onOpenSidebar: () => void
  title?: string
  description?: string
  showPlatformFilter?: boolean
  actions?: React.ReactNode
}

interface UserData {
  name: string
  email: string
  avatar?: string
}

// Mock user data - in a real app, this would come from your auth system
const userData: UserData = {
  name: 'John Doe',
  email: 'john@example.com',
}

export function TopNav({ 
  onOpenSidebar,
  title,
  description,
  showPlatformFilter,
  actions
}: TopNavProps) {
  const { currentPlatform } = usePlatform()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Handle clicking outside of dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Memoize connection status to prevent unnecessary re-renders
  const connectionStatus = React.useMemo(() => {
    if (!currentPlatform) {
      return {
        text: 'No Platform Selected',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        icon: AlertCircle
      }
    }

    return {
      text: 'Connected',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      icon: AlertCircle
    }
  }, [currentPlatform])

  const handleLogout = React.useCallback(() => {
    // Add logout logic here
    console.log('Logging out...')
  }, [])

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-800 bg-zinc-950/50 px-4 backdrop-blur-xl sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Sidebar toggle */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-zinc-400 lg:hidden"
        onClick={onOpenSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-zinc-800 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Page Header */}
        <div className="flex flex-1 items-center">
          {title && (
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              {description && (
                <p className="mt-1 text-sm text-zinc-400">{description}</p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Connection Status */}
          {showPlatformFilter && (
            <div className="flex items-center gap-x-4">
              <div className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
                connectionStatus.bgColor,
                connectionStatus.color
              )}>
                <connectionStatus.icon className="h-4 w-4" />
                <span>{connectionStatus.text}</span>
              </div>
              <PlatformSelect />
            </div>
          )}

          {/* Custom Actions */}
          {actions}

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <User className="h-5 w-5 text-zinc-400" />
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-zinc-400 transition-transform",
                dropdownOpen && "rotate-180"
              )} />
            </Button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg border border-zinc-800 bg-zinc-900 py-2 shadow-lg">
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-sm font-medium">{userData.name}</p>
                  <p className="text-sm text-zinc-400">{userData.email}</p>
                </div>
                <div className="py-1">
                  <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 