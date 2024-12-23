'use client'

import { Card } from '@/components/ui/card'
import { BarChart, LineChart } from '@/components/ui/charts'
import { Button } from '@/components/ui/button'
import {
  ArrowUpRight,
  Users,
  DollarSign,
  Heart,
  Eye,
  TrendingUp,
  Calendar,
} from 'lucide-react'

const stats = [
  {
    name: 'Total Subscribers',
    value: '12,345',
    change: '+12%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '+23%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    name: 'Engagement Rate',
    value: '8.7%',
    change: '+5%',
    trend: 'up',
    icon: Heart,
  },
  {
    name: 'Content Views',
    value: '234.5K',
    change: '+18%',
    trend: 'up',
    icon: Eye,
  },
]

const chartData = [
  {
    name: 'Mon',
    subscribers: 2400,
    revenue: 4000,
  },
  {
    name: 'Tue',
    subscribers: 1398,
    revenue: 3000,
  },
  {
    name: 'Wed',
    subscribers: 9800,
    revenue: 2000,
  },
  {
    name: 'Thu',
    subscribers: 3908,
    revenue: 2780,
  },
  {
    name: 'Fri',
    subscribers: 4800,
    revenue: 1890,
  },
  {
    name: 'Sat',
    subscribers: 3800,
    revenue: 2390,
  },
  {
    name: 'Sun',
    subscribers: 4300,
    revenue: 3490,
  },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-400">Track your growth and performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 Days
          </Button>
          <Button className="gap-2">
            <TrendingUp className="h-4 w-4" />
            View Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="dashboard-card p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-gray-400" />
              <span className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-400">{stat.name}</h3>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="dashboard-card p-6">
          <h3 className="mb-4 text-lg font-medium">Subscriber Growth</h3>
          <LineChart
            data={chartData}
            categories={['subscribers']}
            index="name"
            colors={['#EC4899']}
            valueFormatter={(value: number) => `${value.toLocaleString()}`}
            className="h-72"
          />
        </Card>

        <Card className="dashboard-card p-6">
          <h3 className="mb-4 text-lg font-medium">Revenue Overview</h3>
          <BarChart
            data={chartData}
            categories={['revenue']}
            index="name"
            colors={['#4F46E5']}
            valueFormatter={(value: number) => `$${value.toLocaleString()}`}
            className="h-72"
          />
        </Card>
      </div>
    </div>
  )
}