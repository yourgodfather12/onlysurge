'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Rocket, BarChart3, Bot, Sparkles, Cpu, Target, Users, Lock, Sliders, MessageSquare } from 'lucide-react'

const mainFeatures = [
  {
    title: 'AI-Powered Content Optimization',
    description: 'Leverage advanced AI algorithms to optimize your content for maximum engagement and reach.',
    icon: Bot,
    color: 'from-neon-pink to-neon-purple'
  },
  {
    title: 'Smart Analytics',
    description: 'Get deep insights into your audience behavior and content performance with our advanced analytics.',
    icon: BarChart3,
    color: 'from-neon-purple to-neon-blue'
  },
  {
    title: 'Automated Scheduling',
    description: 'Schedule your content across multiple platforms with our intelligent timing optimization.',
    icon: Zap,
    color: 'from-neon-blue to-neon-pink'
  }
]

const additionalFeatures = [
  {
    title: 'Content Protection',
    description: 'Keep your content secure with our advanced protection features and watermarking.',
    icon: Shield,
    color: 'from-neon-pink to-neon-purple'
  },
  {
    title: 'Growth Tools',
    description: 'Access powerful tools designed to accelerate your audience growth and engagement.',
    icon: Rocket,
    color: 'from-neon-purple to-neon-blue'
  },
  {
    title: 'Smart Recommendations',
    description: 'Get personalized content and strategy recommendations based on your audience.',
    icon: Sparkles,
    color: 'from-neon-blue to-neon-pink'
  }
]

const platformFeatures = [
  {
    title: 'AI Content Generation',
    description: 'Generate engaging captions, descriptions, and hashtags automatically.',
    icon: Cpu
  },
  {
    title: 'Performance Tracking',
    description: 'Track your content performance and audience growth in real-time.',
    icon: Target
  },
  {
    title: 'Audience Insights',
    description: 'Understand your audience demographics and engagement patterns.',
    icon: Users
  },
  {
    title: 'Enhanced Security',
    description: 'Protect your content with advanced security features.',
    icon: Lock
  },
  {
    title: 'Custom Automation',
    description: 'Create custom automation workflows for your content.',
    icon: Sliders
  },
  {
    title: 'Community Management',
    description: 'Manage your community and engage with your audience effectively.',
    icon: MessageSquare
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Powerful Features for Content Creators
          </h1>
          <p className="text-xl text-gray-300">
            Everything you need to grow your content creation business and engage with your audience.
          </p>
        </motion.div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-dark-light/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors h-full">
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platform Features */}
      <div className="container mx-auto px-4 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Complete Platform Features</h2>
          <p className="text-gray-300">
            OnlySurge provides everything you need to succeed in content creation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-dark-light/20 backdrop-blur-xl p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <feature.icon className="w-6 h-6 text-neon-purple mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="container mx-auto px-4 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">And Much More</h2>
          <p className="text-gray-300">
            Discover additional features that will help you take your content to the next level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-dark-light/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-2xl blur-xl" />
          <div className="relative bg-dark-light/30 backdrop-blur-xl p-12 rounded-2xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of content creators who are already using OnlySurge to grow their audience and monetize their content.
            </p>
            <a
              href="/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Start Creating Now
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 