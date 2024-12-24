'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  FileImage,
  Search,
  Filter,
  RefreshCcw,
  Plus,
  ArrowUpRight,
  Star,
  Mail,
  MoreVertical,
  Bot,
  Sparkles,
  Target,
  Send,
  Archive,
  Trash2,
  Clock,
  Heart,
  Image,
  Paperclip,
  Smile,
  Eye,
  Save,
  Link,
  Settings,
  Layout,
  Palette,
  Type,
  Video,
  Music,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Gift,
  Zap,
  MessageSquare,
  Copy,
  ExternalLink,
  Edit,
  LineChart,
  PieChart,
  Activity,
  Download,
  Upload,
  FolderPlus,
  Grid,
  List,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/page-container'
import { DashboardCard, DashboardCardHeader, DashboardCardContent } from '@/components/ui/dashboard-card'
import { usePlatform } from '@/lib/platform-context'
import { cn } from '@/lib/utils'

// Types
type ContentType = 'image' | 'video' | 'audio' | 'text'
type ContentStatus = 'draft' | 'scheduled' | 'published' | 'archived'
type Platform = 'onlyfans' | 'fansly' | 'all'

interface ContentItem {
  id: string
  title: string
  type: ContentType
  thumbnail: string
  status: ContentStatus
  platforms: Platform[]
  metrics: {
    views: string
    likes: string
    revenue: string
    comments: string
  }
  createdAt: string
  scheduledFor?: string
  tags: string[]
  description?: string
  isExclusive: boolean
  price?: string
}

// Utility functions
const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return Video
    case 'image':
      return Image
    default:
      return FileImage
  }
}

const getStatusClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case 'published':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-500'
      }
    case 'scheduled':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500'
      }
    case 'draft':
      return {
        bg: 'bg-zinc-500/10',
        text: 'text-zinc-500'
      }
    default:
      return {
        bg: 'bg-zinc-500/10',
        text: 'text-zinc-500'
      }
  }
}

// Components
const TypeIcon = ({ type, className }: { type: string; className?: string }) => {
  const Icon = getTypeIcon(type)
  return <Icon className={className} />
}

// Enhanced mock data
const content: ContentItem[] = [
  {
    id: '1',
    title: 'Summer Collection',
    type: 'image',
    thumbnail: '/placeholder.jpg',
    status: 'published',
    platforms: ['onlyfans', 'fansly'],
    metrics: {
      views: '1,234',
      likes: '567',
      revenue: '$234',
      comments: '89'
    },
    createdAt: '2023-12-01',
    tags: ['summer', 'collection', 'featured'],
    isExclusive: true,
    price: '$19.99'
  },
  {
    id: '2',
    title: 'Behind the Scenes',
    type: 'video',
    thumbnail: '/placeholder.jpg',
    status: 'scheduled',
    platforms: ['fansly'],
    metrics: {
      views: '856',
      likes: '234',
      revenue: '$123',
      comments: '45'
    },
    createdAt: '2023-12-15',
    scheduledFor: '2023-12-25',
    tags: ['bts', 'exclusive'],
    description: 'Exclusive behind the scenes content',
    isExclusive: true,
    price: '$29.99'
  },
  {
    id: '3',
    title: 'Exclusive Photos',
    type: 'image',
    thumbnail: '/placeholder.jpg',
    status: 'draft',
    platforms: ['onlyfans'],
    metrics: {
      views: '0',
      likes: '0',
      revenue: '$0',
      comments: '0'
    },
    createdAt: '2023-12-20',
    tags: ['photos', 'draft'],
    isExclusive: false
  },
]

// Enhanced quick actions
const quickActions = [
  {
    title: 'Upload Content',
    description: 'Add new photos or videos',
    icon: Upload,
    colorClass: 'text-emerald-500',
    bgColorClass: 'bg-emerald-500/10 p-2 rounded-lg',
    onClick: () => console.log('Upload'),
  },
  {
    title: 'AI Enhancement',
    description: 'Enhance content with AI',
    icon: Sparkles,
    colorClass: 'text-purple-500',
    bgColorClass: 'bg-purple-500/10 p-2 rounded-lg',
    onClick: () => console.log('AI Enhance'),
  },
  {
    title: 'Create Collection',
    description: 'Organize content into albums',
    icon: FolderPlus,
    colorClass: 'text-blue-500',
    bgColorClass: 'bg-blue-500/10 p-2 rounded-lg',
    onClick: () => console.log('Create Collection'),
  },
  {
    title: 'Batch Upload',
    description: 'Upload multiple files at once',
    icon: Upload,
    colorClass: 'text-pink-500',
    bgColorClass: 'bg-pink-500/10 p-2 rounded-lg',
    onClick: () => console.log('Batch Upload'),
  },
  {
    title: 'Schedule Posts',
    description: 'Plan your content calendar',
    icon: Calendar,
    colorClass: 'text-yellow-500',
    bgColorClass: 'bg-yellow-500/10 p-2 rounded-lg',
    onClick: () => console.log('Schedule'),
  }
]

// Enhanced insights with more detailed metrics
const insights = [
  {
    title: 'Top Performer',
    description: 'Summer Collection: 1.2K views',
    icon: TrendingUp,
    colorClass: 'text-emerald-500',
    bgColorClass: 'bg-emerald-500/10 p-2 rounded-lg',
    trend: 'up',
    details: '+25% from last week'
  },
  {
    title: 'Revenue Generated',
    description: '$357 from content sales',
    icon: DollarSign,
    colorClass: 'text-pink-500',
    bgColorClass: 'bg-pink-500/10 p-2 rounded-lg',
    trend: 'up',
    details: '+15% increase'
  },
  {
    title: 'Popular Type',
    description: 'Videos get 2x more engagement',
    icon: Video,
    colorClass: 'text-blue-500',
    bgColorClass: 'bg-blue-500/10 p-2 rounded-lg',
    trend: 'neutral',
    details: 'Based on last 30 days'
  },
  {
    title: 'Platform Performance',
    description: 'OnlyFans leads in revenue',
    icon: LineChart,
    colorClass: 'text-purple-500',
    bgColorClass: 'bg-purple-500/10 p-2 rounded-lg',
    trend: 'up',
    details: '65% of total revenue'
  }
]

// Main Component
export default function ContentVaultPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all')
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<ContentStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { platforms, currentPlatform, setCurrentPlatform } = usePlatform()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  // Filter content based on selected filters and search query
  const filteredContent = content.filter(item => {
    const matchesPlatform = selectedPlatform === 'all' || item.platforms.includes(selectedPlatform)
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesPlatform && matchesType && matchesStatus && matchesSearch
  })

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        {/* Header - Simplified like iOS */}
        <div className="flex items-center justify-between sticky top-0 z-10 bg-black/50 backdrop-blur-lg px-4 py-3 -mx-4 -mt-4">
          <div>
            <h1 className="text-2xl font-semibold">Content Vault</h1>
            <p className="text-sm text-zinc-400">
              {filteredContent.length} items • {
                selectedPlatform === 'all' ? 'All Platforms' : 
                selectedPlatform === 'onlyfans' ? 'OnlyFans' : 'Fansly'
              }
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/20"
              />
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="default" size="sm" className="rounded-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Filter Bar - iOS Style */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
            className="bg-zinc-900/50 border border-zinc-800 rounded-full text-sm px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/20"
          >
            <option value="all">All Platforms</option>
            <option value="onlyfans">OnlyFans</option>
            <option value="fansly">Fansly</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ContentType | 'all')}
            className="bg-zinc-900/50 border border-zinc-800 rounded-full text-sm px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/20"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="text">Text</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ContentStatus | 'all')}
            className="bg-zinc-900/50 border border-zinc-800 rounded-full text-sm px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/20"
          >
            <option value="all">All Status</option>
            <option value="draft">Drafts</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Content Grid - Photo Album Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 -mx-4">
          {filteredContent.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden bg-zinc-900">
              {/* Thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <TypeIcon type={item.type} className="h-8 w-8 text-zinc-400" />
              </div>
              
              {/* Platform Indicators */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                {item.platforms.map(platform => (
                  <span 
                    key={platform}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: platform === 'onlyfans' ? '#00AFF0' : '#FFA500'
                    }}
                  />
                ))}
              </div>

              {/* Status Badge */}
              {item.status !== 'published' && (
                <div className="absolute top-2 left-2">
                  <span className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusClasses(item.status).bg,
                    getStatusClasses(item.status).text
                  )}>
                    {item.status}
                  </span>
                </div>
              )}

              {/* Exclusive Badge */}
              {item.isExclusive && (
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-1 text-xs font-medium bg-pink-500/20 text-pink-500 rounded-full">
                    Exclusive
                  </span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute inset-0 flex flex-col justify-between p-3">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-black/50">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-black/50">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">{item.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-300 mt-1">
                      <span>{item.metrics.views} views</span>
                      <span>{item.metrics.likes} likes</span>
                      <span className="text-emerald-400">{item.metrics.revenue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions and Insights - Minimized to a bottom sheet or modal */}
        <Button 
          variant="outline" 
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-zinc-900/90 border-zinc-700"
          onClick={() => console.log('Show quick actions')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Quick Actions
        </Button>
      </div>
    </PageContainer>
  )
} 