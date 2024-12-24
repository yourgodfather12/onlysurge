import { LucideIcon, BarChart3, Users, DollarSign, TrendingUp, Sparkles, Bot, Rocket, MessageSquare, Link as LinkIcon } from 'lucide-react'

export interface StatItem {
  name: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
}

export interface QuickAction {
  title: string
  description: string
  icon: LucideIcon
  color?: string
  platform?: string
  href: string
}

export interface ActivityItem {
  message: string
  timestamp: string
  icon: LucideIcon
  platform?: string
}

export interface ContentItem {
  title: string
  views: string
  engagement: string
  revenue: string
  icon: LucideIcon
  platform?: string
}

export const stats: StatItem[] = [
  {
    name: 'Total Revenue',
    value: '$12,345',
    change: '+12.3%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    name: 'Total Subscribers',
    value: '1,234',
    change: '+5.2%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Total Views',
    value: '45.6K',
    change: '+8.1%',
    trend: 'up',
    icon: BarChart3,
  },
  {
    name: 'Growth Rate',
    value: '+15.2%',
    change: '+2.4%',
    trend: 'up',
    icon: TrendingUp,
  },
]

export const quickActions: QuickAction[] = [
  {
    title: 'Content Vault',
    description: 'Manage and organize your content with AI features',
    icon: Sparkles,
    color: 'pink',
    platform: 'onlyfans',
    href: '/dashboard/content-vault',
  },
  {
    title: 'Profile Builder',
    description: 'Create and customize your profile',
    icon: Bot,
    color: 'purple',
    platform: 'fansly',
    href: '/dashboard/profile',
  },
  {
    title: 'Promotions',
    description: 'Boost your content visibility',
    icon: Rocket,
    color: 'blue',
    platform: 'instagram',
    href: '/dashboard/promotions',
  },
]

export const recentActivity: ActivityItem[] = [
  {
    message: 'New subscriber joined your premium tier',
    timestamp: '2 minutes ago',
    icon: Users,
    platform: 'onlyfans',
  },
  {
    message: 'Content post scheduled for tomorrow',
    timestamp: '15 minutes ago',
    icon: Sparkles,
    platform: 'fansly',
  },
  {
    message: 'New message from premium subscriber',
    timestamp: '1 hour ago',
    icon: MessageSquare,
    platform: 'onlyfans',
  },
]

export const topContent: ContentItem[] = [
  {
    title: 'Summer Photoshoot Collection',
    views: '12.3K',
    engagement: '89%',
    revenue: '$1,234',
    icon: Sparkles,
    platform: 'onlyfans',
  },
  {
    title: 'Behind the Scenes Video',
    views: '8.7K',
    engagement: '92%',
    revenue: '$987',
    icon: Sparkles,
    platform: 'fansly',
  },
  {
    title: 'Exclusive Q&A Session',
    views: '5.4K',
    engagement: '85%',
    revenue: '$567',
    icon: MessageSquare,
    platform: 'onlyfans',
  },
] 