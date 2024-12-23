'use client'

import { useState } from 'react'
import { DashboardNav } from './dashboard-nav'
import { Button } from '@/components/ui/button'
import { Menu, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation */}
      <div className="fixed top-0 z-40 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/75">
        <div className="flex h-16 items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-zinc-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex-none">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              OnlySurge
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder="Search anything..."
                className="w-full bg-zinc-900/50 border-zinc-800 pl-9 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar panel */}
        <div className="fixed inset-y-0 left-0 w-64 bg-black border-r border-zinc-800">
          <div className="flex h-16 items-center px-4 border-b border-zinc-800">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              OnlySurge
            </span>
          </div>
          <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex-1 overflow-y-auto py-4">
              <DashboardNav />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col border-r border-zinc-800 bg-black">
          <div className="flex h-16 items-center px-4 border-b border-zinc-800">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              OnlySurge
            </span>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <DashboardNav />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 pt-16">
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 