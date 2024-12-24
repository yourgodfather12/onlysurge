'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  CheckCircle2,
  Circle,
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Image as ImageIcon,
  Link as LinkIcon,
  Gift,
  Settings,
  ChevronRight,
  ExternalLink,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DashboardCard, DashboardCardHeader, DashboardCardContent } from '@/components/ui/dashboard-card'
import { usePlatform } from '@/lib/platform-context'
import { useDashboard } from '@/app/(dashboard)/layout'
import { cn } from '@/lib/utils'

// Setup checklist items
const setupSteps = [
  {
    id: 'onlyfans',
    title: 'Connect OnlyFans',
    description: "Already have an OnlyFans? Connect it here. If not, we'll help you create one",
    completed: false,
    action: '/dashboard/settings/onlyfans-setup',
    hasAccount: false,
    setupStage: 'start',
    optional: true
  },
  {
    id: 'fansly',
    title: 'Connect Fansly',
    description: "Already have a Fansly? Connect it here. If not, we'll help you create one",
    completed: false,
    action: '/dashboard/settings/fansly-setup',
    hasAccount: false,
    setupStage: 'start',
    optional: true
  }
]

const quickStats = [
  {
    title: 'Total Subscribers',
    value: '1,234',
    change: '+12.3%',
    trend: 'up',
    description: 'vs last month',
    icon: Users,
    colorClass: 'text-blue-500',
    bgColorClass: 'bg-blue-500/10'
  },
  {
    title: 'Revenue',
    value: '$12,345',
    change: '+8.2%',
    trend: 'up',
    description: 'vs last month',
    icon: DollarSign,
    colorClass: 'text-emerald-500',
    bgColorClass: 'bg-emerald-500/10'
  },
  {
    title: 'Growth Rate',
    value: '23.8%',
    change: '-2.1%',
    trend: 'down',
    description: 'vs last month',
    icon: TrendingUp,
    colorClass: 'text-pink-500',
    bgColorClass: 'bg-pink-500/10'
  }
]

const quickActions = [
  {
    title: 'Create Post',
    description: 'Share content with your subscribers',
    href: '/dashboard/posts/new',
    icon: ImageIcon,
    colorClass: 'text-blue-500',
    bgColorClass: 'bg-blue-500/10'
  },
  {
    title: 'Send Message',
    description: 'Engage with your audience',
    href: '/dashboard/messages',
    icon: MessageSquare,
    colorClass: 'text-emerald-500',
    bgColorClass: 'bg-emerald-500/10'
  },
  {
    title: 'Create Link',
    description: 'Share promotional links',
    href: '/dashboard/links',
    icon: LinkIcon,
    colorClass: 'text-pink-500',
    bgColorClass: 'bg-pink-500/10'
  },
  {
    title: 'Special Offer',
    description: 'Create limited time offers',
    href: '/dashboard/offers',
    icon: Gift,
    colorClass: 'text-purple-500',
    bgColorClass: 'bg-purple-500/10'
  }
]

const SetupStep = React.memo(function SetupStep({ step }: { step: typeof setupSteps[0] }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50">
      <div className="mt-1">
        {step.completed ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        ) : (
          <Circle className="h-5 w-5 text-zinc-600" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{step.title}</h3>
          {step.optional && (
            <span className="text-xs text-zinc-500">Optional</span>
          )}
        </div>
        <p className="mt-1 text-sm text-zinc-400">{step.description}</p>
        <div className="mt-3">
          <Button variant="outline" size="sm" className="gap-2">
            {step.completed ? 'View Settings' : 'Get Started'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
})

const QuickStat = React.memo(function QuickStat({ stat }: { stat: typeof quickStats[0] }) {
  return (
    <DashboardCard className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50">
      <DashboardCardContent>
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg', stat.bgColorClass)}>
            <stat.icon className={cn('h-5 w-5', stat.colorClass)} />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-zinc-400">{stat.title}</span>
              <span className={cn(
                'text-sm font-medium',
                stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
              )}>
                {stat.change}
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className="text-xs text-zinc-500">{stat.description}</span>
            </div>
          </div>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  )
})

const QuickAction = React.memo(function QuickAction({ action }: { action: typeof quickActions[0] }) {
  return (
    <DashboardCard className="hover:bg-zinc-800/50">
      <a href={action.href} className="block">
        <DashboardCardContent>
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', action.bgColorClass)}>
              <action.icon className={cn('h-5 w-5', action.colorClass)} />
            </div>
            <div>
              <h3 className="font-medium text-white">{action.title}</h3>
              <p className="text-sm text-zinc-400">{action.description}</p>
            </div>
          </div>
        </DashboardCardContent>
      </a>
    </DashboardCard>
  )
})

export default function DashboardPage() {
  const { setPageProps } = useDashboard()
  const { currentPlatform } = usePlatform()

  React.useEffect(() => {
    setPageProps({
      title: "Dashboard",
      description: "Overview of your creator business",
      showPlatformFilter: true,
      actions: (
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      )
    })
  }, [setPageProps])

  return (
    <div className="space-y-6">
      {/* Setup Progress */}
      <DashboardCard>
        <DashboardCardHeader>
          <h2 className="text-lg font-semibold">Setup Progress</h2>
          <p className="text-sm text-zinc-400">Complete these steps to get started</p>
        </DashboardCardHeader>
        <DashboardCardContent>
          <div className="space-y-4">
            {setupSteps.map((step) => (
              <SetupStep key={step.id} step={step} />
            ))}
          </div>
        </DashboardCardContent>
      </DashboardCard>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((stat) => (
          <QuickStat key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <QuickAction key={action.title} action={action} />
          ))}
        </div>
      </div>

      {/* Preview Image */}
      <div className="relative w-full h-64">
        <Image
          src="/dashboard-preview.png"
          alt="Dashboard Preview"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  )
} 