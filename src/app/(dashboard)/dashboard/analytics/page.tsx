'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Heart,
  MessageSquare,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Calendar,
  Filter,
  Download,
  Zap,
  Target,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from 'recharts'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const metrics = [
  {
    title: 'Revenue Growth',
    value: '+32.5%',
    change: '+12.5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'emerald',
    description: 'Month over month growth'
  },
  {
    title: 'Subscriber Growth',
    value: '+845',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'blue',
    description: 'New subscribers this month'
  },
  {
    title: 'Avg. Engagement',
    value: '24.5%',
    change: '-2.1%',
    trend: 'down',
    icon: Heart,
    color: 'pink',
    description: 'Per post engagement rate'
  },
  {
    title: 'Content Performance',
    value: '92.3',
    change: '+5.7%',
    trend: 'up',
    icon: Zap,
    color: 'purple',
    description: 'Performance score'
  }
]

const insights = [
  {
    id: '1',
    title: 'Peak Engagement Times',
    description: 'Your content performs best between 6 PM and 9 PM EST',
    type: 'timing',
    icon: Calendar,
    action: 'View Schedule',
    color: 'emerald'
  },
  {
    id: '2',
    title: 'Top Content Category',
    description: 'Lifestyle content generates 45% more engagement',
    type: 'content',
    icon: Target,
    action: 'Content Analysis',
    color: 'blue'
  },
  {
    id: '3',
    title: 'Revenue Opportunity',
    description: 'Increasing post frequency could boost revenue by 25%',
    type: 'revenue',
    icon: DollarSign,
    action: 'View Details',
    color: 'purple'
  }
]

const performanceMetrics = [
  {
    title: 'Views',
    current: '845.2K',
    previous: '721.1K',
    change: '+17.2%',
    trend: 'up'
  },
  {
    title: 'Likes',
    current: '245.8K',
    previous: '198.2K',
    change: '+24.0%',
    trend: 'up'
  },
  {
    title: 'Comments',
    current: '12.4K',
    previous: '10.8K',
    change: '+14.8%',
    trend: 'up'
  },
  {
    title: 'Shares',
    current: '5.2K',
    previous: '5.5K',
    change: '-5.5%',
    trend: 'down'
  },
  {
    title: 'Save Rate',
    current: '18.5%',
    previous: '15.2%',
    change: '+21.7%',
    trend: 'up'
  },
  {
    title: 'Click Rate',
    current: '4.8%',
    previous: '4.2%',
    change: '+14.3%',
    trend: 'up'
  }
]

const timeframes = [
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' }
] as const

type Timeframe = typeof timeframes[number]['value']

const revenueData = [
  { month: 'Jan', revenue: 12500, subscribers: 450, recurring: 10200 },
  { month: 'Feb', revenue: 15800, subscribers: 520, recurring: 12400 },
  { month: 'Mar', revenue: 14200, subscribers: 480, recurring: 11800 },
  { month: 'Apr', revenue: 18900, subscribers: 620, recurring: 15200 },
  { month: 'May', revenue: 17500, subscribers: 580, recurring: 14500 },
  { month: 'Jun', revenue: 22400, subscribers: 720, recurring: 18200 },
  { month: 'Jul', revenue: 24800, subscribers: 780, recurring: 20100 },
  { month: 'Aug', revenue: 28500, subscribers: 850, recurring: 23400 },
  { month: 'Sep', revenue: 32100, subscribers: 920, recurring: 26500 },
  { month: 'Oct', revenue: 35600, subscribers: 980, recurring: 29800 },
  { month: 'Nov', revenue: 38200, subscribers: 1050, recurring: 32100 },
  { month: 'Dec', revenue: 42500, subscribers: 1150, recurring: 35800 }
]

const engagementData = [
  { name: 'Photos', value: 45, interactions: 125000, avgTime: 45 },
  { name: 'Videos', value: 30, interactions: 98000, avgTime: 180 },
  { name: 'Stories', value: 15, interactions: 45000, avgTime: 30 },
  { name: 'Polls', value: 10, interactions: 28000, avgTime: 20 }
]

const dailyEngagement = [
  { hour: '00:00', engagement: 2.1 },
  { hour: '03:00', engagement: 1.5 },
  { hour: '06:00', engagement: 3.2 },
  { hour: '09:00', engagement: 5.8 },
  { hour: '12:00', engagement: 7.2 },
  { hour: '15:00', engagement: 8.5 },
  { hour: '18:00', engagement: 9.8 },
  { hour: '21:00', engagement: 6.5 }
]

const COLORS = {
  primary: '#FF1B6B',
  secondary: '#45CAFF',
  emerald: '#10B981',
  blue: '#3B82F6',
  pink: '#EC4899',
  purple: '#8B5CF6',
  background: '#18181B',
  border: '#27272A'
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 border border-zinc-800 p-4 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="text-sm font-medium text-white mb-2">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-400">{item.name}:</span>
            <span className="text-sm font-medium text-white">
              {item.name === 'revenue' || item.name === 'recurring' 
                ? '$' + item.value.toLocaleString()
                : item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const PieCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-zinc-900/95 border border-zinc-800 p-4 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="text-sm font-medium text-white mb-2">{data.name}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-400">Distribution:</span>
            <span className="text-sm font-medium text-white">{data.value}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-400">Interactions:</span>
            <span className="text-sm font-medium text-white">
              {data.interactions.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-400">Avg. Time:</span>
            <span className="text-sm font-medium text-white">{data.avgTime}s</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const { setPageProps } = useDashboard()
  const [timeframe, setTimeframe] = useState<Timeframe>('30d')
  const [showRecurring, setShowRecurring] = useState(true)

  const handleExportData = () => {
    toast.success('Exporting analytics data...')
    // Here you would implement the actual data export logic
  }

  const handleRefreshData = () => {
    toast.success('Refreshing analytics data...')
    // Here you would implement the actual data refresh logic
  }

  useEffect(() => {
    setPageProps({
      title: "Analytics",
      description: "Track your performance and growth",
      showPlatformFilter: true,
      actions: (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {timeframes.map((tf) => (
              <Button
                key={tf.value}
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full transition-all duration-200",
                  timeframe === tf.value 
                    ? "bg-white/10 text-white" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
                onClick={() => setTimeframe(tf.value)}
              >
                {tf.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full gap-2 text-zinc-400 hover:text-white hover:bg-white/5"
              onClick={() => toast.info('Opening filters...')}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
              onClick={handleExportData}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 hover:from-pink-500/20 hover:to-violet-500/20 text-white"
              onClick={handleRefreshData}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      )
    })
  }, [setPageProps, timeframe])

  return (
    <div className="space-y-8 px-4 py-8 md:px-8 2xl:px-12">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-200 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-400">{metric.title}</p>
                  <h3 className="text-2xl font-semibold text-white mt-2 tracking-tight">{metric.value}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-full font-medium transition-colors duration-200",
                        metric.trend === 'up' 
                          ? 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20' 
                          : 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20'
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
                  "p-3 rounded-xl ring-1 ring-inset ring-white/10 transition-all duration-200",
                  metric.color === 'emerald' && "bg-emerald-500/10 group-hover:bg-emerald-500/20",
                  metric.color === 'blue' && "bg-blue-500/10 group-hover:bg-blue-500/20",
                  metric.color === 'pink' && "bg-pink-500/10 group-hover:bg-pink-500/20",
                  metric.color === 'purple' && "bg-purple-500/10 group-hover:bg-purple-500/20"
                )}>
                  <metric.icon className={cn(
                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
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

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/5 via-transparent to-[#45CAFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Revenue Growth</h3>
                <p className="text-sm text-zinc-400">Monthly revenue breakdown</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full transition-colors duration-200",
                    showRecurring ? "bg-white/10 text-white" : "text-zinc-400"
                  )}
                  onClick={() => setShowRecurring(!showRecurring)}
                >
                  Show Recurring
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-white/5"
                  onClick={() => toast.info('Opening revenue details...')}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRecurring" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    dataKey="month"
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  {showRecurring && (
                    <Area
                      type="monotone"
                      dataKey="recurring"
                      stroke={COLORS.secondary}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRecurring)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Engagement Chart */}
        <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-200 group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/5 via-transparent to-[#45CAFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Engagement Distribution</h3>
                <p className="text-sm text-zinc-400">Engagement by content type</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-white/5"
                onClick={() => toast.info('Opening engagement details...')}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[Object.keys(COLORS)[index] as keyof typeof COLORS]} 
                        className="transition-all duration-200 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieCustomTooltip />} />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                        {value}
                      </span>
                    )}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Engagement Distribution */}
      <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-200 group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/5 via-transparent to-[#45CAFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">Daily Engagement Distribution</h3>
              <p className="text-sm text-zinc-400">Engagement levels throughout the day</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-white/5"
              onClick={() => toast.info('Opening daily details...')}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="hour"
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-900/95 border border-zinc-800 p-4 rounded-lg shadow-xl backdrop-blur-sm">
                          <p className="text-sm font-medium text-white mb-2">{label}</p>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-zinc-400">Engagement:</span>
                            <span className="text-sm font-medium text-white">
                              {payload[0].value}%
                            </span>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey="engagement"
                  fill={COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-200 hover:opacity-80"
                >
                  {dailyEngagement.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#barGradient-${index})`}
                    />
                  ))}
                </Bar>
                <defs>
                  {dailyEngagement.map((entry, index) => (
                    <linearGradient
                      key={`barGradient-${index}`}
                      id={`barGradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={COLORS.primary}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor={COLORS.secondary}
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  ))}
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-200 group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/5 via-transparent to-[#45CAFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
              <p className="text-sm text-zinc-400">Detailed performance breakdown</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-4 rounded-lg border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-200 group/metric">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-400">{metric.title}</span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-full font-medium transition-colors duration-200",
                        metric.trend === 'up' 
                          ? 'bg-emerald-500/10 text-emerald-500 group-hover/metric:bg-emerald-500/20' 
                          : 'bg-red-500/10 text-red-500 group-hover/metric:bg-red-500/20'
                      )}
                    >
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="mt-1">
                    <span className="text-lg font-semibold text-white">{metric.current}</span>
                    <span className="text-xs text-zinc-500 ml-2">prev: {metric.previous}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-200 group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/5 via-transparent to-[#45CAFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">AI Insights</h3>
              <p className="text-sm text-zinc-400">AI-powered recommendations</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="group/item relative overflow-hidden p-4 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/30 transition-all duration-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg transition-colors duration-200",
                        insight.color === 'emerald' && "bg-emerald-500/10 group-hover/item:bg-emerald-500/20",
                        insight.color === 'blue' && "bg-blue-500/10 group-hover/item:bg-blue-500/20",
                        insight.color === 'purple' && "bg-purple-500/10 group-hover/item:bg-purple-500/20"
                      )}>
                        <insight.icon className={cn(
                          "h-4 w-4 transition-transform duration-200 group-hover/item:scale-110",
                          insight.color === 'emerald' && "text-emerald-500",
                          insight.color === 'blue' && "text-blue-500",
                          insight.color === 'purple' && "text-purple-500"
                        )} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-white">{insight.title}</p>
                        <p className="text-sm text-zinc-400">{insight.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 rounded-full hover:bg-white/5 transition-all duration-200"
                      onClick={() => toast.info(`Opening ${insight.action.toLowerCase()}...`)}
                    >
                      {insight.action}
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover/item:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 