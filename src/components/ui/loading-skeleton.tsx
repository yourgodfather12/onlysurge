import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      <div className="h-8 bg-gray-800 rounded w-1/4" />
      <div className="h-32 bg-gray-800 rounded" />
    </div>
  )
} 