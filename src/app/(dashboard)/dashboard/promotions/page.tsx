'use client'

import * as React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Filter,
  Search,
  Calendar,
  Users,
  DollarSign,
  ChevronDown,
  BarChart3,
  Clock,
  Target,
  Percent,
  Gift,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Promotion, PromotionStatus } from '@/types/dashboard'
import { cn } from '@/lib/utils'

interface PromotionStat {
  label: string
  value: string
  icon: React.ElementType
  trend?: {
    value: string
    isPositive: boolean
  }
}

export default function PromotionsPage() {
  const { setPageProps } = useDashboard()
  const [selectedStatus, setSelectedStatus] = useState<PromotionStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: promotions = [], isLoading, error } = useDashboardData<Promotion>({
    type: 'promotions',
    filters: {
      status: selectedStatus === 'all' ? undefined : selectedStatus,
      query: searchQuery
    }
  })

  const stats: PromotionStat[] = [
    {
      label: 'Active Promotions',
      value: '12',
      icon: Tag,
      trend: {
        value: '+2',
        isPositive: true
      }
    },
    {
      label: 'Total Subscribers',
      value: '1,234',
      icon: Users,
      trend: {
        value: '+15%',
        isPositive: true
      }
    },
    {
      label: 'Revenue Generated',
      value: '$12,345',
      icon: DollarSign,
      trend: {
        value: '+23%',
        isPositive: true
      }
    },
    {
      label: 'Conversion Rate',
      value: '8.2%',
      icon: Target,
      trend: {
        value: '+1.2%',
        isPositive: true
      }
    }
  ]

  React.useEffect(() => {
    setPageProps({
      title: "Promotions",
      description: "Create and manage your promotional campaigns",
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
            <Plus className="h-4 w-4 mr-2" />
            New Promotion
          </Button>
        </div>
      )
    })
  }, [setPageProps])

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
                    <span className={cn(
                      "text-sm font-medium",
                      stat.trend.isPositive ? "text-emerald-500" : "text-red-500"
                    )}>
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
            placeholder="Search promotions..."
            className="bg-zinc-900/50 border-zinc-800"
            leftIcon={<Search className="h-4 w-4 text-zinc-400" />}
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as PromotionStatus | 'all')}
          className="bg-zinc-900/50 border border-zinc-800 rounded-full text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/20"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="scheduled">Scheduled</option>
          <option value="ended">Ended</option>
        </select>
      </div>

      {/* Promotions List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
          </div>
        ) : promotions.length === 0 ? (
          <EmptyState
            icon={Gift}
            title="No promotions"
            description="Create your first promotion to attract more subscribers"
            action={
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Promotion
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4">
            {promotions.map((promotion) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-pink-500/10">
                      <Percent className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">
                          {promotion.title}
                        </h3>
                        <StatusBadge
                          status={promotion.status}
                          size="sm"
                        />
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">
                        {promotion.description}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{promotion.metrics.conversions} subscribers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${promotion.metrics.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlatformBadge
                      platform={promotion.platform}
                      size="sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <BarChart3 className="h-4 w-4" />
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