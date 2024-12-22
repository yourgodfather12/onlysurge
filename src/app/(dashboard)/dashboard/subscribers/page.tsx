'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UsersIcon, 
  HeartIcon, 
  ChartBarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import StatCard from '@/components/dashboard/StatCard'
import ChartCard from '@/components/dashboard/ChartCard'
import DataTable from '@/components/dashboard/DataTable'

// Sample data for the charts
const subscriberGrowthData = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1500 },
  { name: 'Mar', value: 1800 },
  { name: 'Apr', value: 1600 },
  { name: 'May', value: 2100 },
  { name: 'Jun', value: 1900 },
  { name: 'Jul', value: 2400 },
].map(item => ({
  ...item,
  value: item.value + Math.random() * 500
}))

const retentionData = [
  { name: 'Jan', retained: 92, churned: 8 },
  { name: 'Feb', retained: 94, churned: 6 },
  { name: 'Mar', retained: 91, churned: 9 },
  { name: 'Apr', retained: 95, churned: 5 },
  { name: 'May', retained: 93, churned: 7 },
  { name: 'Jun', retained: 96, churned: 4 },
  { name: 'Jul', retained: 94, churned: 6 },
]

const metrics = [
  {
    name: 'Total Subscribers',
    value: '2,651',
    change: '+15.2%',
    trend: 'up' as const,
    icon: UsersIcon
  },
  {
    name: 'Monthly Growth',
    value: '+324',
    change: '+28.4%',
    trend: 'up' as const,
    icon: ChartBarIcon
  },
  {
    name: 'Retention Rate',
    value: '94.2%',
    change: '+5.4%',
    trend: 'up' as const,
    icon: HeartIcon
  },
  {
    name: 'Avg. Revenue/Sub',
    value: '$24.50',
    change: '+12.5%',
    trend: 'up' as const,
    icon: ChartBarIcon
  },
]

const subscribers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    status: 'active',
    subscribed: 'Dec 10, 2023',
    revenue: '$125.00',
    engagement: 'High'
  },
  {
    id: 2,
    name: 'Mike Wilson',
    email: 'mike.w@example.com',
    status: 'active',
    subscribed: 'Nov 28, 2023',
    revenue: '$75.50',
    engagement: 'Medium'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    status: 'inactive',
    subscribed: 'Oct 15, 2023',
    revenue: '$250.00',
    engagement: 'Low'
  },
  {
    id: 4,
    name: 'Chris Anderson',
    email: 'chris.a@example.com',
    status: 'active',
    subscribed: 'Dec 1, 2023',
    revenue: '$180.00',
    engagement: 'High'
  },
  {
    id: 5,
    name: 'Jessica Lee',
    email: 'jessica.l@example.com',
    status: 'active',
    subscribed: 'Nov 15, 2023',
    revenue: '$95.00',
    engagement: 'Medium'
  }
]

export default function SubscribersPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          <p className="text-gray-400">Manage and analyze your subscriber base.</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary appearance-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.name}
            title={metric.name}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Subscriber Growth"
          type="area"
          data={subscriberGrowthData}
          dataKeys={{ x: 'name', y: 'value' }}
        />
        <ChartCard
          title="Retention Rate"
          type="bar"
          data={retentionData}
          dataKeys={{
            x: 'name',
            y: ['retained', 'churned'],
            colors: ['#8B5CF6', '#EC4899']
          }}
        />
      </div>

      {/* Subscribers Table */}
      <div className="rounded-xl bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Subscriber List</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subscribers..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary w-64"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>
        <DataTable
          columns={[
            {
              key: 'name',
              title: 'Subscriber',
              render: (value, row) => (
                <div>
                  <div className="text-sm font-medium text-white">{value}</div>
                  <div className="text-sm text-gray-400">{row.email}</div>
                </div>
              )
            },
            {
              key: 'status',
              title: 'Status',
              render: (value) => (
                <span
                  className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${value === 'active' 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'
                    }
                  `}
                >
                  {value}
                </span>
              )
            },
            {
              key: 'subscribed',
              title: 'Subscribed',
              render: (value) => (
                <div className="text-sm text-gray-400">{value}</div>
              )
            },
            {
              key: 'revenue',
              title: 'Revenue',
              render: (value) => (
                <div className="text-sm font-medium text-white">{value}</div>
              )
            },
            {
              key: 'engagement',
              title: 'Engagement',
              render: (value) => (
                <span
                  className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${value === 'High' 
                      ? 'bg-green-500/10 text-green-400' 
                      : value === 'Medium'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-red-500/10 text-red-400'
                    }
                  `}
                >
                  {value}
                </span>
              )
            }
          ]}
          data={subscribers}
        />
      </div>
    </div>
  )
} 