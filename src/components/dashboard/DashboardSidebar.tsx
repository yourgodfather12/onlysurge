'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Settings,
  BarChart,
  Link as LinkIcon,
  Bell,
} from 'lucide-react'
import { PlatformSelect } from '@/components/ui/platform-select'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart,
  },
  {
    name: 'Subscribers',
    href: '/dashboard/subscribers',
    icon: Users,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    name: 'Content',
    href: '/dashboard/content',
    icon: FileText,
  },
  {
    name: 'Links',
    href: '/dashboard/links',
    icon: LinkIcon,
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card px-3">
      <div className="flex h-14 items-center border-b px-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">OnlySurge</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto py-3">
        <div className="px-3 py-2">
          <PlatformSelect />
        </div>
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent',
                  isActive ? 'bg-accent' : 'transparent'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 