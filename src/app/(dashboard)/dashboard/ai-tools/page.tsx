'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  Settings,
  Wand2,
  CheckCircle2,
  Bot,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDashboard } from '@/app/(dashboard)/layout'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { typography } from '@/styles/typography'

// Helper function to format dates consistently
function formatDate(date: string | Date) {
  if (typeof date === 'string' && (date === 'Paused' || date === 'Error')) {
    return date;
  }
  
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    // Use UTC to ensure consistent rendering between server and client
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    }).format(d);
  } catch (error) {
    return 'Invalid Date';
  }
}

type AutomationStatus = 'active' | 'inactive' | 'error'
type ToolType = 'automation' | 'promotion'

interface Tool {
  id: string
  title: string
  description: string
  status: AutomationStatus
  type: 'schedule' | 'response' | 'sync' | 'optimization' | 'promotion' | 'targeting' | 'analytics'
  category: ToolType
  configuredOn?: {
    page: string
    path: string
  }
  platform?: {
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
  lastRun?: string
  nextRun?: string
  stats?: {
    reach?: number
    engagement?: number
    conversion?: number
  }
}

const tools: Tool[] = [
  {
    id: '1',
    title: 'Auto-Post Content',
    description: 'Schedule and post content automatically at optimal times',
    status: 'active',
    type: 'schedule',
    category: 'automation',
    configuredOn: {
      page: 'Content Vault',
      path: '/dashboard/content-vault'
    }
  },
  {
    id: '2',
    title: 'Smart Replies',
    description: 'AI-powered automated responses to common messages',
    status: 'active',
    type: 'response',
    category: 'automation',
    configuredOn: {
      page: 'Messages',
      path: '/dashboard/messages'
    }
  },
  {
    id: '3',
    title: 'Content Generator',
    description: 'Generate engaging captions and descriptions',
    status: 'active',
    type: 'optimization',
    category: 'automation'
  },
  {
    id: '4',
    title: 'Cross-Platform Sync',
    description: 'Sync content across OnlyFans and Fansly',
    status: 'active',
    type: 'sync',
    category: 'automation'
  },
  {
    id: '5',
    title: 'Media Enhancer',
    description: 'Enhance images and videos with AI',
    status: 'active',
    type: 'optimization',
    category: 'automation',
    configuredOn: {
      page: 'Content Vault',
      path: '/dashboard/content-vault'
    }
  },
  {
    id: '6',
    title: 'Profile Optimizer',
    description: 'Optimize your profile with AI suggestions',
    status: 'active',
    type: 'optimization',
    category: 'automation',
    configuredOn: {
      page: 'Profile Builder',
      path: '/dashboard/profile-builder'
    }
  }
]

const getToolIcon = (type: Tool['type']) => {
  switch (type) {
    case 'schedule':
      return Calendar
    case 'response':
      return MessageSquare
    case 'sync':
      return RefreshCw
    case 'optimization':
      return ImageIcon
    default:
      return Sparkles
  }
}

export default function AIToolsPage() {
  const { setPageProps } = useDashboard()
  const [showSetupWizard, setShowSetupWizard] = useState(false)
  const [setupProgress, setSetupProgress] = useState(0)

  useEffect(() => {
    setPageProps({
      title: "AI Tools",
      description: "Automate your content with AI",
      showPlatformFilter: false,
      actions: (
        <Button
          size="sm"
          className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
          onClick={() => setShowSetupWizard(true)}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          Quick Setup
        </Button>
      )
    })
  }, [setPageProps])

  const handleToggleTool = (tool: Tool) => {
    if (tool.status === 'error') {
      toast.error('Cannot toggle tool in error state')
      return
    }
    toast.success(`${tool.title} ${tool.status === 'active' ? 'paused' : 'activated'}`)
  }

  const handleToolSettings = (tool: Tool) => {
    toast.info(`Opening settings for ${tool.title}`)
  }

  const handleSetupComplete = () => {
    setShowSetupWizard(false)
    toast.success('All AI tools are now configured!')
    setSetupProgress(100)
  }

  return (
    <div className="space-y-8 px-4 py-8 md:px-8">
      {/* Quick Setup Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-blue-500/10 animate-gradient" />
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                <Sparkles className="h-4 w-4 text-pink-500" />
                <span className={cn(typography.caption, "text-pink-500")}>AI-Powered Automation</span>
              </div>
              <div className="space-y-2">
                <h2 className={cn(typography.h1, "text-white leading-tight")}>Get Started with AI</h2>
                <p className={cn(typography.subtitle1, "text-zinc-400 max-w-lg")}>
                  Automate your content creation and management with our powerful AI tools. Set up once and let AI handle the rest.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
                  onClick={() => setShowSetupWizard(true)}
                >
                  <Wand2 className="h-5 w-5 mr-2" />
                  <span className={typography.buttonText}>Configure All Tools</span>
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50">
                  <Bot className="h-5 w-5 text-emerald-500" />
                  <span className={cn(typography.caption, "text-emerald-500")}>
                    {tools.filter(t => !t.configuredOn).length} Tools Need Setup
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-pink-500/20 to-violet-500/20 blur-xl" />
                <div className="relative grid grid-cols-2 gap-3">
                  {['schedule', 'response', 'optimization', 'sync'].map((type) => (
                    <div key={type} className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                      {React.createElement(getToolIcon(type as Tool['type']), {
                        className: "h-6 w-6 text-pink-500"
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map(tool => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={cn(
              "h-full bg-zinc-900/50 hover:bg-zinc-900 border-zinc-800/50 transition-all duration-300",
              tool.configuredOn && "border-emerald-500/20"
            )}>
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl ring-1 ring-inset",
                      tool.configuredOn 
                        ? "bg-emerald-500/10 ring-emerald-500/20" 
                        : "bg-pink-500/10 ring-pink-500/20"
                    )}>
                      {React.createElement(getToolIcon(tool.type), {
                        className: cn(
                          "h-5 w-5",
                          tool.configuredOn ? "text-emerald-500" : "text-pink-500"
                        )
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(typography.h4, "text-white")}>{tool.title}</h3>
                      <p className={cn(typography.body2, "text-zinc-400 mt-1")}>{tool.description}</p>
                      {tool.configuredOn && (
                        <div className="flex items-center gap-2 mt-3">
                          <Badge className="bg-emerald-500/10 text-emerald-500 gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Configured
                          </Badge>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-zinc-400 hover:text-white h-auto p-0"
                            onClick={() => window.location.href = tool.configuredOn!.path}
                          >
                            <span className={typography.caption}>View on {tool.configuredOn.page}</span>
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-end gap-2">
                    {!tool.configuredOn && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full hover:bg-white/5 group"
                          onClick={() => handleToggleTool(tool)}
                        >
                          {tool.status === 'active' ? (
                            <PauseCircle className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full hover:bg-white/5 group"
                          onClick={() => handleToolSettings(tool)}
                        >
                          <Settings className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Setup Wizard Dialog */}
      <Dialog open={showSetupWizard} onOpenChange={setShowSetupWizard}>
        <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800/50">
          <DialogHeader>
            <DialogTitle className={cn(typography.h3, "text-white")}>Configure AI Tools</DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <Bot className="h-5 w-5 text-pink-500" />
                <p className={cn(typography.body2, "text-pink-100")}>
                  We'll automatically configure all AI tools for optimal performance
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4">
                  <Card className="p-4 bg-zinc-900/50 border-zinc-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PlatformBadge
                          platform={{
                            type: 'onlyfans',
                            name: 'OnlyFans',
                            icon: null
                          }}
                          size="sm"
                        />
                        <span className={cn(typography.subtitle1, "text-white")}>OnlyFans</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-white/5"
                        onClick={() => toast.info('Connecting OnlyFans...')}
                      >
                        <span className={typography.buttonText}>Connect</span>
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-4 bg-zinc-900/50 border-zinc-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PlatformBadge
                          platform={{
                            type: 'fansly',
                            name: 'Fansly',
                            icon: null
                          }}
                          size="sm"
                        />
                        <span className={cn(typography.subtitle1, "text-white")}>Fansly</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-white/5"
                        onClick={() => toast.info('Connecting Fansly...')}
                      >
                        <span className={typography.buttonText}>Connect</span>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="default"
                size="sm"
                className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
                onClick={handleSetupComplete}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span className={typography.buttonText}>Configure All Tools</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        size="sm"
        className="rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 hover:from-pink-500/20 hover:to-violet-500/20 text-white"
        onClick={() => toast.info('Opening AI settings...')}
      >
        <span className={typography.buttonText}>AI Settings</span>
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
} 