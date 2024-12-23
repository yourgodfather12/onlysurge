import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  BarChart2,
  FolderClosed,
  Link as LinkIcon,
  MessageSquare,
  UserCircle,
  Megaphone,
  Users,
  Settings,
  Wallet,
} from 'lucide-react'

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart2,
    badge: '+12%',
  },
  {
    name: 'Content',
    href: '/dashboard/content-vault',
    icon: FolderClosed,
  },
  {
    name: 'Links',
    href: '/dashboard/links',
    icon: LinkIcon,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
    badge: '5',
  },
  {
    name: 'Subscribers',
    href: '/dashboard/subscribers',
    icon: Users,
  },
  {
    name: 'Promotions',
    href: '/dashboard/promoting',
    icon: Megaphone,
  },
  {
    name: 'Earnings',
    href: '/dashboard/earnings',
    icon: Wallet,
    badge: '$1.2k',
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircle,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive 
                    ? 'bg-zinc-900 text-pink-500' 
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
                {item.badge && (
                  <span className={cn(
                    'ml-auto text-xs font-medium',
                    isActive ? 'text-pink-500' : 'text-zinc-500'
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="Profile"
            className="h-8 w-8 rounded-full bg-zinc-900"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white truncate">Sarah Wilson</div>
            <div className="text-xs text-zinc-400 truncate">@sarahcreates</div>
          </div>
        </div>
      </div>
    </div>
  )
} 