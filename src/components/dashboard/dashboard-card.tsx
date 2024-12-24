import { cn } from '@/lib/utils'

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DashboardCard({ children, className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 