'use client'

import { useState, useEffect } from 'react'
import {
  Link2 as LinkIcon,
  Copy,
  Check,
  Edit,
  Trash,
  Instagram,
  Twitter,
  Youtube,
  TikTok,
  Plus,
  ArrowUpRight,
  Settings,
  BarChart2,
  TrendingUp,
  Users,
  DollarSign,
  LinkIcon as Connect,
  AlertCircle,
  ChevronRight,
  Twitch,
  Facebook,
  Linkedin,
  Globe
} from 'lucide-react'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { ConnectModal } from '@/components/ui/connect-modal'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { typography } from '@/styles/typography'
import { motion } from 'framer-motion'

// All available platforms
const availablePlatforms = [
  {
    id: 'onlyfans',
    name: 'OnlyFans',
    icon: '/icons/onlyfans.svg',
    connected: true,
    url: 'https://onlyfans.com/yourname',
    username: '@yourname',
    stats: {
      clicks: 1245,
      subscribers: 856,
      revenue: '$4,500'
    },
    features: [
      'Premium content',
      'Subscription management',
      'Direct messaging',
      'Pay-per-view content'
    ]
  },
  {
    id: 'fansly',
    name: 'Fansly',
    icon: '/icons/fansly.svg',
    connected: false,
    url: '',
    username: '',
    stats: {
      clicks: 0,
      subscribers: 0,
      revenue: '$0'
    },
    features: [
      'Multi-tier subscriptions',
      'Custom content sales',
      'Live streaming',
      'Fan interactions'
    ]
  },
  {
    id: 'manyvids',
    name: 'ManyVids',
    icon: '/icons/manyvids.svg',
    connected: false,
    url: '',
    username: '',
    stats: {
      clicks: 0,
      subscribers: 0,
      revenue: '$0'
    },
    features: [
      'Video sales',
      'Store management',
      'Contest participation',
      'MV Crush features'
    ]
  },
  {
    id: 'loyalfans',
    name: 'LoyalFans',
    icon: '/icons/loyalfans.svg',
    connected: false,
    url: '',
    username: '',
    stats: {
      clicks: 0,
      subscribers: 0,
      revenue: '$0'
    },
    features: [
      'Content monetization',
      'Fan engagement tools',
      'Subscription tiers',
      'Analytics dashboard'
    ]
  }
]

// All available social platforms
const availableSocialPlatforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    connected: true,
    url: 'https://instagram.com/yourname',
    username: '@yourname',
    stats: { followers: '125K', engagement: '4.5%' },
    features: ['Photo sharing', 'Stories', 'Reels', 'Direct messages']
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    connected: false,
    url: '',
    username: '',
    stats: { followers: '0', engagement: '0%' },
    features: ['Tweet scheduling', 'Media sharing', 'Analytics', 'Engagement tracking']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    connected: true,
    url: 'https://youtube.com/@yourname',
    username: 'Your Name',
    stats: { followers: '75K', engagement: '5.4%' },
    features: ['Video content', 'Community posts', 'Live streaming', 'Analytics']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: TikTok,
    connected: false,
    url: '',
    username: '',
    stats: { followers: '0', engagement: '0%' },
    features: ['Short videos', 'Live streaming', 'Duets', 'Trending sounds']
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: Twitch,
    connected: false,
    url: '',
    username: '',
    stats: { followers: '0', engagement: '0%' },
    features: ['Live streaming', 'Channel points', 'Subscriptions', 'Clips']
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    connected: false,
    url: '',
    username: '',
    stats: { followers: '0', engagement: '0%' },
    features: ['Page management', 'Groups', 'Events', 'Insights']
  }
]

export default function LinksPage() {
  const { setPageProps } = useDashboard()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [connectType, setConnectType] = useState<'platform' | 'social' | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllSocial, setShowAllSocial] = useState(false)
  
  // Filter only connected platforms
  const connectedPlatforms = availablePlatforms.filter(p => p.connected)
  const connectedSocialPlatforms = availableSocialPlatforms.filter(p => p.connected)

  useEffect(() => {
    setPageProps({
      title: 'Links',
      description: 'Manage your platform and social media links'
    })
  }, [setPageProps])

  const copyToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    toast.success('Link copied to clipboard')
  }

  const handleConnect = (type: 'platform' | 'social') => {
    setConnectType(type)
    setShowConnectModal(true)
  }

  const handlePlatformConnect = (platform: any) => {
    toast.success(`Successfully connected to ${platform.name}`)
    // Here you would typically update the platform's connected status
  }

  const handleDisconnect = (platform: any) => {
    toast.info(`Disconnected from ${platform.name}`)
    // Here you would typically update the platform's connected status
  }

  const renderEmptyState = (type: 'platform' | 'social') => (
    <Card className="p-12 bg-zinc-900/50 border-zinc-800/50">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-20 blur-lg" />
          <div className="relative p-4 rounded-full bg-zinc-800/50">
            <Connect className="h-8 w-8 text-zinc-400" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className={cn(typography.h4, "text-white")}>
            {type === 'platform' ? 'No Platforms Connected' : 'No Social Platforms Connected'}
          </h3>
          <p className={cn(typography.body2, "text-zinc-400 max-w-sm")}>
            {type === 'platform'
              ? 'Connect your content platforms to start managing your links and tracking performance'
              : 'Connect your social media accounts to expand your reach and grow your audience'}
          </p>
        </div>
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
            onClick={() => handleConnect(type)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {type === 'platform' ? 'Connect Platform' : 'Connect Social'}
          </Button>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <AlertCircle className="h-4 w-4" />
            <span>Your data is secure and private</span>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {linkStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden p-6 bg-background/50 border-border/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-semibold text-foreground mt-2 tracking-tight">{stat.value}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-full font-medium transition-colors duration-200",
                        stat.trend === 'up' 
                          ? 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20' 
                          : 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20'
                      )}
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={cn(
                  "p-3 rounded-xl ring-1 ring-inset ring-white/10 transition-all duration-200",
                  stat.color === 'emerald' && "bg-emerald-500/10 group-hover:bg-emerald-500/20",
                  stat.color === 'blue' && "bg-blue-500/10 group-hover:bg-blue-500/20",
                  stat.color === 'pink' && "bg-pink-500/10 group-hover:bg-pink-500/20",
                  stat.color === 'purple' && "bg-purple-500/10 group-hover:bg-purple-500/20"
                )}>
                  <stat.icon className={cn(
                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                    stat.color === 'emerald' && "text-emerald-500",
                    stat.color === 'blue' && "text-blue-500",
                    stat.color === 'pink' && "text-pink-500",
                    stat.color === 'purple' && "text-purple-500"
                  )} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Links List */}
      <Card className="relative overflow-hidden p-6 bg-background/50 border-border/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/10 via-transparent to-[#45CAFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Your Links</h3>
              <p className="text-sm text-muted-foreground">Manage your social links</p>
            </div>
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
              onClick={() => toast.info('Creating new link...')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>

          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="group/item relative overflow-hidden p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/40 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF1B6B]/5 via-transparent to-[#45CAFF]/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-lg transition-colors duration-200",
                      link.platform === 'instagram' && "bg-pink-500/10 group-hover/item:bg-pink-500/20",
                      link.platform === 'twitter' && "bg-blue-500/10 group-hover/item:bg-blue-500/20",
                      link.platform === 'youtube' && "bg-red-500/10 group-hover/item:bg-red-500/20",
                      link.platform === 'tiktok' && "bg-purple-500/10 group-hover/item:bg-purple-500/20",
                      link.platform === 'twitch' && "bg-violet-500/10 group-hover/item:bg-violet-500/20",
                      link.platform === 'facebook' && "bg-blue-500/10 group-hover/item:bg-blue-500/20",
                      link.platform === 'custom' && "bg-emerald-500/10 group-hover/item:bg-emerald-500/20"
                    )}>
                      {link.platform === 'instagram' && <Instagram className="h-5 w-5 text-pink-500" />}
                      {link.platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-500" />}
                      {link.platform === 'youtube' && <Youtube className="h-5 w-5 text-red-500" />}
                      {link.platform === 'tiktok' && <TikTok className="h-5 w-5 text-purple-500" />}
                      {link.platform === 'twitch' && <Twitch className="h-5 w-5 text-violet-500" />}
                      {link.platform === 'facebook' && <Facebook className="h-5 w-5 text-blue-500" />}
                      {link.platform === 'custom' && <Globe className="h-5 w-5 text-emerald-500" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{link.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{link.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/5"
                      onClick={() => {
                        navigator.clipboard.writeText(link.url)
                        toast.success('Link copied to clipboard')
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/5"
                      onClick={() => toast.info('Opening editor...')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-white/5"
                      onClick={() => toast.info('Deleting link...')}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Link Stats */}
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <div className="text-xs text-muted-foreground">Clicks</div>
                    <div className="text-sm font-medium text-foreground mt-1">
                      {link.stats.clicks.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <div className="text-xs text-muted-foreground">Unique</div>
                    <div className="text-sm font-medium text-foreground mt-1">
                      {link.stats.unique.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <div className="text-xs text-muted-foreground">CTR</div>
                    <div className="text-sm font-medium text-foreground mt-1">
                      {link.stats.ctr}%
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <div className="text-xs text-muted-foreground">Revenue</div>
                    <div className="text-sm font-medium text-foreground mt-1">
                      ${link.stats.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <ConnectModal
        open={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        type={connectType || 'platform'}
        platforms={connectType === 'platform' ? availablePlatforms : availableSocialPlatforms}
        onConnect={handlePlatformConnect}
      />
    </div>
  )
} 