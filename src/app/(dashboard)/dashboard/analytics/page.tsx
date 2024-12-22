'use client'

import { useState, Suspense, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBarIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentArrowDownIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line
} from 'recharts'

// Sample data for the charts
const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 18000 },
  { name: 'Apr', value: 16000 },
  { name: 'May', value: 21000 },
  { name: 'Jun', value: 19000 },
  { name: 'Jul', value: 24000 },
].map(item => ({
  ...item,
  value: item.value + Math.random() * 5000
}))

const engagementData = [
  { name: 'Jan', likes: 1200, comments: 800, shares: 400 },
  { name: 'Feb', likes: 1500, comments: 1000, shares: 600 },
  { name: 'Mar', likes: 1800, comments: 1200, shares: 800 },
  { name: 'Apr', likes: 1600, comments: 900, shares: 500 },
  { name: 'May', likes: 2100, comments: 1400, shares: 900 },
  { name: 'Jun', likes: 1900, comments: 1100, shares: 700 },
  { name: 'Jul', likes: 2400, comments: 1600, shares: 1100 },
].map(item => ({
  ...item,
  likes: item.likes + Math.random() * 500,
  comments: item.comments + Math.random() * 300,
  shares: item.shares + Math.random() * 200
}))

const metrics = [
  {
    name: 'Total Revenue',
    value: '$24,567',
    change: '+12.5%',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Active Subscribers',
    value: '2,651',
    change: '+15.2%',
    icon: UsersIcon
  },
  {
    name: 'Engagement Rate',
    value: '24.3%',
    change: '+5.4%',
    icon: ArrowTrendingUpIcon
  },
  {
    name: 'Content Views',
    value: '45.2K',
    change: '+28.4%',
    icon: ChartBarIcon
  },
]

const topContent = [
  {
    id: 1,
    title: 'Summer Photoshoot Collection',
    views: '12.5K',
    revenue: '$1,234',
    engagement: '8.9%'
  },
  {
    id: 2,
    title: 'Behind the Scenes Vlog',
    views: '8.2K',
    revenue: '$956',
    engagement: '7.5%'
  },
  {
    id: 3,
    title: 'Fitness Routine Guide',
    views: '6.7K',
    revenue: '$789',
    engagement: '6.8%'
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg shadow-lg">
        <p className="text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-gray-400">{entry.name}:</span>
            <span className="text-white font-medium">
              {typeof entry.value === 'number' 
                ? entry.value.toLocaleString('en-US', {
                    style: entry.name.toLowerCase().includes('revenue') ? 'currency' : 'decimal',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                : entry.value
              }
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse bg-gray-800 h-16 rounded-lg" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse bg-gray-800 h-32 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse bg-gray-800 h-96 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900 rounded-xl p-6 hover:ring-2 hover:ring-primary/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-gray-800 rounded-lg">
              <metric.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center text-sm">
              {metric.change.startsWith('+') ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {metric.change}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
            <p className="text-sm text-gray-400">{metric.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-900 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
          <p className="text-sm text-gray-400">Monthly revenue performance</p>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

function EngagementChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-900 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Engagement Metrics</h3>
          <p className="text-sm text-gray-400">User interaction analysis</p>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <DocumentArrowDownIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={engagementData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-gray-400">{value}</span>}
            />
            <Bar dataKey="likes" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill="#EC4899" radius={[4, 4, 0, 0]} />
            <Bar dataKey="shares" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const handleTimeRangeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value)
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Track your performance and growth</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <CalendarDaysIcon className="w-5 h-5 mr-2" />
            Custom Range
          </button>
          <select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary appearance-none transition-colors hover:bg-gray-800"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Dashboard Sections */}
      <Suspense fallback={<LoadingState />}>
        <MetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <EngagementChart />
        </div>
      </Suspense>
    </div>
  )
} 