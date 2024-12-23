'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Megaphone,
  ArrowRight,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Share2,
} from 'lucide-react'

const campaigns = [
  {
    id: 1,
    title: 'Summer Collection Launch',
    platform: 'all',
    status: 'active',
    budget: '$1,000',
    spent: '$450',
    reach: '45.2K',
    engagement: '2.3K',
    startDate: 'Jun 1, 2024',
    endDate: 'Jun 30, 2024',
  },
  {
    id: 2,
    title: 'Instagram Growth Campaign',
    platform: 'instagram',
    status: 'scheduled',
    budget: '$500',
    spent: '$0',
    reach: '-',
    engagement: '-',
    startDate: 'Jul 1, 2024',
    endDate: 'Jul 15, 2024',
  },
  {
    id: 3,
    title: 'Content Promotion',
    platform: 'twitter',
    status: 'ended',
    budget: '$750',
    spent: '$750',
    reach: '28.5K',
    engagement: '1.8K',
    startDate: 'May 15, 2024',
    endDate: 'May 30, 2024',
  },
]

const quickActions = [
  {
    title: 'Create Campaign',
    description: 'Launch a new promotional campaign',
    icon: Target,
    color: 'text-pink-500',
  },
  {
    title: 'Boost Content',
    description: 'Promote your best performing content',
    icon: TrendingUp,
    color: 'text-purple-500',
  },
  {
    title: 'Cross Promotion',
    description: 'Collaborate with other creators',
    icon: Share2,
    color: 'text-blue-500',
  },
]

const insights = [
  {
    title: 'Total Reach',
    value: '125.4K',
    change: '+12.5% this month',
    icon: Users,
  },
  {
    title: 'Engagement Rate',
    value: '4.8%',
    change: '+0.6% this month',
    icon: TrendingUp,
  },
  {
    title: 'Budget Spent',
    value: '$2,450',
    change: '48% of total',
    icon: DollarSign,
  },
]

export default function PromotingPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Promoting</h1>
          <p className="text-gray-400">Manage your promotional campaigns</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {insights.map((stat) => (
          <Card key={stat.title} className="dashboard-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <stat.icon className="h-8 w-8 text-gray-400 mb-4" />
                <h3 className="font-medium">{stat.title}</h3>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title} className="dashboard-card p-6 hover:cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <action.icon className={`h-8 w-8 ${action.color} mb-4`} />
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{action.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search campaigns..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="dashboard-card overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-800">
                    {campaign.platform === 'instagram' && (
                      <Instagram className="h-5 w-5 text-pink-500" />
                    )}
                    {campaign.platform === 'twitter' && (
                      <Twitter className="h-5 w-5 text-blue-500" />
                    )}
                    {campaign.platform === 'facebook' && (
                      <Facebook className="h-5 w-5 text-indigo-500" />
                    )}
                    {campaign.platform === 'all' && (
                      <Globe className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{campaign.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {campaign.startDate} - {campaign.endDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active'
                        ? 'bg-green-500/10 text-green-500'
                        : campaign.status === 'scheduled'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-gray-500/10 text-gray-500'
                    }`}
                  >
                    {campaign.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Budget</p>
                    <p className="font-medium">{campaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Spent</p>
                    <p className="font-medium">{campaign.spent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Reach</p>
                    <p className="font-medium">{campaign.reach}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Engagement</p>
                    <p className="font-medium">{campaign.engagement}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 