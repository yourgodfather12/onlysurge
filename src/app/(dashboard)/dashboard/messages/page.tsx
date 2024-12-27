'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Users,
  Bot,
  Star,
  Clock,
  Search,
  Filter,
  Settings,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  RefreshCcw,
  MoreHorizontal
} from 'lucide-react'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

// Sample data - replace with real data from your API
const automatedResponses = [
  {
    id: '1',
    name: 'Welcome Message',
    status: 'active',
    platforms: ['onlyfans', 'fansly'],
    triggers: ['new subscriber'],
    messagePreview: 'Hey! Thanks for subscribing! Here\'s what you can expect...',
    stats: {
      sent: 1250,
      opened: 1100,
      replied: 450
    }
  },
  {
    id: '2',
    name: 'Content Promotion',
    status: 'active',
    platforms: ['onlyfans'],
    triggers: ['scheduled', 'new post'],
    messagePreview: 'Don\'t miss out on my latest content! Check it out here...',
    stats: {
      sent: 850,
      opened: 720,
      replied: 280
    }
  },
  {
    id: '3',
    name: 'Re-engagement',
    status: 'paused',
    platforms: ['fansly'],
    triggers: ['inactive subscriber'],
    messagePreview: 'Hey! I noticed you\'ve been away. Here\'s what you\'ve missed...',
    stats: {
      sent: 320,
      opened: 280,
      replied: 95
    }
  }
]

const recentMessages = [
  {
    id: '1',
    user: {
      name: 'Alex Thompson',
      avatar: '/avatars/alex.jpg',
      platform: 'onlyfans',
      status: 'subscriber',
      subscribed: '2 months'
    },
    preview: 'Love your content! Quick question about...',
    timestamp: '2 min ago',
    isAutomated: false,
    unread: true
  },
  {
    id: '2',
    user: {
      name: 'Sarah Miller',
      avatar: '/avatars/sarah.jpg',
      platform: 'fansly',
      status: 'new',
      subscribed: '1 day'
    },
    preview: '[Welcome Message] Hey! Thanks for subscribing...',
    timestamp: '15 min ago',
    isAutomated: true,
    unread: false
  }
]

const messageStats = [
  {
    title: 'Total Messages',
    value: '2.4K',
    change: '+12.5%',
    trend: 'up',
    icon: MessageSquare,
    color: 'blue'
  },
  {
    title: 'Response Rate',
    value: '92.3%',
    change: '+5.2%',
    trend: 'up',
    icon: Zap,
    color: 'emerald'
  },
  {
    title: 'Avg. Response Time',
    value: '8m',
    change: '-25%',
    trend: 'up',
    icon: Clock,
    color: 'purple'
  },
  {
    title: 'AI Responses',
    value: '68%',
    change: '+15.3%',
    trend: 'up',
    icon: Sparkles,
    color: 'pink'
  }
]

export default function MessagesPage() {
  const { setPageProps } = useDashboard()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  useEffect(() => {
    setPageProps({
      title: "Messages",
      description: "Manage conversations and automated responses",
      showPlatformFilter: false,
      actions: (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full gap-2 text-zinc-400 hover:text-white hover:bg-white/5"
              onClick={() => toast.info('Opening message settings...')}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full gap-2 text-zinc-400 hover:text-white hover:bg-white/5"
              onClick={() => toast.info('Refreshing messages...')}
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      )
    })
  }, [setPageProps])

  return (
    <div className="space-y-8">
      {/* Message Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {messageStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden p-6 bg-background/50 border-border/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-semibold text-foreground mt-2 tracking-tight">{stat.value}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-full font-medium transition-colors duration-200",
                        stat.trend === 'up' 
                          ? 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20' 
                          : 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20'
                      )}
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={cn(
                  "p-3 rounded-xl ring-1 ring-inset ring-white/10 transition-all duration-200",
                  stat.color === 'emerald' && "bg-emerald-500/10 group-hover:bg-emerald-500/20",
                  stat.color === 'blue' && "bg-blue-500/10 group-hover:bg-blue-500/20",
                  stat.color === 'pink' && "bg-pink-500/10 group-hover:bg-pink-500/20",
                  stat.color === 'purple' && "bg-purple-500/10 group-hover:bg-purple-500/20"
                )}>
                  <stat.icon className={cn(
                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                    stat.color === 'emerald' && "text-emerald-500",
                    stat.color === 'blue' && "text-blue-500",
                    stat.color === 'pink' && "text-pink-500",
                    stat.color === 'purple' && "text-purple-500"
                  )} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-9 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-2 text-muted-foreground hover:text-foreground hover:bg-white/5"
            onClick={() => toast.info('Opening filters...')}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button
            variant="default"
            size="sm"
            className="rounded-full gap-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
            onClick={() => toast.info('Creating new automated response...')}
          >
            <Bot className="h-4 w-4" />
            New AI Response
          </Button>
        </div>
      </div>

      {/* Automated Responses */}
      <div className="grid gap-6">
        {automatedResponses.map((response) => (
          <Card
            key={response.id}
            className="relative overflow-hidden p-6 bg-background/50 border-border/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-pink-500/10">
                    <Bot className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{response.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-full",
                          response.status === 'active' 
                            ? "bg-emerald-500/10 text-emerald-500" 
                            : "bg-yellow-500/10 text-yellow-500"
                        )}
                      >
                        {response.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {response.platforms.map((platform) => (
                          <PlatformBadge
                            key={platform}
                            platform={{ type: platform, name: platform }}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-white/5"
                  onClick={() => toast.info('Opening menu...')}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{response.messagePreview}</p>
              </div>

              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Triggers:</span>
                  <div className="flex items-center gap-1">
                    {response.triggers.map((trigger) => (
                      <Badge
                        key={trigger}
                        variant="secondary"
                        className="rounded-full bg-muted/50 text-muted-foreground"
                      >
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground">Sent</div>
                  <div className="text-sm font-medium text-foreground mt-1">
                    {response.stats.sent.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground">Opened</div>
                  <div className="text-sm font-medium text-foreground mt-1">
                    {response.stats.opened.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <div className="text-xs text-muted-foreground">Replied</div>
                  <div className="text-sm font-medium text-foreground mt-1">
                    {response.stats.replied.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 