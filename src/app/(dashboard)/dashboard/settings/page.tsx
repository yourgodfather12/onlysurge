'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  User,
  Bell,
  CreditCard,
  Lock,
  Mail,
  Globe,
  Smartphone,
  Shield,
  Clock,
  ArrowRight,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Key,
} from 'lucide-react'

const sections = [
  {
    title: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    icon: User,
    items: [
      { name: 'Personal Information', status: 'Complete', icon: CheckCircle },
      { name: 'Email Settings', status: 'Incomplete', icon: XCircle },
      { name: 'Connected Accounts', status: '3 Connected', icon: Globe },
    ],
  },
  {
    title: 'Notifications',
    description: 'Configure how you receive notifications',
    icon: Bell,
    items: [
      { name: 'Email Notifications', status: 'Enabled', icon: Mail },
      { name: 'Push Notifications', status: 'Disabled', icon: Smartphone },
      { name: 'Activity Alerts', status: 'Enabled', icon: Bell },
    ],
  },
  {
    title: 'Billing & Subscription',
    description: 'Manage your subscription and payment methods',
    icon: CreditCard,
    items: [
      { name: 'Current Plan', status: 'Pro Plan', icon: CheckCircle },
      { name: 'Payment Method', status: 'Visa ****4242', icon: CreditCard },
      { name: 'Billing History', status: 'View All', icon: Clock },
    ],
  },
  {
    title: 'Security',
    description: 'Protect your account and data',
    icon: Shield,
    items: [
      { name: 'Two-Factor Auth', status: 'Enabled', icon: Lock },
      { name: 'Password', status: 'Last changed 2 months ago', icon: Key },
      { name: 'Active Sessions', status: '2 Devices', icon: Smartphone },
    ],
  },
]

const recentActivity = [
  {
    action: 'Password Changed',
    timestamp: '2 hours ago',
    status: 'success',
    icon: Lock,
  },
  {
    action: 'New Device Login',
    timestamp: '1 day ago',
    status: 'warning',
    icon: Smartphone,
  },
  {
    action: 'Email Updated',
    timestamp: '3 days ago',
    status: 'success',
    icon: Mail,
  },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="dashboard-card overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-800">
                  <section.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className="text-sm text-gray-400">{section.description}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`h-5 w-5 ${
                          item.status === 'Complete' || item.status === 'Enabled'
                            ? 'text-green-500'
                            : item.status === 'Incomplete'
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">{item.status}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="dashboard-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.action}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <activity.icon
                    className={`h-5 w-5 ${
                      activity.status === 'success'
                        ? 'text-green-500'
                        : activity.status === 'warning'
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <span className="font-medium">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-400">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20">
        <div className="flex items-center gap-3">
          <LogOut className="h-5 w-5 text-red-500" />
          <div>
            <h3 className="font-medium text-red-500">Delete Account</h3>
            <p className="text-sm text-gray-400">
              Permanently delete your account and all associated data
            </p>
          </div>
        </div>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  )
} 