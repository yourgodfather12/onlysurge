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
  Trash2,
  Archive
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useDashboard } from '@/app/(dashboard)/layout'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { Platform } from '@/types/dashboard'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

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
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden p-6 bg-background/50 border-border/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Bell className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Unread</h3>
              <p className="text-2xl font-semibold mt-1 text-foreground">
                {notifications.filter(n => n.status === 'unread').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden p-6 bg-background/50 border-border/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Read</h3>
              <p className="text-2xl font-semibold mt-1 text-foreground">
                {notifications.filter(n => n.status === 'read').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden p-6 bg-background/50 border-border/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Archive className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Archived</h3>
              <p className="text-2xl font-semibold mt-1 text-foreground">
                {notifications.filter(n => n.status === 'archived').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={cn(
              "relative overflow-hidden p-4 bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200 group",
              notification.status === 'unread' && "bg-background/60 hover:bg-background/70",
              notification.status === 'read' && "hover:bg-background/60",
              notification.status === 'archived' && "opacity-75 hover:opacity-100 hover:bg-background/60"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-start gap-4">
              <div className={cn(
                "p-2 rounded-lg",
                notification.priority === 'high' && "bg-red-500/10",
                notification.priority === 'medium' && "bg-yellow-500/10",
                notification.priority === 'low' && "bg-blue-500/10"
              )}>
                <notification.icon className={cn(
                  "h-5 w-5",
                  notification.priority === 'high' && "text-red-500",
                  notification.priority === 'medium' && "text-yellow-500",
                  notification.priority === 'low' && "text-blue-500"
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    {notification.status === 'unread' && (
                      <Badge className="bg-[#FF1B6B]/10 text-[#FF1B6B]">New</Badge>
                    )}
                  </div>
                </div>
                {notification.actions && (
                  <div className="flex items-center gap-2 mt-4">
                    {notification.actions.map((action) => (
                      <Button
                        key={action.label}
                        variant={action.primary ? 'default' : 'ghost'}
                        size="sm"
                        className={cn(
                          "rounded-full",
                          action.primary && "bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
                        )}
                        onClick={() => toast.info(`Action: ${action.label}`)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 