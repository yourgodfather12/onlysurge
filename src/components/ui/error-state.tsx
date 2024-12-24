import { LucideIcon } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  description?: string
  message?: string
  icon?: LucideIcon
  action?: {
    label: string
    onClick: () => void
  }
  onRetry?: () => void
  className?: string
}

export function ErrorState({ 
  title = "Error", 
  description,
  message,
  icon: Icon, 
  action,
  onRetry,
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      {Icon && <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />}
      <h3 className="text-lg font-medium text-gray-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description || message}</p>
      {(action || onRetry) && (
        <Button 
          onClick={action?.onClick || onRetry} 
          variant="secondary"
        >
          {action?.label || "Try Again"}
        </Button>
      )}
    </div>
  )
} 