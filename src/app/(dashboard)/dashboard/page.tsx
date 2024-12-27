'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Heart,
  MessageSquare,
  PlayCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Clock,
  Star,
  Bell,
  Zap,
  Eye,
  Image as ImageIcon,
  Sparkles,
  Trophy
} from 'lucide-react'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const metrics = [
  {
    title: 'Total Revenue',
    value: '$12,845.00',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'emerald',
    description: 'Monthly recurring revenue'
  },
  {
    title: 'Total Subscribers',
    value: '2,845',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'blue',
    description: 'Active subscribers'
  },
  {
    title: 'Engagement Rate',
    value: '24.5%',
    change: '-2.1%',
    trend: 'down',
    icon: Heart,
    color: 'pink',
    description: 'Average engagement'
  },
  {
    title: 'Content Views',
    value: '845.2K',
    change: '+18.7%',
    trend: 'up',
    icon: Eye,
    color: 'purple',
    description: 'Total content views'
  }
]

const recentActivity = [
  {
    id: '1',
    type: 'subscription',
    title: 'New Subscriber',
    description: 'John D. subscribed to your profile',
    timestamp: '2 minutes ago',
    platform: {
      id: 'onlyfans',
      type: 'onlyfans',
      name: 'OnlyFans',
      icon: null,
      status: 'connected'
    }
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'You have a new message from Sarah',
    timestamp: '15 minutes ago',
    platform: {
      id: 'fansly',
      type: 'fansly',
      name: 'Fansly',
      icon: null,
      status: 'connected'
    }
  },
  {
    id: '3',
    type: 'tip',
    title: 'New Tip',
    description: 'Mike sent you a $50.00 tip',
    timestamp: '1 hour ago',
    platform: {
      id: 'onlyfans',
      type: 'onlyfans',
      name: 'OnlyFans',
      icon: null,
      status: 'connected'
    }
  }
]

const topContent = [
  {
    id: '1',
    title: 'Summer Vibes 🌞',
    type: 'image',
    stats: {
      likes: 2453,
      comments: 145,
      revenue: 845.00
    },
    thumbnail: '/placeholder.jpg',
    trend: 'up',
    change: '+15%'
  },
  {
    id: '2',
    title: 'Beach Day 🏖️',
    type: 'video',
    stats: {
      likes: 1845,
      comments: 98,
      revenue: 645.00
    },
    thumbnail: '/placeholder.jpg',
    trend: 'up',
    change: '+12%'
  },
  {
    id: '3',
    title: 'Workout Session 💪',
    type: 'image',
    stats: {
      likes: 1654,
      comments: 76,
      revenue: 445.00
    },
    thumbnail: '/placeholder.jpg',
    trend: 'down',
    change: '-5%'
  }
]

const notifications = [
  {
    id: '1',
    title: 'Profile Completion',
    description: 'Complete your profile to increase visibility',
    type: 'action',
    priority: 'high',
    icon: Sparkles
  },
  {
    id: '2',
    title: 'New Feature Available',
    description: 'Try out our new AI content generator',
    type: 'info',
    priority: 'medium',
    icon: Zap
  },
  {
    id: '3',
    title: 'Subscription Milestone',
    description: "You're close to reaching 3,000 subscribers!",
    type: 'achievement',
    priority: 'low',
    icon: Trophy
  }
]

export default function DashboardPage() {
  const { setPageProps } = useDashboard()
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h')

  useEffect(() => {
    setPageProps({
      title: "Overview",
      description: "Your dashboard at a glance",
      showPlatformFilter: true,
      actions: (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full",
              timeframe === '24h' && "bg-white/5"
            )}
            onClick={() => setTimeframe('24h')}
          >
            24h
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full",
              timeframe === '7d' && "bg-white/5"
            )}
            onClick={() => setTimeframe('7d')}
          >
            7d
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full",
              timeframe === '30d' && "bg-white/5"
            )}
            onClick={() => setTimeframe('30d')}
          >
            30d
          </Button>
        </div>
      )
    })
  }, [setPageProps, timeframe])

  return (
    <div className="space-y-8 px-4 py-8 md:px-8 2xl:px-12">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-400">{metric.title}</p>
                  <h3 className="text-2xl font-semibold text-white mt-2 tracking-tight">{metric.value}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-full font-medium",
                        metric.trend === 'up' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-red-500/10 text-red-500'
                      )}
                    >
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {metric.change}
                    </Badge>
                    <span className="text-xs text-zinc-500">vs last {timeframe}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">{metric.description}</p>
                </div>
                <div className={cn(
                  "p-3 rounded-xl ring-1 ring-inset ring-white/10 transition-colors",
                  metric.color === 'emerald' && "bg-emerald-500/10 group-hover:bg-emerald-500/20",
                  metric.color === 'blue' && "bg-blue-500/10 group-hover:bg-blue-500/20",
                  metric.color === 'pink' && "bg-pink-500/10 group-hover:bg-pink-500/20",
                  metric.color === 'purple' && "bg-purple-500/10 group-hover:bg-purple-500/20"
                )}>
                  <metric.icon className={cn(
                    "h-5 w-5",
                    metric.color === 'emerald' && "text-emerald-500",
                    metric.color === 'blue' && "text-blue-500",
                    metric.color === 'pink' && "text-pink-500",
                    metric.color === 'purple' && "text-purple-500"
                  )} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Top Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <p className="text-sm text-zinc-400">Latest updates from your profiles</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-white/5"
                onClick={() => toast.info('Opening activity feed...')}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 group/item">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activity.type === 'subscription' && "bg-emerald-500/10 group-hover/item:bg-emerald-500/20",
                    activity.type === 'message' && "bg-blue-500/10 group-hover/item:bg-blue-500/20",
                    activity.type === 'tip' && "bg-purple-500/10 group-hover/item:bg-purple-500/20"
                  )}>
                    {activity.type === 'subscription' && <Users className="h-4 w-4 text-emerald-500" />}
                    {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'tip' && <DollarSign className="h-4 w-4 text-purple-500" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">{activity.title}</p>
                        <PlatformBadge platform={activity.platform} size="sm" />
                      </div>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Content */}
        <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Top Content</h3>
                <p className="text-sm text-zinc-400">Your best performing content</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-white/5"
                onClick={() => toast.info('Opening content analytics...')}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-6">
              {topContent.map((content) => (
                <div key={content.id} className="group/item flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-zinc-800 ring-1 ring-white/10">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="h-full w-full object-cover transition-transform group-hover/item:scale-110"
                    />
                    {content.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <PlayCircle className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">{content.title}</h4>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-full font-medium",
                          content.trend === 'up' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-red-500/10 text-red-500'
                        )}
                      >
                        {content.trend === 'up' ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {content.change}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {content.stats.likes.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {content.stats.comments.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${content.stats.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <p className="text-sm text-zinc-400">Important updates and alerts</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-white/5"
              onClick={() => toast.info('Opening notification settings...')}
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "relative overflow-hidden p-4 rounded-lg border border-zinc-800/50 transition-colors group/item",
                  notification.priority === 'high' && "bg-red-500/5 hover:bg-red-500/10 border-red-500/10",
                  notification.priority === 'medium' && "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10",
                  notification.priority === 'low' && "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                <div className="relative flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "mt-0.5 p-2 rounded-lg",
                      notification.priority === 'high' && "bg-red-500/10",
                      notification.priority === 'medium' && "bg-yellow-500/10",
                      notification.priority === 'low' && "bg-blue-500/10"
                    )}>
                      <notification.icon className={cn(
                        "h-4 w-4",
                        notification.priority === 'high' && "text-red-500",
                        notification.priority === 'medium' && "text-yellow-500",
                        notification.priority === 'low' && "text-blue-500"
                      )} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">{notification.title}</p>
                      <p className="text-sm text-zinc-400">{notification.description}</p>
                    </div>
                  </div>
                  {notification.type === 'action' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/5"
                      onClick={() => toast.info('Taking action...')}
                    >
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 