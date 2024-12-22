'use client'

import { useState, Suspense, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { 
  ChartBarIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  PlusIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import StatCard from '@/components/dashboard/StatCard'
import ChartCard from '@/components/dashboard/ChartCard'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

function WelcomeSection() {
  const [showNotification, setShowNotification] = useState(false)

  const handleEnableNotifications = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 p-8">
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">OnlySurge</h2>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-violet-100">Here's what's happening with your content today.</p>
          <div className="mt-6 flex gap-4">
            <button 
              onClick={handleEnableNotifications}
              className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              <BellIcon className="w-5 h-5 mr-2" />
              Enable Notifications
            </button>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 text-white"
            >
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-violet-500/10 rounded-full -translate-y-1/2 translate-x-1/2 backdrop-blur-3xl" />
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-violet-500/10 rounded-full translate-y-1/2 translate-x-1/4 backdrop-blur-3xl" />
      
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white"
          >
            Notifications enabled successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: 'Upload Content',
      description: 'Add new photos or videos',
      icon: PlusIcon,
      href: '/dashboard/content-vault'
    },
    {
      title: 'View Analytics',
      description: 'Check your performance',
      icon: ChartBarIcon,
      href: '/dashboard/analytics'
    },
    {
      title: 'Manage Subscribers',
      description: 'View and manage your audience',
      icon: UsersIcon,
      href: '/dashboard/subscribers'
    }
  ]

  const handleAction = useCallback((href: string) => {
    router.push(href)
  }, [router])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action) => (
        <button
          key={action.title}
          onClick={() => handleAction(action.href)}
          className="p-6 bg-gray-900 rounded-xl hover:ring-2 hover:ring-violet-500/50 transition-all text-left"
        >
          <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
            <action.icon className="w-6 h-6 text-violet-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
          <p className="text-gray-400">{action.description}</p>
        </button>
      ))}
    </div>
  )
}

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'like',
      message: 'Your latest post received 50 new likes',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      icon: HeartIcon,
      iconBackground: 'bg-pink-500/10',
      iconColor: 'text-pink-500'
    },
    {
      id: 2,
      type: 'comment',
      message: 'New comment on your photo',
      time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      icon: ChatBubbleLeftRightIcon,
      iconBackground: 'bg-violet-500/10',
      iconColor: 'text-violet-500'
    },
    {
      id: 3,
      type: 'subscription',
      message: 'New subscriber joined your content',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      icon: StarIcon,
      iconBackground: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500'
    }
  ]

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className={`p-2 rounded-lg ${activity.iconBackground}`}>
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-white">{activity.message}</p>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: 'Live Photography Workshop',
      description: 'Learn professional photography techniques',
      date: new Date('2023-12-25T14:00:00'),
      attendees: 45
    },
    {
      id: 2,
      title: 'Content Strategy Meeting',
      description: 'Quarterly content planning session',
      date: new Date('2023-12-26T11:00:00'),
      attendees: 12
    }
  ]

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
        <button className="text-violet-500 hover:text-violet-400">View calendar</button>
      </div>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-medium">{event.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{event.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {format(event.date, 'MMMM do, yyyy')} at {format(event.date, 'h:mm a')}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Attendees</div>
              <div className="text-white font-medium">{event.attendees}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Charts() {
  const revenueData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 }
  ]

  const engagementData = [
    { name: 'Mon', likes: 4000, comments: 2400, shares: 2400 },
    { name: 'Tue', likes: 3000, comments: 1398, shares: 2210 },
    { name: 'Wed', likes: 2000, comments: 9800, shares: 2290 },
    { name: 'Thu', likes: 2780, comments: 3908, shares: 2000 },
    { name: 'Fri', likes: 1890, comments: 4800, shares: 2181 },
    { name: 'Sat', likes: 2390, comments: 3800, shares: 2500 },
    { name: 'Sun', likes: 3490, comments: 4300, shares: 2100 }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard
        title="Revenue"
        type="area"
        data={revenueData}
        dataKeys={{ x: 'name', y: 'value' }}
        formatYAxis={(value) => `$${value.toLocaleString()}`}
      />
      <ChartCard
        title="Engagement"
        type="bar"
        data={engagementData}
        dataKeys={{
          x: 'name',
          y: ['likes', 'comments', 'shares'],
          colors: ['#8B5CF6', '#EC4899', '#3B82F6']
        }}
      />
    </div>
  )
}

export default function DashboardContent() {
  const metrics = [
    {
      title: 'Total Subscribers',
      value: '2,651',
      change: '+12.5%',
      trend: 'up' as const,
      icon: UsersIcon
    },
    {
      title: 'Engagement Rate',
      value: '24.3%',
      change: '+15.2%',
      trend: 'up' as const,
      icon: ChartBarIcon
    },
    {
      title: 'Total Views',
      value: '45.2K',
      change: '+5.4%',
      trend: 'up' as const,
      icon: ArrowTrendingUpIcon
    },
    {
      title: 'Revenue',
      value: '$24.99',
      change: '+28.4%',
      trend: 'up' as const,
      icon: CurrencyDollarIcon
    }
  ]

  return (
    <div className="space-y-8">
      <WelcomeSection />
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingEvents />
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <Charts />
      </Suspense>
    </div>
  )
} 