'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  Search,
  Filter,
  RefreshCcw,
  Plus,
  ArrowUpRight,
  Star,
  Mail,
  MoreVertical,
  Bot,
  Sparkles,
  Target,
  Send,
  Archive,
  Trash2,
  Clock,
  Heart,
  Image,
  Paperclip,
  Smile,
  Eye,
  Save,
  Link,
  Settings,
  Layout,
  Palette,
  Type,
  FileImage,
  Video,
  Music,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Gift,
  Zap,
  MessageSquare,
  Copy,
  ExternalLink,
  Edit,
  LineChart,
  PieChart,
  Activity,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/page-container'
import { DashboardCard, DashboardCardHeader, DashboardCardContent } from '@/components/ui/dashboard-card'
import { usePlatform } from '@/lib/platform-context'

interface Metric {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  platform: string
  icon: React.ComponentType
  color: string
}

interface AnalyticsState {
  isLoading: boolean
  error: Error | null
  data: {
    metrics: Metric[]
    insights: any[]
    charts: any[]
  }
}

const metrics = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$12,345',
    change: '+12.3%',
    trend: 'up',
    platform: 'onlyfans',
    icon: DollarSign,
    color: 'green',
  },
  {
    id: '2',
    title: 'Active Subscribers',
    value: '1,234',
    change: '+5.2%',
    trend: 'up',
    platform: 'all',
    icon: Users,
    color: 'blue',
  },
  {
    id: '3',
    title: 'Engagement Rate',
    value: '8.7%',
    change: '-2.1%',
    trend: 'down',
    platform: 'all',
    icon: Activity,
    color: 'pink',
  },
  {
    id: '4',
    title: 'Content Views',
    value: '45.6K',
    change: '+8.4%',
    trend: 'up',
    platform: 'all',
    icon: Eye,
    color: 'purple',
  },
]

const quickActions = [
  {
    title: 'Export Report',
    description: 'Download analytics data',
    icon: Download,
    color: 'green',
    onClick: () => console.log('Export'),
  },
  {
    title: 'AI Insights',
    description: 'Get AI analysis of your data',
    icon: Bot,
    color: 'purple',
    onClick: () => console.log('AI Insights'),
  },
  {
    title: 'Schedule Report',
    description: 'Set up automated reports',
    icon: Calendar,
    color: 'blue',
    onClick: () => console.log('Schedule'),
  },
]

const insights = [
  {
    title: 'Peak Hours',
    description: 'Most active: 6PM - 10PM EST',
    icon: Clock,
    color: 'blue',
    trend: 'neutral',
  },
  {
    title: 'Top Content',
    description: 'Photos perform 2x better',
    icon: Image,
    color: 'pink',
    trend: 'up',
  },
  {
    title: 'Growth Rate',
    description: '15% MoM subscriber growth',
    icon: TrendingUp,
    color: 'green',
    trend: 'up',
  },
]

const charts = [
  {
    id: '1',
    title: 'Revenue Overview',
    description: 'Monthly revenue breakdown',
    type: 'bar',
    icon: BarChart3,
    color: 'green',
  },
  {
    id: '2',
    title: 'Subscriber Growth',
    description: 'Subscriber count over time',
    type: 'line',
    icon: LineChart,
    color: 'blue',
  },
  {
    id: '3',
    title: 'Content Performance',
    description: 'Engagement by content type',
    type: 'pie',
    icon: PieChart,
    color: 'pink',
  },
]

export default function AnalyticsPage() {
  const [state, setState] = useState<AnalyticsState>({
    isLoading: true,
    error: null,
    data: {
      metrics: [],
      insights: [],
      charts: []
    }
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { platforms, currentPlatform, setCurrentPlatform } = usePlatform()

  useEffect(() => {
    fetchAnalyticsData()
  }, [currentPlatform])

  const fetchAnalyticsData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }))
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setState(prev => ({
        isLoading: false,
        error: null,
        data: {
          metrics,
          insights,
          charts
        }
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error
      }))
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'up':
        return 'green'
      case 'down':
        return 'red'
      default:
        return 'zinc'
    }
  }

  if (state.isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col gap-6">
          <DashboardCard>
            <DashboardCardContent>
              <div className="h-40 animate-pulse bg-zinc-800/50 rounded-lg" />
            </DashboardCardContent>
          </DashboardCard>
        </div>
      </PageContainer>
    )
  }

  if (state.error) {
    return (
      <PageContainer>
        <DashboardCard>
          <DashboardCardContent>
            <div className="text-center text-red-500">
              Error loading analytics: {state.error.message}
            </div>
          </DashboardCardContent>
        </DashboardCard>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <p className="text-sm text-zinc-400">Track your performance and growth metrics.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-pink-500/20"
              onClick={handleRefresh}
            >
              <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-pink-500/20"
            >
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-pink-500/20"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {state.data.metrics.map((metric) => (
            <DashboardCard key={metric.id} className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50">
              <DashboardCardContent>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-${metric.color}-500/10`}>
                    <metric.icon className={`h-5 w-5 text-${metric.color}-500`} />
                  </div>
                  <span className={`text-sm font-medium text-${getTrendColor(metric.trend)}-500`}>
                    {metric.change}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-zinc-400">{metric.title}</h3>
                  <p className="text-2xl font-semibold mt-1">{metric.value}</p>
                </div>
              </DashboardCardContent>
            </DashboardCard>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Charts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Performance Charts</h2>
                  <p className="text-sm text-zinc-400">Visualize your key metrics</p>
                </div>
              </div>
              <div className="space-y-4">
                {state.data.charts.map((chart) => (
                  <DashboardCard key={chart.id} className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50">
                    <DashboardCardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${chart.color}-500/10`}>
                            <chart.icon className={`h-5 w-5 text-${chart.color}-500`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{chart.title}</h3>
                            <p className="text-sm text-zinc-400">{chart.description}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      {/* Chart placeholder */}
                      <div className="h-64 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                        <p className="text-sm text-zinc-400">Chart visualization will be rendered here</p>
                      </div>
                    </DashboardCardContent>
                  </DashboardCard>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Quick Actions</h2>
                  <p className="text-sm text-zinc-400">Tools to analyze data</p>
                </div>
              </div>
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <DashboardCard 
                    key={action.title} 
                    onClick={action.onClick}
                    className="hover:bg-zinc-800/50"
                  >
                    <DashboardCardHeader
                      icon={<action.icon className={`h-5 w-5 text-${action.color}-500`} />}
                      title={action.title}
                      description={action.description}
                    />
                  </DashboardCard>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Insights</h2>
                  <p className="text-sm text-zinc-400">Key findings from your data</p>
                </div>
              </div>
              <div className="space-y-4">
                {state.data.insights.map((insight) => (
                  <DashboardCard key={insight.title} className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50">
                    <DashboardCardContent>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${insight.color}-500/10`}>
                          <insight.icon className={`h-5 w-5 text-${insight.color}-500`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{insight.title}</h3>
                          <p className="text-sm text-zinc-400">{insight.description}</p>
                        </div>
                      </div>
                    </DashboardCardContent>
                  </DashboardCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
} 