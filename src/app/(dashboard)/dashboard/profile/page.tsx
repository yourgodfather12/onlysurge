'use client'

import { motion } from 'framer-motion'
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, LinkIcon } from '@heroicons/react/24/outline'

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6 mb-6"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center">
            <UserCircleIcon className="h-16 w-16 text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Your Profile</h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Personal Information</h2>
            <div className="grid gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <UserCircleIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Display Name</p>
                  <p className="text-white">John Doe</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">john@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Links */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Connected Accounts</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-white">OnlyFans</p>
                    <p className="text-sm text-gray-400">Connected</p>
                  </div>
                </div>
                <button className="text-sm text-red-500 hover:text-red-400">Disconnect</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-white">Instagram</p>
                    <p className="text-sm text-gray-400">Not connected</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary/80">Connect</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-white">TikTok</p>
                    <p className="text-sm text-gray-400">Not connected</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary/80">Connect</button>
              </div>
            </div>
          </section>

          {/* Account Settings */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Account Settings</h2>
            <div className="grid gap-4">
              <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <p className="text-white">Change Password</p>
                <p className="text-sm text-gray-400">Update your password</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <p className="text-white">Notification Settings</p>
                <p className="text-sm text-gray-400">Manage your notification preferences</p>
              </button>
              <button className="w-full text-left p-3 bg-red-900/20 rounded-lg hover:bg-red-900/30 transition-colors">
                <p className="text-red-500">Delete Account</p>
                <p className="text-sm text-red-400">Permanently delete your account</p>
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  )
} 