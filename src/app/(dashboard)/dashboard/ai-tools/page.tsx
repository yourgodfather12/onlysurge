'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Video,
  FileText,
  Wand2,
  Bot,
  Zap,
  Plus,
  ArrowRight,
  Settings,
  Rocket,
  Brain,
  Lightbulb,
  Palette,
  Code,
  Pencil
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Badge } from '@/components/ui/badge'

type AIToolStatus = 'available' | 'beta' | 'coming-soon'

interface AITool {
  id: string
  title: string
  description: string
  status: AIToolStatus
  type: 'content' | 'chat' | 'image' | 'video' | 'text' | 'code'
  icon: React.ElementType
  usageCount: number
  lastUsed?: string
}

const aiTools: AITool[] = [
  {
    id: '1',
    title: 'Content Assistant',
    description: 'Generate engaging captions and descriptions for your content',
    status: 'available',
    type: 'content',
    icon: Sparkles,
    usageCount: 128,
    lastUsed: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: '2',
    title: 'Chat Copilot',
    description: 'AI-powered chat assistant for subscriber engagement',
    status: 'beta',
    type: 'chat',
    icon: MessageSquare,
    usageCount: 56,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: '3',
    title: 'Image Enhancer',
    description: 'Enhance and optimize your images with AI',
    status: 'available',
    type: 'image',
    icon: ImageIcon,
    usageCount: 89,
    lastUsed: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: '4',
    title: 'Video Editor',
    description: 'AI-powered video editing and enhancement',
    status: 'coming-soon',
    type: 'video',
    icon: Video,
    usageCount: 0
  },
  {
    id: '5',
    title: 'Caption Generator',
    description: 'Generate engaging captions for your posts',
    status: 'available',
    type: 'text',
    icon: FileText,
    usageCount: 245,
    lastUsed: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: '6',
    title: 'Style Transfer',
    description: 'Apply artistic styles to your images',
    status: 'beta',
    type: 'image',
    icon: Wand2,
    usageCount: 34,
    lastUsed: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: '7',
    title: 'Chatbot Builder',
    description: 'Create custom chatbots for subscriber interaction',
    status: 'coming-soon',
    type: 'chat',
    icon: Bot,
    usageCount: 0
  },
  {
    id: '8',
    title: 'Content Scheduler',
    description: 'AI-powered content scheduling optimization',
    status: 'available',
    type: 'content',
    icon: Zap,
    usageCount: 167,
    lastUsed: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  }
]

const getStatusConfig = (status: AIToolStatus) => {
  switch (status) {
    case 'available':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-500',
        label: 'Available'
      }
    case 'beta':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        label: 'Beta'
      }
    case 'coming-soon':
      return {
        bg: 'bg-purple-500/10',
        text: 'text-purple-500',
        label: 'Coming Soon'
      }
  }
}

const getTypeConfig = (type: AITool['type']) => {
  switch (type) {
    case 'content':
      return {
        bg: 'bg-pink-500/10',
        text: 'text-pink-500',
        icon: Rocket
      }
    case 'chat':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        icon: Brain
      }
    case 'image':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-500',
        icon: Palette
      }
    case 'video':
      return {
        bg: 'bg-purple-500/10',
        text: 'text-purple-500',
        icon: Video
      }
    case 'text':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-500',
        icon: Pencil
      }
    case 'code':
      return {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-500',
        icon: Code
      }
  }
}

export default function AIToolsPage() {
  const { setPageProps } = useDashboard()

  useEffect(() => {
    setPageProps({
      title: "AI Tools",
      description: "Enhance your content with AI-powered tools",
      showPlatformFilter: false,
      actions: (
        <Button
          size="sm"
          className="rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Tool
        </Button>
      )
    })
  }, [setPageProps])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <Zap className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-medium">Available Tools</h3>
              <p className="text-2xl font-semibold mt-1">
                {aiTools.filter(t => t.status === 'available').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Sparkles className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Total Uses</h3>
              <p className="text-2xl font-semibold mt-1">
                {aiTools.reduce((acc, tool) => acc + tool.usageCount, 0)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Lightbulb className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium">Coming Soon</h3>
              <p className="text-2xl font-semibold mt-1">
                {aiTools.filter(t => t.status === 'coming-soon').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Tools Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">AI Tools</h3>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {aiTools.map((tool) => {
            const statusConfig = getStatusConfig(tool.status)
            const typeConfig = getTypeConfig(tool.type)
            const TypeIcon = typeConfig.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${typeConfig.bg}`}>
                      <TypeIcon className={`h-5 w-5 ${typeConfig.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{tool.title}</span>
                          <Badge
                            variant="secondary"
                            className={`${statusConfig.bg} ${statusConfig.text}`}
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-zinc-500">
                          {tool.usageCount} uses
                        </span>
                        {tool.lastUsed && (
                          <>
                            <span className="text-xs text-zinc-500">•</span>
                            <span className="text-xs text-zinc-500">
                              Last used: {new Date(tool.lastUsed).toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        disabled={tool.status === 'coming-soon'}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Card>
    </div>
  )
} 