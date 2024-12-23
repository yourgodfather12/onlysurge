'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Clock,
  Zap,
  Settings,
  PlayCircle,
  PauseCircle,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  ArrowRight,
  Bell,
  RefreshCw,
  Share2,
} from 'lucide-react'

const automations = [
  {
    title: 'Content Schedule',
    description: 'Auto-post content at optimal times',
    status: 'active',
    lastRun: '2 hours ago',
    nextRun: 'Today at 8:00 PM',
    icon: Calendar,
  },
  {
    title: 'Auto-Response',
    description: 'Send automated replies to messages',
    status: 'paused',
    lastRun: 'Yesterday',
    nextRun: 'Paused',
    icon: MessageSquare,
  },
  {
    title: 'Media Optimization',
    description: 'Automatically optimize uploaded media',
    status: 'active',
    lastRun: '1 hour ago',
    nextRun: 'Real-time',
    icon: ImageIcon,
  },
]

const quickActions = [
  {
    title: 'Schedule Posts',
    description: 'Set up automated content scheduling',
    icon: Clock,
    color: 'text-blue-500',
  },
  {
    title: 'Auto Responses',
    description: 'Configure automated message replies',
    icon: MessageSquare,
    color: 'text-pink-500',
  },
  {
    title: 'Cross-Platform Sync',
    description: 'Sync content across platforms',
    icon: RefreshCw,
    color: 'text-purple-500',
  },
]

const insights = [
  {
    title: 'Time Saved',
    value: '12.5 hours',
    change: '+2.5 hours this week',
    icon: Clock,
  },
  {
    title: 'Active Workflows',
    value: '8',
    change: '2 added recently',
    icon: Zap,
  },
  {
    title: 'Success Rate',
    value: '99.9%',
    change: 'Last 30 days',
    icon: Share2,
  },
]

export default function AutomationPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation</h1>
          <p className="text-gray-400">Streamline your workflow with automated tasks</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Automation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {insights.map((stat) => (
          <Card key={stat.title} className="dashboard-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <stat.icon className="h-8 w-8 text-gray-400 mb-4" />
                <h3 className="font-medium">{stat.title}</h3>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title} className="dashboard-card p-6 hover:cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <action.icon className={`h-8 w-8 ${action.color} mb-4`} />
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{action.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        {automations.map((automation) => (
          <Card key={automation.title} className="dashboard-card overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-800">
                    <automation.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{automation.title}</h3>
                    <p className="text-sm text-gray-400">{automation.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      automation.status === 'active'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {automation.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    {automation.status === 'active' ? (
                      <PauseCircle className="h-5 w-5" />
                    ) : (
                      <PlayCircle className="h-5 w-5" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last run: {automation.lastRun}
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Next run: {automation.nextRun}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 