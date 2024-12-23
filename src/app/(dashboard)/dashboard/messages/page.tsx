'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send, MoreVertical, Search } from 'lucide-react'

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      platform: 'OnlyFans',
      lastActive: '2 min ago',
    },
    preview: 'Hey! I love your content! I was wondering...',
    unread: true,
  },
  {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      platform: 'Fansly',
      lastActive: '1 hour ago',
    },
    preview: 'Thank you for the quick response!',
    unread: false,
  },
  // Add more mock messages as needed
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Messages</h2>
          <p className="text-sm text-gray-400">
            Manage and respond to messages from all your platforms
          </p>
        </div>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          Platform
          <MoreVertical className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Messages Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockMessages.map((message) => (
          <Card key={message.id} className="overflow-hidden hover:bg-gray-800/50 transition-colors cursor-pointer">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center gap-3">
                <img
                  src={message.user.avatar}
                  alt={message.user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="truncate">{message.user.name}</CardTitle>
                    {message.unread && (
                      <span className="h-2 w-2 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <span className="truncate">{message.user.platform}</span>
                    <span>•</span>
                    <span className="truncate">{message.user.lastActive}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-400 line-clamp-2">
                {message.preview}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 