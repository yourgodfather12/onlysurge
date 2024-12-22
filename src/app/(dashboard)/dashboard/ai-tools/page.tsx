'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  PencilSquareIcon,
  PhotoIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const aiTools = [
  {
    id: 1,
    name: 'Content Generator',
    description: 'Generate engaging captions, stories, and posts with AI',
    icon: PencilSquareIcon,
    category: 'writing'
  },
  {
    id: 2,
    name: 'Image Enhancer',
    description: 'Enhance and optimize your images with AI technology',
    icon: PhotoIcon,
    category: 'visual'
  },
  {
    id: 3,
    name: 'Video Editor',
    description: 'Edit and enhance your videos with AI-powered tools',
    icon: VideoCameraIcon,
    category: 'visual'
  },
  {
    id: 4,
    name: 'Chat Assistant',
    description: 'Engage with your audience using AI chat automation',
    icon: ChatBubbleLeftRightIcon,
    category: 'engagement'
  },
  {
    id: 5,
    name: 'Performance Optimizer',
    description: 'Optimize your content strategy with AI insights',
    icon: RocketLaunchIcon,
    category: 'analytics'
  },
  {
    id: 6,
    name: 'Auto-Scheduler',
    description: 'Schedule your content with AI-powered timing optimization',
    icon: ArrowPathIcon,
    category: 'automation'
  },
]

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Writing', value: 'writing' },
  { name: 'Visual', value: 'visual' },
  { name: 'Engagement', value: 'engagement' },
  { name: 'Analytics', value: 'analytics' },
  { name: 'Automation', value: 'automation' },
]

export default function AIToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTools = aiTools.filter(tool => 
    selectedCategory === 'all' || tool.category === selectedCategory
  )

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">AI Tools</h1>
        <p className="text-gray-400">Enhance your content with AI-powered tools</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedCategory === category.value 
                ? 'bg-primary text-white' 
                : 'bg-gray-900 text-gray-400 hover:text-white'
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-xl p-6 hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                <tool.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
            </div>
            <p className="text-gray-400">{tool.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                Launch Tool →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <SparklesIcon className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gray-800 rounded-lg hover:bg-gray-800/80 transition-colors text-left">
            <h4 className="font-medium text-white mb-1">Generate New Post</h4>
            <p className="text-sm text-gray-400">Create AI-generated content quickly</p>
          </button>
          <button className="p-4 bg-gray-800 rounded-lg hover:bg-gray-800/80 transition-colors text-left">
            <h4 className="font-medium text-white mb-1">Enhance Latest Image</h4>
            <p className="text-sm text-gray-400">Optimize your recent upload</p>
          </button>
          <button className="p-4 bg-gray-800 rounded-lg hover:bg-gray-800/80 transition-colors text-left">
            <h4 className="font-medium text-white mb-1">Analyze Performance</h4>
            <p className="text-sm text-gray-400">Get AI insights on your content</p>
          </button>
        </div>
      </div>
    </div>
  )
} 