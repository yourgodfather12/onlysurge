'use client'

import * as React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Search,
  Filter,
  Star,
  MoreVertical,
  Send,
  Image as ImageIcon,
  Smile,
  Paperclip,
  ChevronDown,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { useDashboard } from '@/app/(dashboard)/layout'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  createdAt: string
  status: 'unread' | 'read' | 'replied' | 'archived'
  platform: {
    id: 'onlyfans' | 'fansly'
    type: 'onlyfans' | 'fansly'
    name: string
    icon: string | null
    status: 'connected' | 'disconnected'
    metrics: {
      subscribers: number
      views: number
      revenue: number
    }
  }
  sender: {
    id: string
    name: string
    avatar: string
    isSubscriber: boolean
  }
}

// Mock data
const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey! Love your content! 💕',
    createdAt: new Date().toISOString(),
    status: 'unread',
    platform: {
      id: 'onlyfans',
      type: 'onlyfans',
      name: 'OnlyFans',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    sender: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?u=1',
      isSubscriber: true
    }
  },
  {
    id: '2',
    content: 'When will you post new content?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: 'read',
    platform: {
      id: 'fansly',
      type: 'fansly',
      name: 'Fansly',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    sender: {
      id: '2',
      name: 'Mike Smith',
      avatar: 'https://i.pravatar.cc/150?u=2',
      isSubscriber: true
    }
  },
  {
    id: '3',
    content: 'Your latest post was amazing!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: 'replied',
    platform: {
      id: 'onlyfans',
      type: 'onlyfans',
      name: 'OnlyFans',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 0,
        views: 0,
        revenue: 0
      }
    },
    sender: {
      id: '3',
      name: 'Emma Davis',
      avatar: 'https://i.pravatar.cc/150?u=3',
      isSubscriber: true
    }
  }
]

export default function MessagesPage() {
  const { setPageProps } = useDashboard()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [messageText, setMessageText] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<Message['status'] | 'all'>('all')
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [isLoading, setIsLoading] = useState(false)

  const filteredMessages = React.useMemo(() => {
    if (selectedStatus === 'all') return messages
    return messages.filter(message => message.status === selectedStatus)
  }, [messages, selectedStatus])

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedMessage) return

    // In a real app, this would send the message to an API
    const newMessage: Message = {
      id: Math.random().toString(),
      content: messageText,
      createdAt: new Date().toISOString(),
      status: 'replied',
      platform: selectedMessage.platform,
      sender: {
        id: 'me',
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?u=me',
        isSubscriber: false
      }
    }

    setMessages(prev => [...prev, newMessage])
    setMessageText('')
  }

  React.useEffect(() => {
    setPageProps({
      title: "Messages",
      description: "Manage your fan conversations across all platforms",
      showPlatformFilter: true,
      actions: (
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      )
    })
  }, [setPageProps])

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Messages List */}
        <div className="col-span-4 flex flex-col border border-zinc-800 rounded-xl overflow-hidden">
          {/* Status Filter */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Message['status'] | 'all')}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/20"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
              </div>
            ) : filteredMessages.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="No messages"
                description="You don't have any messages yet"
              />
            ) : (
              <div className="divide-y divide-zinc-800">
                {filteredMessages.map((message) => (
                  <motion.button
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "w-full p-4 text-left hover:bg-zinc-800/50 transition-colors",
                      selectedMessage?.id === message.id && "bg-zinc-800/50"
                    )}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={message.sender.avatar}
                        alt={message.sender.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">
                              {message.sender.name}
                            </span>
                            <PlatformBadge
                              platform={message.platform}
                              size="sm"
                            />
                          </div>
                          <StatusBadge
                            status={message.status}
                            size="sm"
                            showDot={false}
                          />
                        </div>
                        <p className="text-sm text-zinc-400 truncate">
                          {message.content}
                        </p>
                        <span className="text-xs text-zinc-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Conversation View */}
        <div className="col-span-8 flex flex-col border border-zinc-800 rounded-xl overflow-hidden">
          {selectedMessage ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedMessage.sender.avatar}
                      alt={selectedMessage.sender.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {selectedMessage.sender.name}
                        </span>
                        <PlatformBadge
                          platform={selectedMessage.platform}
                          size="sm"
                        />
                      </div>
                      <span className="text-sm text-zinc-400">
                        {selectedMessage.sender.isSubscriber ? 'Subscriber' : 'Non-subscriber'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Sender's message */}
                  <div className="flex items-start gap-3">
                    <img
                      src={selectedMessage.sender.avatar}
                      alt={selectedMessage.sender.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="inline-block rounded-2xl bg-zinc-800 px-4 py-2">
                        <p className="text-sm">
                          {selectedMessage.content}
                        </p>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs text-zinc-500">
                          {new Date(selectedMessage.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="rounded-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              icon={MessageSquare}
              title="Select a conversation"
              description="Choose a conversation from the list to start messaging"
              className="h-full"
            />
          )}
        </div>
      </div>
    </div>
  )
} 