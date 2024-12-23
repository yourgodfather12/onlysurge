'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Wand2,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Sparkles,
  BrainCircuit,
  ArrowRight,
  Zap,
  Camera,
  Hash,
  Calendar,
  Palette,
} from 'lucide-react'

const tools = [
  {
    title: 'AI Content Writer',
    description: 'Generate engaging captions and posts with AI',
    icon: MessageSquare,
    category: 'content',
    status: 'popular',
  },
  {
    title: 'Image Enhancement',
    description: 'Enhance and optimize your images automatically',
    icon: ImageIcon,
    category: 'media',
    status: 'new',
  },
  {
    title: 'Caption Generator',
    description: 'Create compelling captions for your content',
    icon: FileText,
    category: 'content',
    status: 'popular',
  },
  {
    title: 'Smart Scheduler',
    description: 'AI-powered posting time recommendations',
    icon: Calendar,
    category: 'automation',
    status: 'new',
  },
  {
    title: 'Hashtag Generator',
    description: 'Generate relevant hashtags for maximum reach',
    icon: Hash,
    category: 'content',
    status: 'popular',
  },
  {
    title: 'Style Assistant',
    description: 'Get AI suggestions for visual consistency',
    icon: Palette,
    category: 'media',
    status: 'new',
  },
]

const quickActions = [
  {
    title: 'Generate Content Ideas',
    description: 'Get AI-powered content suggestions',
    icon: Sparkles,
    color: 'text-yellow-500',
  },
  {
    title: 'Smart Analytics',
    description: 'AI insights from your content performance',
    icon: BrainCircuit,
    color: 'text-blue-500',
  },
  {
    title: 'Batch Processing',
    description: 'Process multiple items with AI',
    icon: Zap,
    color: 'text-purple-500',
  },
]

export default function AIToolsPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">AI Tools</h1>
        <p className="text-gray-400">Enhance your content with AI-powered tools</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title} className="dashboard-card p-6 hover:cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <action.icon className={`h-8 w-8 ${action.color} mb-4`} />
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{action.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.title} className="dashboard-card overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <tool.icon className="h-8 w-8 text-pink-500" />
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tool.status === 'new'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}
                >
                  {tool.status}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-medium">{tool.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{tool.description}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <Button className="w-full gap-2">
                  <Wand2 className="h-4 w-4" />
                  Try Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 