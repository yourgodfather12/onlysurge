'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { useEffect } from 'react'
import { toast } from '@/components/ui/toast'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Content Vault', href: '/dashboard/content-vault', icon: FileText },
  { name: 'Profile Builder', href: '/dashboard/profile-builder', icon: Users },
  { name: 'Links', href: '/dashboard/links', icon: Link2 },
  { name: 'Subscribers', href: '/dashboard/subscribers', icon: Users },
  { name: 'AI Tools', href: '/dashboard/ai-tools', icon: Wand2 },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
  className?: string
}

function NavContent() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Clear any stored tokens/session data
      localStorage.removeItem('token')
      sessionStorage.clear()
      
      // Show success message
      toast.success('Successfully logged out')
      
      // Redirect to login page
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout. Please try again.')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 lg:px-8 border-b border-zinc-800/50">
        <div className="relative flex items-center justify-center h-9 w-9">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#FF1B6B] to-[#45CAFF] blur-lg opacity-40" />
          <div className="relative flex items-center justify-center h-full w-full rounded-xl bg-[#FF1B6B]/10 ring-1 ring-white/10 backdrop-blur-sm">
            <Zap className="h-5 w-5 text-[#FF1B6B] drop-shadow-[0_0_6px_rgba(255,27,107,0.4)]" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white tracking-tight">OnlySurge</span>
          <span className="text-xs text-zinc-500 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive 
                  ? 'bg-[#FF1B6B]/10 text-[#FF1B6B] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200',
                isActive 
                  ? 'text-[#FF1B6B] drop-shadow-[0_0_4px_rgba(255,27,107,0.3)]' 
                  : 'text-zinc-400 group-hover:text-white'
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-zinc-800/50 p-3">
        <button
          className="group flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
          Logout
        </button>
      </div>
    </div>
  )
}

export function Sidebar({ open, onClose, className }: SidebarProps) {
  // Close sidebar on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [open, onClose])

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("fixed inset-y-0 z-50 hidden lg:flex lg:w-72 lg:flex-col", className)}>
        <div className="flex grow flex-col bg-black/95 border-r border-zinc-800/50 backdrop-blur-xl">
          <NavContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Dialog 
        open={open} 
        onOpenChange={onClose}
        modal={true}
      >
        <DialogContent 
          className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-black/95 p-0 sm:max-w-sm lg:hidden backdrop-blur-xl"
          onInteractOutside={(e) => {
            e.preventDefault()
            onClose?.()
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault()
            onClose?.()
          }}
        >
          <div className="flex items-center justify-between border-b border-zinc-800/50 px-6 py-5">
            <Link href="/dashboard" onClick={onClose} className="flex items-center gap-3">
              <div className="relative flex items-center justify-center h-9 w-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#FF1B6B] to-[#45CAFF] blur-lg opacity-40" />
                <div className="relative flex items-center justify-center h-full w-full rounded-xl bg-[#FF1B6B]/10 ring-1 ring-white/10 backdrop-blur-sm">
                  <Zap className="h-5 w-5 text-[#FF1B6B] drop-shadow-[0_0_6px_rgba(255,27,107,0.4)]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">OnlySurge</span>
                <span className="text-xs text-zinc-500 font-medium">Dashboard</span>
              </div>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-xl hover:bg-zinc-800/50"
            >
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