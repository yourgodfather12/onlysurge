import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Metric } from '@/types/dashboard'

interface MetricCardProps extends Metric {
  className?: string
}

export function MetricCard({
  title,
  value,
  trend,
  change,
  description,
  icon: Icon,
  colorClass,
  bgColorClass,
  className
}: MetricCardProps) {
  const TrendIcon = trend === 'up' 
    ? TrendingUp 
    : trend === 'down' 
    ? TrendingDown 
    : Minus

  const trendColor = trend === 'up' 
    ? 'text-emerald-500' 
    : trend === 'down' 
    ? 'text-red-500' 
    : 'text-zinc-500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn("rounded-lg p-2", bgColorClass)}>
          <Icon className={cn("h-5 w-5", colorClass)} />
        </div>
        <div className="flex items-center gap-1">
          <TrendIcon className={cn("h-4 w-4", trendColor)} />
          <span className={cn("text-sm font-medium", trendColor)}>
            {change}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-zinc-400">
          {title}
        </h3>
        <div className="text-2xl font-semibold text-white">
          {value}
        </div>
        {description && (
          <p className="text-sm text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute -right-2 -top-2 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-white/0 blur-2xl" />
    </motion.div>
  )
} 