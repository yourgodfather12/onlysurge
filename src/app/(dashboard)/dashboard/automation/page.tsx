'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  Settings,
  Plus,
  ArrowRight,
  Clock,
  Zap,
  Bot
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDashboard } from '@/app/(dashboard)/layout'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { Badge } from '@/components/ui/badge'

type AutomationStatus = 'active' | 'inactive' | 'error'

interface Automation {
  id: string
  title: string
  description: string
  status: AutomationStatus
  type: 'schedule' | 'response' | 'sync' | 'optimization'
  platform?: {
    id: 'onlyfans' | 'fansly'
    type: 'onlyfans' | 'fansly'
    name: string
    icon: string | null
    status: 'connected' | 'disconnected'
    metrics: {
      subscribers: number
      views: number
      revenue: number
    }
  }
  lastRun: string
  nextRun: string
}

const automations: Automation[] = [
  {
    id: '1',
    title: 'Content Schedule',
    description: 'Auto-post content at optimal times',
    status: 'active',
    type: 'schedule',
    platform: {
      id: 'onlyfans',
      type: 'onlyfans',
      name: 'OnlyFans',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString()
  },
  {
    id: '2',
    title: 'Auto-Response',
    description: 'Send automated replies to messages',
    status: 'inactive',
    type: 'response',
    platform: {
      id: 'fansly',
      type: 'fansly',
      name: 'Fansly',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    nextRun: 'Paused'
  },
  {
    id: '3',
    title: 'Cross-Platform Sync',
    description: 'Sync content across platforms',
    status: 'active',
    type: 'sync',
    lastRun: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 30).toISOString()
  },
  {
    id: '4',
    title: 'Media Optimization',
    description: 'Automatically optimize uploaded media',
    status: 'error',
    type: 'optimization',
    lastRun: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    nextRun: 'Error'
  }
]

const getAutomationIcon = (type: Automation['type']) => {
  switch (type) {
    case 'schedule':
      return Calendar
    case 'response':
      return MessageSquare
    case 'sync':
      return RefreshCw
    case 'optimization':
      return ImageIcon
    default:
      return Clock
  }
}

const getStatusConfig = (status: AutomationStatus) => {
  switch (status) {
    case 'active':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-500'
      }
    case 'inactive':
      return {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-500'
      }
    case 'error':
      return {
        bg: 'bg-red-500/10',
        text: 'text-red-500'
      }
  }
}

export default function AutomationPage() {
  const { setPageProps } = useDashboard()

  useEffect(() => {
    setPageProps({
      title: "Automation",
      description: "Streamline your workflow with automated tasks",
      showPlatformFilter: false,
      actions: (
        <Button
          size="sm"
          className="rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Automation
        </Button>
      )
    })
  }, [setPageProps])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <Zap className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-medium">Active Automations</h3>
              <p className="text-2xl font-semibold mt-1">
                {automations.filter(a => a.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Tasks Today</h3>
              <p className="text-2xl font-semibold mt-1">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Bot className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium">Time Saved</h3>
              <p className="text-2xl font-semibold mt-1">3.5h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Automations List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Active Automations</h3>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
        <div className="space-y-4">
          {automations.map((automation) => {
            const statusConfig = getStatusConfig(automation.status)
            return (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                      {React.createElement(getAutomationIcon(automation.type), {
                        className: `h-5 w-5 ${statusConfig.text}`
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{automation.title}</span>
                          {automation.platform && (
                            <PlatformBadge
                              platform={automation.platform}
                              size="sm"
                            />
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${statusConfig.bg} ${statusConfig.text}`}
                        >
                          {automation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {automation.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-zinc-500">
                          Last run: {new Date(automation.lastRun).toLocaleString()}
                        </span>
                        <span className="text-xs text-zinc-500">•</span>
                        <span className="text-xs text-zinc-500">
                          Next run: {typeof automation.nextRun === 'string' ? automation.nextRun : new Date(automation.nextRun).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        {automation.status === 'active' ? (
                          <PauseCircle className="h-4 w-4" />
                        ) : (
                          <PlayCircle className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <ArrowRight className="h-4 w-4" />
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