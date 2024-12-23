'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from 'lucide-react'

// Mock data for earnings
const stats = [
  {
    name: 'Total Revenue',
    value: '$12,345',
    change: '+12.3%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    name: 'Subscriber Revenue',
    value: '$8,234',
    change: '+8.1%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Tips & Gifts',
    value: '$2,567',
    change: '+15.4%',
    trend: 'up',
    icon: Wallet,
  },
  {
    name: 'PPV Content',
    value: '$1,544',
    change: '-2.5%',
    trend: 'down',
    icon: CreditCard,
  },
]

const transactions = [
  {
    id: 1,
    type: 'Subscription Payment',
    amount: '+$29.99',
    date: 'Dec 23, 2023',
    platform: 'OnlyFans',
    trend: 'up',
  },
  {
    id: 2,
    type: 'Tip Received',
    amount: '+$50.00',
    date: 'Dec 22, 2023',
    platform: 'Fansly',
    trend: 'up',
  },
  {
    id: 3,
    type: 'Content Purchase',
    amount: '+$15.99',
    date: 'Dec 22, 2023',
    platform: 'OnlyFans',
    trend: 'up',
  },
  {
    id: 4,
    type: 'Platform Fee',
    amount: '-$9.59',
    date: 'Dec 21, 2023',
    platform: 'OnlyFans',
    trend: 'down',
  },
]

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Earnings</h2>
          <p className="text-sm text-zinc-400">
            Track your revenue and financial performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-zinc-400 border-zinc-800">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="text-zinc-400 border-zinc-800">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="text-zinc-400 border-zinc-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest earnings and platform fees</CardDescription>
            </div>
            <Button variant="outline" className="text-zinc-400 border-zinc-800">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.trend === 'up' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {transaction.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{transaction.type}</div>
                    <div className="text-sm text-zinc-400">
                      {transaction.platform} • {transaction.date}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  transaction.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart placeholder */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Your earnings trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-zinc-400">
            Chart Component Here
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 