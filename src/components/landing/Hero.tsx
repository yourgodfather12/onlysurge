'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const platformIcons = [
  { name: 'TikTok', src: '/icons/tiktok.svg' },
  { name: 'Instagram', src: '/icons/instagram.svg' },
  { name: 'OnlyFans', src: '/icons/onlyfans.svg' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Supercharge</span> Your
                <br />
                Content Creation
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Leverage AI-powered insights and automation to grow your audience
              across all platforms. Get personalized recommendations and optimize
              your content strategy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/signup" className="btn-primary">
                Start Free Trial
              </Link>
              <Link href="#features" className="btn-secondary">
                Learn More
              </Link>
            </motion.div>

            {/* Platform Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <p className="text-sm text-gray-400 mb-4">
                Seamlessly integrate with your favorite platforms
              </p>
              <div className="flex space-x-6">
                {platformIcons.map((icon, index) => (
                  <motion.div
                    key={icon.name}
                    className="glass w-12 h-12 rounded-full p-3 hover:shadow-neon-blue"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.8,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 10,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative rounded-xl overflow-hidden neon-border"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/dashboard-preview.png"
                alt="OnlySurge Dashboard"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
            </motion.div>

            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-6 -left-6 glass rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-neon-pink/20 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Average Growth</p>
                  <p className="text-2xl font-bold gradient-text">+147%</p>
                </div>
              </div>
            </motion.div>

            {/* Additional Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 glass rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-neon-purple animate-pulse" />
                <p className="text-sm font-medium">AI Powered</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 