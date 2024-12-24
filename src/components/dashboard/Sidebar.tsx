'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  LayoutDashboard,
  BarChart2,
  MessageSquare,
  FileText,
  Link2,
  Wand2,
  Zap,
  Megaphone,
  Cog,
  LogOut,
  X,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Content Vault', href: '/dashboard/content-vault', icon: FileText },
  { name: 'Links', href: '/dashboard/links', icon: Link2 },
  { name: 'Subscribers', href: '/dashboard/subscribers', icon: Users },
  { name: 'AI Tools', href: '/dashboard/ai-tools', icon: Wand2 },
  { name: 'Automation', href: '/dashboard/automation', icon: Zap },
  { name: 'Promoting', href: '/dashboard/promoting', icon: Megaphone },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
  className?: string
}

function NavContent() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 lg:px-8">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500" />
        <span className="text-xl font-bold gradient-text">OnlySurge</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive 
                  ? 'bg-pink-500/10 text-pink-500' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-6 h-6 rounded transition-colors duration-200',
                isActive ? 'text-pink-500' : 'text-zinc-400 group-hover:text-white'
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-zinc-800 p-4">
        <button
          className="group flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
          onClick={() => {
            // Handle logout
          }}
        >
          <LogOut className="mr-3 h-5 w-5 text-zinc-400 group-hover:text-white" />
          Logout
        </button>
      </div>
    </div>
  )
}

export function Sidebar({ open, onClose, className }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col", className)}>
        <div className="flex grow flex-col overflow-y-auto glass-effect">
          <NavContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto glass-effect p-0 sm:max-w-sm lg:hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <Link href="/dashboard" onClick={onClose} className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500" />
              <span className="text-xl font-bold gradient-text">OnlySurge</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-zinc-800">
              <X className="h-6 w-6 text-zinc-400" aria-hidden="true" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <NavContent />
        </DialogContent>
      </Dialog>
    </>
  )
} 