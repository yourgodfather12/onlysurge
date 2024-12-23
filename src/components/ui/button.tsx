import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-gray-900",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-gray-100 hover:bg-gray-700",
        destructive: "bg-red-500 text-gray-100 hover:bg-red-600",
        outline: "border border-gray-800 hover:bg-gray-800 hover:text-gray-100",
        secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600",
        ghost: "hover:bg-gray-800 hover:text-gray-100",
        link: "underline-offset-4 hover:underline text-gray-100",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 