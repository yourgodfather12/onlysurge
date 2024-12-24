'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  DollarSign,
  Users,
  Star,
  Bell,
  Settings,
  Filter,
  Search,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useDashboard } from '@/app/(dashboard)/layout'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { Platform } from '@/types/dashboard'

type NotificationType = 'message' | 'payment' | 'subscriber' | 'system'
type NotificationStatus = 'unread' | 'read' | 'archived'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  status: NotificationStatus
  platform?: Platform
  createdAt: string
  data?: {
    amount?: number
    username?: string
    messageId?: string
  }
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from @username',
    status: 'unread',
    platform: {
      id: 'onlyfans',
      name: 'OnlyFans',
      type: 'onlyfans',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    data: {
      username: '@username',
      messageId: '123'
    }
  },
  {
    id: '2',
    type: 'payment',
    title: 'New Payment',
    message: 'You received a tip of $50.00',
    status: 'unread',
    platform: {
      id: 'fansly',
      name: 'Fansly',
      type: 'fansly',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    data: {
      amount: 50.00
    }
  },
  {
    id: '3',
    type: 'subscriber',
    title: 'New Subscriber',
    message: '@newuser subscribed to your content',
    status: 'read',
    platform: {
      id: 'onlyfans',
      name: 'OnlyFans',
      type: 'onlyfans',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    data: {
      username: '@newuser'
    }
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'New features are now available',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  }
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'message':
      return MessageSquare
    case 'payment':
      return DollarSign
    case 'subscriber':
      return Users
    case 'system':
      return Star
    default:
      return Bell
  }
}

const getStatusConfig = (status: NotificationStatus) => {
  switch (status) {
    case 'unread':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        label: 'Unread'
      }
    case 'read':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-500',
        label: 'Read'
      }
    case 'archived':
      return {
        bg: 'bg-zinc-500/10',
        text: 'text-zinc-500',
        label: 'Archived'
      }
  }
}

export default function NotificationsPage() {
  const { setPageProps } = useDashboard()

  useEffect(() => {
    setPageProps({
      title: "Notifications",
      description: "Stay updated with your latest activity",
      showPlatformFilter: false
    })
  }, [setPageProps])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Bell className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Unread</h3>
              <p className="text-2xl font-semibold mt-1">
                {notifications.filter(n => n.status === 'unread').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-medium">Read</h3>
              <p className="text-2xl font-semibold mt-1">
                {notifications.filter(n => n.status === 'read').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-zinc-500/10">
              <Clock className="h-6 w-6 text-zinc-500" />
            </div>
            <div>
              <h3 className="font-medium">Last 24h</h3>
              <p className="text-2xl font-semibold mt-1">
                {notifications.filter(n => {
                  const date = new Date(n.createdAt)
                  const now = new Date()
                  const diff = now.getTime() - date.getTime()
                  return diff <= 1000 * 60 * 60 * 24
                }).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Notifications</h3>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search notifications..."
              className="w-64"
              startDecorator={<Search className="h-4 w-4 text-zinc-400" />}
            />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => {
            const statusConfig = getStatusConfig(notification.status)
            const NotificationIcon = getNotificationIcon(notification.type)
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                      <NotificationIcon className={`h-5 w-5 ${statusConfig.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{notification.title}</span>
                          {notification.platform && (
                            <PlatformBadge
                              platform={notification.platform}
                              size="sm"
                            />
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${statusConfig.bg} ${statusConfig.text}`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {notification.message}
                      </p>
                      <span className="text-xs text-zinc-500 mt-2 block">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {notification.status === 'unread' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Card>
    </div>
  )
} 