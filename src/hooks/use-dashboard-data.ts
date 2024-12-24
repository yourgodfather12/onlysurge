'use client'

import { useState, useEffect } from 'react'
import { usePlatform } from '@/lib/platform-context'

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

export function useDashboardData() {
  const { currentPlatform } = usePlatform()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setIsLoading(true)
    try {
      // Filter messages by platform if one is selected
      const filteredMessages = currentPlatform
        ? mockMessages.filter(message => message.platform.id === currentPlatform.id)
        : mockMessages

      setMessages(filteredMessages)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPlatform])

  return {
    messages,
    isLoading,
    error,
    setMessages
  }
} 