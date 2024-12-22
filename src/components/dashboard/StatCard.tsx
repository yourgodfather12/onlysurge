'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

interface StatCardProps {
  title: string
  value: string
  change?: string
  icon: React.ElementType
  trend?: 'up' | 'down'
}

export default function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-xl p-6 hover:ring-2 hover:ring-primary/20 transition-all"
    >
      <div className="flex items-center justify-between">
        <Icon className="w-8 h-8 text-primary" />
        {change && (
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            {change}
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-white">{value}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </motion.div>
  )
} 