'use client'

import * as React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Filter,
  Search,
  Users,
  DollarSign,
  ChevronDown,
  BarChart3,
  Clock,
  Target,
  Heart,
  MessageSquare,
  Mail,
  Star,
  Gift,
  Settings,
  MoreVertical
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { Subscriber, SubscriberStatus } from '@/types/dashboard'

interface SubscriberStat {
  label: string
  value: string
  icon: React.ElementType
  trend?: {
    value: string
    isPositive: boolean
  }
}

export default function SubscribersPage() {
  const [selectedStatus, setSelectedStatus] = useState<SubscriberStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: subscribers = [], isLoading } = useDashboardData<Subscriber>({
    type: 'subscribers',
    filters: {
      status: selectedStatus === 'all' ? undefined : selectedStatus,
      query: searchQuery
    }
  })

  const totalSubscribers = subscribers.length
  const monthlyRevenue = subscribers.reduce((total, sub) => total + (sub.totalSpent || 0), 0)
  const engagementRate = Math.round((subscribers.filter(sub => sub.lastActive > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).length / totalSubscribers) * 100)
  const retentionRate = Math.round((subscribers.filter(sub => sub.status === 'active').length / totalSubscribers) * 100)

  const stats: SubscriberStat[] = [
    {
      label: 'Total Subscribers',
      value: totalSubscribers.toString(),
      icon: Users,
      trend: {
        value: '+15%',
        isPositive: true
      }
    },
    {
      label: 'Monthly Revenue',
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      trend: {
        value: '+23%',
        isPositive: true
      }
    },
    {
      label: 'Engagement Rate',
      value: `${engagementRate}%`,
      icon: Heart,
      trend: {
        value: '+5%',
        isPositive: true
      }
    },
    {
      label: 'Retention Rate',
      value: `${retentionRate}%`,
      icon: Target,
      trend: {
        value: '+2%',
        isPositive: true
      }
    }
  ]

  // Add pageProps to the root layout context
  React.useEffect(() => {
    const event = new CustomEvent('updatePageProps', { 
      detail: {
        title: "Subscribers",
        description: "Manage your subscribers and fan relationships",
        showPlatformFilter: true,
        actions: (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              size="sm"
              className="rounded-full"
            >
              <Mail className="h-4 w-4 mr-2" />
              Message All
            </Button>
          </div>
        )
      }
    })
    window.dispatchEvent(event)
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-pink-500/10">
                <stat.icon className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  {stat.trend && (
                    <span className={`text-sm font-medium ${
                      stat.trend.isPositive ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {stat.trend.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subscribers..."
            className="bg-zinc-900/50 border-zinc-800"
            leftIcon={<Search className="h-4 w-4 text-zinc-400" />}
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as SubscriberStatus | 'all')}
          className="bg-zinc-900/50 border border-zinc-800 rounded-full text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/20"
        >
          <option value="all">All Subscribers</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="trial">Trial</option>
        </select>
      </div>

      {/* Subscribers List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
          </div>
        ) : subscribers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No subscribers"
            description="Share your profile to start growing your fan base"
            action={
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4">
            {subscribers.map((subscriber) => (
              <motion.div
                key={subscriber.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={subscriber.avatar}
                        alt={subscriber.username}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1">
                        <PlatformBadge
                          platform={subscriber.platform}
                          size="sm"
                          showLabel={false}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">
                          {subscriber.username}
                        </h3>
                        <StatusBadge
                          status={subscriber.status}
                          size="sm"
                        />
                        {subscriber.isVIP && (
                          <div className="p-1 rounded-full bg-amber-500/10">
                            <Star className="h-3 w-3 text-amber-500" />
                          </div>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Joined {new Date(subscriber.joinedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${subscriber.totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{subscriber.messageCount} messages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
