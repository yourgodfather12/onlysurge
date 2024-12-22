'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon,
  BellIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  KeyIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const settingsSections = [
  {
    id: 'profile',
    name: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    icon: UserCircleIcon,
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', value: 'John Doe' },
      { name: 'email', label: 'Email Address', type: 'email', value: 'john@example.com' },
      { name: 'bio', label: 'Bio', type: 'textarea', value: 'Content creator and digital artist' },
    ]
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'Configure how you receive notifications',
    icon: BellIcon,
    settings: [
      { name: 'new_subscriber', label: 'New Subscriber', enabled: true },
      { name: 'new_message', label: 'New Message', enabled: true },
      { name: 'content_engagement', label: 'Content Engagement', enabled: true },
      { name: 'tips_received', label: 'Tips Received', enabled: true },
    ]
  },
  {
    id: 'billing',
    name: 'Billing & Subscription',
    description: 'Manage your subscription and payment methods',
    icon: CreditCardIcon,
    plan: {
      name: 'Pro Plan',
      price: '$29.99/month',
      nextBilling: 'Dec 30, 2023',
    }
  },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({
    new_subscriber: true,
    new_message: true,
    content_engagement: true,
    tips_received: true,
  })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                w-full p-4 rounded-xl text-left transition-colors
                ${activeSection === section.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-900 text-gray-400 hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
              <div className="space-y-4">
                {settingsSections[0].fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                        rows={4}
                        defaultValue={field.value}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                        defaultValue={field.value}
                      />
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {settingsSections[1].settings.map((setting) => (
                  <div key={setting.name} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <span className="text-white">{setting.label}</span>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({
                        ...prev,
                        [setting.name]: !prev[setting.name as keyof typeof prev]
                      }))}
                      className={`
                        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                        ${notifications[setting.name as keyof typeof notifications] ? 'bg-primary' : 'bg-gray-700'}
                      `}
                    >
                      <span
                        className={`
                          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                          ${notifications[setting.name as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Billing Settings */}
          {activeSection === 'billing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Current Plan */}
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Current Plan</h2>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">{settingsSections[2].plan.name}</h3>
                    <p className="text-gray-400">{settingsSections[2].plan.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                    Upgrade Plan
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Next billing date: {settingsSections[2].plan.nextBilling}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Payment Methods</h2>
                <button className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-800/80">
                  <div className="flex items-center gap-3">
                    <CreditCardIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Add Payment Method</span>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Billing History */}
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Billing History</h2>
                <div className="text-center py-8 text-gray-400">
                  <p>No billing history available</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 