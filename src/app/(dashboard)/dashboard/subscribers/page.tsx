'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users,
  Search,
  Filter,
  Star,
  MoreVertical,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Calendar,
  Heart,
} from 'lucide-react'

// Mock data for subscribers
const subscribers = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    platform: 'OnlyFans',
    status: 'active',
    subscribed: 'Dec 15, 2023',
    renewalDate: 'Jan 15, 2024',
    totalSpent: '$249.99',
    engagement: 'High',
    favorite: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    platform: 'Fansly',
    status: 'active',
    subscribed: 'Nov 20, 2023',
    renewalDate: 'Dec 20, 2023',
    totalSpent: '$124.99',
    engagement: 'Medium',
    favorite: false,
  },
  {
    id: 3,
    name: 'Emma Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    platform: 'OnlyFans',
    status: 'expired',
    subscribed: 'Oct 1, 2023',
    renewalDate: 'Nov 1, 2023',
    totalSpent: '$74.99',
    engagement: 'Low',
    favorite: false,
  },
]

export default function SubscribersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Subscribers</h2>
          <p className="text-sm text-gray-400">
            Manage your subscriber relationships and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-green-500">+12.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$12,345</div>
            <p className="text-xs text-green-500">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Engagement Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8.7%</div>
            <p className="text-xs text-red-500">-2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Renewal Rate
            </CardTitle>
            <Heart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">85%</div>
            <p className="text-xs text-green-500">+3.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search subscribers..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Subscribers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscribers</CardTitle>
          <CardDescription>
            View and manage your subscriber relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={subscriber.avatar}
                    alt={subscriber.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white truncate">
                        {subscriber.name}
                      </h3>
                      {subscriber.favorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          subscriber.status === 'active'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{subscriber.platform}</span>
                      <span>•</span>
                      <span>Subscribed {subscriber.subscribed}</span>
                      <span>•</span>
                      <span>Renews {subscriber.renewalDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="text-white">{subscriber.totalSpent}</p>
                      <p className="text-gray-400">Total Spent</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{subscriber.engagement}</p>
                      <p className="text-gray-400">Engagement</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
