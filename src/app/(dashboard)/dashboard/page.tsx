'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowUpRight, 
  ArrowRight, 
  Calendar, 
  Filter, 
  Download,
  Eye,
  Heart,
  DollarSign,
  RefreshCcw,
} from 'lucide-react'
import { stats, quickActions, recentActivity, topContent } from '@/lib/dashboard-data'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface StatCardProps {
  name: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
}

interface QuickActionProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
}

interface ActivityItemProps {
  type: string
  message: string
  timestamp: string
  icon: React.ElementType
}

interface ContentItemProps {
  title: string
  type: string
  views: string
  engagement: string
  revenue: string
  icon: React.ElementType
}

const StatCard = ({ name, value, change, trend, icon: Icon }: StatCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="dashboard-card p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-gray-800/20 to-transparent rounded-full" />
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-gray-800/50">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <span className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {change}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400">{name}</h3>
        <p className="mt-2 text-3xl font-semibold">{value}</p>
      </div>
    </Card>
  </motion.div>
)

const QuickAction = ({ title, description, icon: Icon, color }: QuickActionProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card className="dashboard-card p-6 hover:cursor-pointer hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div>
          <div className={`p-2 rounded-lg bg-gray-800/50 inline-block mb-4`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400" />
      </div>
    </Card>
  </motion.div>
)

const ActivityItem = ({ message, timestamp, icon: Icon }: ActivityItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors cursor-pointer group">
      <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <div className="flex-1">
        <p className="font-medium group-hover:text-blue-400 transition-colors">{message}</p>
        <p className="text-sm text-gray-400">{timestamp}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </motion.div>
)

const ContentItem = ({ title, views, engagement, revenue, icon: Icon, type }: ContentItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors cursor-pointer group">
      <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
        <Icon className="h-5 w-5 text-pink-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate group-hover:text-pink-400 transition-colors">{title}</p>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">{type}</span>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {views} views
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {engagement} engagement
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            {revenue} earned
          </span>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </motion.div>
)

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  useEffect(() => {
    // Simulate initial loading
    handleRefresh()
  }, [timeRange])

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleRefresh}
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last {timeRange}
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="24h">24h</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
              <option value="90d">90 days</option>
            </select>
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={timeRange}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard 
                  name={stat.name}
                  value={stat.value}
                  change={stat.change}
                  trend={stat.trend}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <QuickAction {...action} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="dashboard-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                View all
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Top Performing Content</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                View all
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-4">
              {topContent.map((content, index) => (
                <ContentItem key={index} {...content} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 