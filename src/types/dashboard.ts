import { ReactNode } from 'react'

export interface Platform {
  id: string
  name: string
  status: 'online' | 'offline' | 'maintenance'
  icon: string
}

export interface PlatformStats {
  id: string
  platformId: string
  followers: number
  likes: number
  comments: number
  shares: number
  revenue: number
  period: 'day' | 'week' | 'month' | 'year'
  timestamp: string
}

export type ContentType = 'image' | 'video' | 'text' | 'audio'
export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'archived'
export type SubscriberStatus = 'active' | 'inactive' | 'pending'
export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived'
export type PromotionStatus = 'active' | 'scheduled' | 'ended'
export type LinkStatus = 'active' | 'inactive' | 'expired'

export interface PlatformConnection {
  id: string
  platform: Platform
  username: string
  isConnected: boolean
  lastSync: string
  metrics: {
    subscribers: number
    revenue: number
    engagement: number
  }
}

export interface ContentItem {
  id: string
  title: string
  type: ContentType
  thumbnail?: string
  status: ContentStatus
  platform: Platform
  metrics: {
    views: string
    likes: string
    revenue: string
    comments: string
  }
  createdAt: string
  tags: string[]
  isExclusive: boolean
}

export interface Message {
  id: string
  platform: Platform
  sender: {
    id: string
    name: string
    avatar: string
    isSubscriber: boolean
  }
  content: string
  status: MessageStatus
  createdAt: string
}

export interface Subscriber {
  id: string
  name: string
  email: string
  platform: Platform
  status: SubscriberStatus
  joinedAt: string
  lastActive: string
  metrics: {
    totalSpent: number
    engagement: number
  }
}

export interface Promotion {
  id: string
  title: string
  description: string
  platform: Platform
  status: PromotionStatus
  startDate: string
  endDate: string
  metrics: {
    conversions: number
    revenue: number
    engagement: number
  }
}

export interface Link {
  id: string
  title: string
  url: string
  type: 'promo' | 'content'
  status: LinkStatus
  platform: Platform
  metrics: {
    clicks: number
    conversions: number
    revenue: number
  }
  createdAt: string
}

export interface QuickAction {
  title: string
  description: string
  icon: any
  colorClass: string
  bgColorClass: string
  href: string
  onClick?: () => void
}

export interface Metric {
  title: string
  value: string | number
  trend: 'up' | 'down' | 'neutral'
  change: string
  description: string
  icon: any
  colorClass: string
  bgColorClass: string
}

export interface SetupStep {
  id: string
  title: string
  description: string
  completed: boolean
  action: string
  hasAccount?: boolean
  setupStage?: 'start' | 'creating' | 'configuring' | 'connecting' | 'connected'
  optional?: boolean
  requiresPrevious?: boolean
}

export interface Profile {
  id: string;
  platform: Platform;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  sections?: ProfileSection[];
}

export interface ProfileSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'links' | 'media';
} 