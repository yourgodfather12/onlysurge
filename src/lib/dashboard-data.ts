import {
  Users,
  DollarSign,
  Heart,
  Eye,
  TrendingUp,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Plus,
  Bell,
} from 'lucide-react'

interface StatItem {
  name: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
}

interface QuickAction {
  title: string
  description: string
  icon: React.ElementType
  color: string
}

interface ActivityItem {
  type: string
  message: string
  timestamp: string
  icon: React.ElementType
}

interface ContentItem {
  title: string
  type: string
  views: string
  engagement: string
  revenue: string
  icon: React.ElementType
}

export const stats: StatItem[] = [
  {
    name: 'Total Subscribers',
    value: '12,345',
    change: '+12%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '+23%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    name: 'Engagement Rate',
    value: '8.7%',
    change: '+5%',
    trend: 'up',
    icon: Heart,
  },
  {
    name: 'Content Views',
    value: '234.5K',
    change: '+18%',
    trend: 'up',
    icon: Eye,
  },
]

export const quickActions: QuickAction[] = [
  {
    title: 'Create Content',
    description: 'Upload and publish new content',
    icon: Plus,
    color: 'text-pink-500',
  },
  {
    title: 'View Analytics',
    description: 'Check your performance metrics',
    icon: TrendingUp,
    color: 'text-blue-500',
  },
  {
    title: 'Manage Messages',
    description: 'Respond to subscriber messages',
    icon: MessageSquare,
    color: 'text-purple-500',
  },
]

export const recentActivity: ActivityItem[] = [
  {
    type: 'subscriber',
    message: 'New subscriber joined',
    timestamp: '2 minutes ago',
    icon: Users,
  },
  {
    type: 'message',
    message: 'New message received',
    timestamp: '15 minutes ago',
    icon: MessageSquare,
  },
  {
    type: 'content',
    message: 'Content published successfully',
    timestamp: '1 hour ago',
    icon: ImageIcon,
  },
  {
    type: 'campaign',
    message: 'Campaign completed',
    timestamp: '2 hours ago',
    icon: Bell,
  },
]

export const topContent: ContentItem[] = [
  {
    title: 'Summer Collection 2024',
    type: 'image',
    views: '12.5K',
    engagement: '8.2%',
    revenue: '$1,234',
    icon: ImageIcon,
  },
  {
    title: 'Behind the Scenes',
    type: 'video',
    views: '8.7K',
    engagement: '6.8%',
    revenue: '$987',
    icon: FileText,
  },
  {
    title: 'Lifestyle Tips & Tricks',
    type: 'article',
    views: '5.2K',
    engagement: '4.5%',
    revenue: '$567',
    icon: FileText,
  },
] 