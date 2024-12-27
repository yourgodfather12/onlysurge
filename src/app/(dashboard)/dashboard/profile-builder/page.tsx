'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Users,
  Camera,
  Link2,
  FileText,
  Image as ImageIcon,
  PlusCircle,
  Sparkles,
  Palette,
  Globe,
  DollarSign,
  MessageSquare,
  Settings,
  ChevronRight,
  ExternalLink,
  Lock,
  Eye,
  Smartphone,
  Monitor,
  RefreshCw,
  CheckCircle2
} from 'lucide-react'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/toast'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface ProfileSection {
  id: string
  title: string
  description: string
  status: 'complete' | 'incomplete' | 'locked'
  icon: any
  href: string
  platform?: {
    id: 'onlyfans' | 'fansly'
    type: 'onlyfans' | 'fansly'
    name: string
    icon: string | null
    status: 'connected' | 'disconnected'
  }
}

const profileSections: ProfileSection[] = [
  {
    id: 'photos',
    title: 'Profile Photos',
    description: 'Upload and manage your profile pictures and banners',
    status: 'complete',
    icon: Camera,
    href: '/dashboard/profile-builder/photos',
    platform: {
      id: 'onlyfans',
      type: 'onlyfans',
      name: 'OnlyFans',
      icon: null,
      status: 'connected'
    }
  },
  {
    id: 'bio',
    title: 'Bio & Description',
    description: 'Craft your perfect bio with AI assistance',
    status: 'incomplete',
    icon: FileText,
    href: '/dashboard/profile-builder/bio'
  },
  {
    id: 'links',
    title: 'Social Links',
    description: 'Connect your social media profiles',
    status: 'complete',
    icon: Link2,
    href: '/dashboard/profile-builder/links'
  },
  {
    id: 'media',
    title: 'Media Gallery',
    description: 'Organize your photos and videos',
    status: 'incomplete',
    icon: ImageIcon,
    href: '/dashboard/profile-builder/media'
  },
  {
    id: 'themes',
    title: 'Profile Themes',
    description: 'Customize your profile appearance',
    status: 'locked',
    icon: Palette,
    href: '/dashboard/profile-builder/themes'
  },
  {
    id: 'pricing',
    title: 'Pricing & Tiers',
    description: 'Set up your subscription tiers and pricing',
    status: 'complete',
    icon: DollarSign,
    href: '/dashboard/profile-builder/pricing',
    platform: {
      id: 'fansly',
      type: 'fansly',
      name: 'Fansly',
      icon: null,
      status: 'connected'
    }
  }
]

const quickActions = [
  {
    title: 'Generate Bio',
    description: 'Create an engaging bio with AI',
    icon: Sparkles,
    onClick: () => toast.info('Opening AI bio generator...')
  },
  {
    title: 'Preview Profile',
    description: 'See how others view your profile',
    icon: Eye,
    onClick: () => toast.info('Opening profile preview...')
  },
  {
    title: 'Cross-Platform Sync',
    description: 'Sync profile across platforms',
    icon: Globe,
    onClick: () => toast.info('Opening sync settings...')
  }
]

export default function ProfileBuilderPage() {
  const { setPageProps } = useDashboard()
  const [completionRate, setCompletionRate] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState<'onlyfans' | 'fansly'>('onlyfans')
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile')

  useEffect(() => {
    setPageProps({
      title: "Profile Builder",
      description: "Build and optimize your creator profile",
      showPlatformFilter: false,
      actions: (
        <Button
          size="sm"
          className="rounded-full"
          onClick={() => toast.info('Opening profile settings...')}
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      )
    })

    // Calculate completion rate
    const completed = profileSections.filter(s => s.status === 'complete').length
    setCompletionRate(Math.round((completed / profileSections.length) * 100))
  }, [setPageProps])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-4 md:p-8 2xl:p-12">
      {/* Left Column - Profile Builder */}
      <div className="space-y-8">
        {/* Progress Overview */}
        <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">Profile Completion</h3>
              <p className="text-sm text-zinc-400">Complete all sections to optimize your profile</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative h-12 w-12">
                  <svg className="h-12 w-12 -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      className="fill-none stroke-zinc-800"
                      strokeWidth="4"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      className="fill-none stroke-[#FF1B6B] transition-all duration-300"
                      strokeWidth="4"
                      strokeDasharray={125.6}
                      strokeDashoffset={125.6 * (1 - completionRate / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">{completionRate}%</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-400">Profile Score</span>
                  <span className="text-lg font-semibold text-white">{completionRate}/100</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-white/5"
                onClick={() => toast.info('Opening profile analytics...')}
              >
                View Analytics
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900 transition-colors cursor-pointer group"
                onClick={action.onClick}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#FF1B6B]/10 ring-1 ring-inset ring-white/10">
                    <action.icon className="h-5 w-5 text-[#FF1B6B]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white group-hover:text-[#FF1B6B] transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Profile Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {profileSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className={cn(
                  "relative p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900 transition-all group",
                  section.status === 'locked' && "opacity-75"
                )}
              >
                {section.status === 'locked' && (
                  <div className="absolute inset-0 backdrop-blur-sm rounded-lg flex items-center justify-center bg-black/20">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/90 text-sm font-medium text-zinc-400">
                      <Lock className="h-4 w-4" />
                      Premium Feature
                    </div>
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl ring-1 ring-inset ring-white/10",
                      section.status === 'complete' ? 'bg-emerald-500/10' : 'bg-[#FF1B6B]/10'
                    )}>
                      <section.icon className={cn(
                        "h-5 w-5",
                        section.status === 'complete' ? 'text-emerald-500' : 'text-[#FF1B6B]'
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-white">{section.title}</h3>
                        {section.platform && (
                          <PlatformBadge platform={section.platform} size="sm" />
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full",
                      section.status === 'complete' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : section.status === 'incomplete'
                        ? 'bg-[#FF1B6B]/10 text-[#FF1B6B]'
                        : 'bg-zinc-500/10 text-zinc-500'
                    )}
                  >
                    {section.status === 'complete' ? 'Complete' : section.status === 'incomplete' ? 'Incomplete' : 'Locked'}
                  </Badge>
                </div>
                {section.status !== 'locked' && (
                  <div className="mt-4 flex items-center justify-end">
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
                      onClick={() => handleSectionComplete(section.id)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Complete Section
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 hover:from-pink-500/20 hover:to-violet-500/20 text-white"
                      onClick={() => handleSkipSection(section.id)}
                    >
                      Skip for Now
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column - Live Preview */}
      <div className="hidden xl:block">
        <div className="sticky top-8">
          <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                <p className="text-sm text-zinc-400">See how your profile appears to others</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full",
                    previewMode === 'mobile' && "bg-white/5"
                  )}
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full",
                    previewMode === 'desktop' && "bg-white/5"
                  )}
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => toast.info('Refreshing preview...')}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="onlyfans" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger 
                  value="onlyfans"
                  className="flex-1"
                  onClick={() => setSelectedPlatform('onlyfans')}
                >
                  <div className="flex items-center gap-2">
                    <PlatformBadge
                      platform={{
                        id: 'onlyfans',
                        type: 'onlyfans',
                        name: 'OnlyFans',
                        icon: null,
                        status: 'connected'
                      }}
                      size="sm"
                    />
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="fansly"
                  className="flex-1"
                  onClick={() => setSelectedPlatform('fansly')}
                >
                  <div className="flex items-center gap-2">
                    <PlatformBadge
                      platform={{
                        id: 'fansly',
                        type: 'fansly',
                        name: 'Fansly',
                        icon: null,
                        status: 'connected'
                      }}
                      size="sm"
                    />
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="onlyfans" className="mt-0">
                <div className={cn(
                  "relative rounded-xl overflow-hidden bg-black",
                  previewMode === 'mobile' ? 'w-[375px] h-[812px]' : 'w-full aspect-[3/4]'
                )}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="p-4 rounded-full bg-[#FF1B6B]/10 ring-1 ring-inset ring-white/10">
                        <Eye className="h-6 w-6 text-[#FF1B6B]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">OnlyFans Preview</h3>
                        <p className="text-sm text-zinc-400">Preview will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fansly" className="mt-0">
                <div className={cn(
                  "relative rounded-xl overflow-hidden bg-black",
                  previewMode === 'mobile' ? 'w-[375px] h-[812px]' : 'w-full aspect-[3/4]'
                )}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="p-4 rounded-full bg-[#FF1B6B]/10 ring-1 ring-inset ring-white/10">
                        <Eye className="h-6 w-6 text-[#FF1B6B]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">Fansly Preview</h3>
                        <p className="text-sm text-zinc-400">Preview will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
