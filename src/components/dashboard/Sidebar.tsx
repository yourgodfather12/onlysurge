'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  LayoutDashboard,
  BarChart2,
  Settings,
  FileText,
  LogOut,
  X,
  MessageSquare,
  Wand2,
  Cog,
  Megaphone,
  Zap,
  Link2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Content Vault', href: '/dashboard/content-vault', icon: FileText },
  { name: 'Links', href: '/dashboard/links', icon: Link2 },
  { name: 'AI Tools', href: '/dashboard/ai-tools', icon: Wand2 },
  { name: 'Automation', href: '/dashboard/automation', icon: Zap },
  { name: 'Promoting', href: '/dashboard/promoting', icon: Megaphone },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog },
]

interface SidebarProps {
  open?: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-blue-500" />
          <span className="text-xl font-bold text-white">OnlySurge</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                'group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-800 px-4 py-4">
        <button
          className="group flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
          onClick={() => {
            // Handle logout
          }}
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col overflow-y-auto bg-gray-900">
          <NavContent />
        </div>
      </div>

      {/* Mobile sidebar */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-gray-900 p-0 sm:max-w-sm lg:hidden">
          <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
            <Link href="/dashboard" onClick={onClose} className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-full bg-blue-500" />
              <span className="text-xl font-bold text-white">OnlySurge</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-800">
              <X className="h-6 w-6 text-gray-400" aria-hidden="true" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <NavContent />
        </DialogContent>
      </Dialog>
    </>
  )
} 