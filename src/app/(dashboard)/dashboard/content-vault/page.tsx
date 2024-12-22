'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  PhotoIcon, 
  VideoCameraIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import StatCard from '@/components/dashboard/StatCard'
import ChartCard from '@/components/dashboard/ChartCard'
import DataTable from '@/components/dashboard/DataTable'

export default function ContentVaultPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [searchQuery, setSearchQuery] = useState('')

  const contentPerformanceData = useMemo(() => [
    { name: 'Jan', photos: 1200, videos: 800, posts: 400 },
    { name: 'Feb', photos: 1500, videos: 1000, posts: 600 },
    { name: 'Mar', photos: 1800, videos: 1200, posts: 800 },
    { name: 'Apr', photos: 1600, videos: 900, posts: 500 },
    { name: 'May', photos: 2100, videos: 1400, posts: 900 },
    { name: 'Jun', photos: 1900, videos: 1100, posts: 700 },
    { name: 'Jul', photos: 2400, videos: 1600, posts: 1100 },
  ].map(item => ({
    ...item,
    photos: item.photos + Math.random() * 500,
    videos: item.videos + Math.random() * 300,
    posts: item.posts + Math.random() * 200
  })), [])

  const engagementData = useMemo(() => [
    { name: 'Jan', value: 85 },
    { name: 'Feb', value: 88 },
    { name: 'Mar', value: 92 },
    { name: 'Apr', value: 89 },
    { name: 'May', value: 94 },
    { name: 'Jun', value: 91 },
    { name: 'Jul', value: 95 },
  ].map(item => ({
    ...item,
    value: item.value + Math.random() * 5
  })), [])

  const metrics = useMemo(() => [
    {
      name: 'Total Content',
      value: '1,284',
      change: '+28.4%',
      trend: 'up' as const,
      icon: DocumentTextIcon
    },
    {
      name: 'Photos',
      value: '856',
      change: '+15.2%',
      trend: 'up' as const,
      icon: PhotoIcon
    },
    {
      name: 'Videos',
      value: '428',
      change: '+32.1%',
      trend: 'up' as const,
      icon: VideoCameraIcon
    },
    {
      name: 'Avg. Engagement',
      value: '92.4%',
      change: '+5.4%',
      trend: 'up' as const,
      icon: ChartBarIcon
    },
  ], [])

  const content = useMemo(() => [
    {
      id: 1,
      title: 'Summer Photoshoot Collection',
      type: 'photo',
      status: 'published',
      date: 'Dec 10, 2023',
      views: '12.5K',
      engagement: 'High'
    },
    {
      id: 2,
      title: 'Behind the Scenes Vlog',
      type: 'video',
      status: 'scheduled',
      date: 'Dec 15, 2023',
      views: '8.2K',
      engagement: 'Medium'
    },
    {
      id: 3,
      title: 'Q&A Session Recording',
      type: 'video',
      status: 'draft',
      date: 'Dec 12, 2023',
      views: '-',
      engagement: '-'
    },
    {
      id: 4,
      title: 'Holiday Special Photos',
      type: 'photo',
      status: 'published',
      date: 'Dec 8, 2023',
      views: '15.7K',
      engagement: 'High'
    },
    {
      id: 5,
      title: 'Workout Routine Video',
      type: 'video',
      status: 'published',
      date: 'Dec 5, 2023',
      views: '10.3K',
      engagement: 'Medium'
    }
  ], [])

  const handleTimeRangeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value)
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Vault</h1>
          <p className="text-gray-400">Manage and organize your content library.</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary appearance-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Content
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
          title="Content Performance"
          type="bar"
          data={contentPerformanceData}
          dataKeys={{
            x: 'name',
            y: ['photos', 'videos', 'posts'],
            colors: ['#8B5CF6', '#EC4899', '#3B82F6']
          }}
        />
        <ChartCard
          title="Engagement Rate"
          type="area"
          data={engagementData}
          dataKeys={{ x: 'name', y: 'value' }}
          formatYAxis={(value) => `${value}%`}
        />
      </div>

      {/* Content Table */}
      <div className="rounded-xl bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Content Library</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search content..."
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
              key: 'title',
              title: 'Content',
              render: (value, row) => (
                <div className="flex items-center">
                  <div className="p-2 bg-gray-800 rounded-lg mr-3">
                    {row.type === 'photo' ? (
                      <PhotoIcon className="w-5 h-5 text-primary" />
                    ) : (
                      <VideoCameraIcon className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{value}</div>
                    <div className="text-sm text-gray-400">{row.date}</div>
                  </div>
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
                    ${value === 'published' 
                      ? 'bg-green-900/20 text-green-500' 
                      : value === 'scheduled'
                        ? 'bg-blue-900/20 text-blue-500'
                        : 'bg-yellow-900/20 text-yellow-500'
                    }
                  `}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )
            },
            {
              key: 'views',
              title: 'Views',
              render: (value) => (
                <div className="text-sm text-gray-400">{value}</div>
              )
            },
            {
              key: 'engagement',
              title: 'Engagement',
              render: (value) => (
                <div className="text-sm text-gray-400">{value}</div>
              )
            }
          ]}
          data={content}
          pagination={{
            pageSize: 5,
            total: content.length
          }}
        />
      </div>
    </div>
  )
} 