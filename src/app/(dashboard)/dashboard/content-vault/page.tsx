'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  FileText, Image as ImageIcon, Video, Calendar, Upload,
  Filter, Grid, List, Clock, Sparkles, Zap, Target,
  TrendingUp, MoreHorizontal, ChevronRight, Bot,
  Plus, Tags, DollarSign, Users, Star, Search,
  MessageSquare, Bookmark, Heart, ArrowUpRight,
  Trash2, Edit2, Share2, Lock, Eye, Settings2
} from 'lucide-react'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { typography } from '@/styles/typography'
import { motion, AnimatePresence } from 'framer-motion'

// Content categories for filtering
const contentCategories = [
  { id: 'all', label: 'All Content', icon: Grid },
  { id: 'scheduled', label: 'Scheduled', icon: Calendar },
  { id: 'drafts', label: 'Drafts', icon: FileText },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'premium', label: 'Premium', icon: Star, badge: 'HOT' },
  { id: 'archived', label: 'Archived', icon: Bookmark }
]

// Sample content items
const contentItems = [
  {
    id: '1',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1536940385103-c729049165e6?w=800&auto=format&fit=crop&q=60',
    title: 'Beach Photoshoot BTS',
    description: 'Behind the scenes footage from our latest beach photoshoot.',
    duration: '2:45',
    size: '128MB',
    uploadedAt: '2 hours ago',
    status: 'scheduled',
    visibility: 'premium',
    platforms: ['onlyfans', 'fansly'],
    scheduling: {
      onlyfans: { date: '2024-01-20', time: '8:00 PM EST' },
      fansly: { date: '2024-01-21', time: '8:00 PM EST' }
    },
    stats: {
      views: 1250,
      likes: 420,
      comments: 85,
      revenue: 850
    },
    aiScore: 94,
    tags: ['beach', 'bts', 'exclusive']
  },
  {
    id: '2',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=60',
    title: 'Lingerie Collection',
    description: 'New lingerie collection photoshoot.',
    size: '4.2MB',
    uploadedAt: '1 day ago',
    status: 'draft',
    visibility: 'premium',
    platforms: ['onlyfans'],
    stats: {
      views: 0,
      likes: 0,
      comments: 0,
      revenue: 0
    },
    aiScore: 88,
    tags: ['lingerie', 'photoset', 'exclusive']
  },
  {
    id: '3',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&auto=format&fit=crop&q=60',
    title: 'Workout Routine',
    description: 'My daily workout routine and tips.',
    duration: '15:30',
    size: '450MB',
    uploadedAt: '2 days ago',
    status: 'published',
    visibility: 'public',
    platforms: ['onlyfans', 'fansly'],
    stats: {
      views: 3200,
      likes: 890,
      comments: 145,
      revenue: 1200
    },
    aiScore: 82,
    tags: ['workout', 'fitness', 'tutorial']
  }
]

export default function ContentVaultPage() {
  const { setPageProps } = useDashboard()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedContent, setSelectedContent] = useState<string | null>(null)

  useEffect(() => {
    setPageProps({
      title: 'Content Vault',
      description: 'Manage and schedule your content',
      showPlatformFilter: false,
      actions: (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full hover:bg-white/5"
            onClick={() => toast.info('Opening settings...')}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
            onClick={() => toast.info('Opening upload...')}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload New
          </Button>
        </div>
      )
    })
  }, [setPageProps])

  // Filter content based on selected category and search query
  const filteredContent = contentItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'scheduled' && item.status === 'scheduled') ||
      (selectedCategory === 'drafts' && item.status === 'draft') ||
      (selectedCategory === 'videos' && item.type === 'video') ||
      (selectedCategory === 'photos' && item.type === 'image') ||
      (selectedCategory === 'premium' && item.visibility === 'premium')
    
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const handleContentClick = (id: string) => {
    setSelectedContent(id === selectedContent ? null : id)
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="pl-9 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full bg-background/50 p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full",
                viewMode === 'grid' && "bg-white/10"
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full",
                viewMode === 'list' && "bg-white/10"
              )}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-2 text-muted-foreground hover:text-foreground hover:bg-white/5"
            onClick={() => toast.info('Opening filters...')}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {contentCategories.map((category) => {
          const count = category.id === 'all' 
            ? contentItems.length 
            : contentItems.filter(item => 
                category.id === 'scheduled' ? item.status === 'scheduled' :
                category.id === 'drafts' ? item.status === 'draft' :
                category.id === 'videos' ? item.type === 'video' :
                category.id === 'photos' ? item.type === 'image' :
                category.id === 'premium' ? item.visibility === 'premium' :
                false
              ).length
          
          return (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full whitespace-nowrap gap-2 transition-all duration-200",
                selectedCategory === category.id 
                  ? "bg-white/10 text-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
              <Badge className={cn(
                "ml-1",
                category.badge ? "bg-[#FF1B6B]" : "bg-muted/80"
              )}>
                {category.badge || count}
              </Badge>
            </Button>
          )
        })}
      </div>

      {/* Content Grid/List */}
      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
      )}>
        {filteredContent.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={cn(
                "group relative overflow-hidden bg-background/50 border-border/50 hover:bg-background/60 transition-all duration-200",
                selectedContent === item.id && "ring-2 ring-pink-500"
              )}
              onClick={() => handleContentClick(item.id)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <div className="absolute inset-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                
                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <Badge className={cn(
                    "rounded-full",
                    item.status === 'scheduled' && "bg-blue-500/10 text-blue-500",
                    item.status === 'draft' && "bg-yellow-500/10 text-yellow-500",
                    item.status === 'published' && "bg-emerald-500/10 text-emerald-500"
                  )}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>

                {/* Type & Duration/Size */}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/50">
                    {item.type === 'video' ? (
                      <div className="flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        {item.duration}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        Photo
                      </div>
                    )}
                  </Badge>
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast.info('Opening editor...')
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast.info('Opening scheduler...')
                      }}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast.info('Opening share options...')
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast.info('Deleting content...')
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4">
                <div className="space-y-1">
                  <div className="flex items-start justify-between">
                    <h3 className={typography.h4}>{item.title}</h3>
                    {item.visibility === 'premium' && (
                      <Badge className="bg-[#FF1B6B]/10 text-[#FF1B6B] gap-1">
                        <Star className="h-3 w-3" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className={cn(typography.body2, "line-clamp-2 text-muted-foreground")}>{item.description}</p>
                </div>

                {/* Platforms */}
                <div className="mt-4 flex items-center gap-2">
                  {item.platforms.map((platform) => (
                    <PlatformBadge
                      key={platform}
                      platform={{ type: platform, name: platform }}
                      size="sm"
                    />
                  ))}
                </div>

                {/* Stats */}
                {item.status === 'published' && item.stats && (
                  <div className="mt-4 grid grid-cols-4 gap-2 p-2 rounded-lg bg-muted/30">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Views</div>
                      <div className="text-sm font-medium text-foreground">{item.stats.views.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Likes</div>
                      <div className="text-sm font-medium text-foreground">{item.stats.likes.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Comments</div>
                      <div className="text-sm font-medium text-foreground">{item.stats.comments.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Revenue</div>
                      <div className="text-sm font-medium text-foreground">${item.stats.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* AI Score */}
                {item.aiScore && (
                  <div className="mt-4 flex items-center justify-between p-2 rounded-lg bg-pink-500/5 border border-pink-500/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-pink-500" />
                      <span className="text-sm text-muted-foreground">AI Score</span>
                    </div>
                    <Badge className="bg-pink-500/10 text-pink-500">
                      {item.aiScore}/100
                    </Badge>
                  </div>
                )}

                {/* Scheduling Info */}
                {item.scheduling && (
                  <div className="mt-4 space-y-2">
                    {Object.entries(item.scheduling).map(([platform, schedule]) => (
                      <div
                        key={platform}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {platform === 'onlyfans' ? 'OnlyFans' : 'Fansly'}
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {schedule.date} at {schedule.time}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 