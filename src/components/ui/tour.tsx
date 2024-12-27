"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  LightbulbIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { typography } from "@/styles/typography"

interface TourStep {
  target: string
  title: string
  description: string
  position?: 'top' | 'right' | 'bottom' | 'left'
  highlight?: boolean
}

interface TourProps {
  steps: TourStep[]
  isOpen: boolean
  currentStep: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  onComplete: () => void
}

export function Tour({
  steps,
  isOpen,
  currentStep,
  onNext,
  onPrev,
  onClose,
  onComplete
}: TourProps) {
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement
      setTargetElement(element)
    }
  }, [isOpen, currentStep, steps])

  if (!isOpen || !targetElement) return null

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  // Calculate position relative to target element
  const targetRect = targetElement.getBoundingClientRect()
  const position = step.position || 'bottom'

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          top: targetRect.top - 16,
          left: targetRect.left + (targetRect.width / 2),
          transform: 'translate(-50%, -100%)'
        }
      case 'right':
        return {
          top: targetRect.top + (targetRect.height / 2),
          left: targetRect.right + 16,
          transform: 'translateY(-50%)'
        }
      case 'left':
        return {
          top: targetRect.top + (targetRect.height / 2),
          left: targetRect.left - 16,
          transform: 'translate(-100%, -50%)'
        }
      default:
        return {
          top: targetRect.bottom + 16,
          left: targetRect.left + (targetRect.width / 2),
          transform: 'translateX(-50%)'
        }
    }
  }

  return (
    <>
      {/* Highlight overlay */}
      {step.highlight && (
        <div
          className="fixed inset-0 bg-black/50 pointer-events-none z-50"
          style={{
            maskImage: `radial-gradient(circle at ${targetRect.left + targetRect.width/2}px ${targetRect.top + targetRect.height/2}px, transparent 50px, black 80px)`
          }}
        />
      )}

      {/* Tour card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed z-50"
        style={getPositionStyles()}
      >
        <Card className="w-80 p-4 bg-zinc-900/95 border-zinc-800/50 backdrop-blur-sm shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-pink-500/10 ring-1 ring-inset ring-pink-500/20">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
              </div>
              <h4 className={cn(typography.h4, "text-white")}>{step.title}</h4>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-white/5"
              onClick={onClose}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <p className={cn(typography.body2, "text-zinc-400 mt-2")}>
            {step.description}
          </p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <LightbulbIcon className="h-3.5 w-3.5" />
              <span>Tip {currentStep + 1} of {steps.length}</span>
            </div>
            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-full hover:bg-white/5"
                  onClick={onPrev}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              )}
              <Button
                size="sm"
                className="h-7 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                onClick={isLastStep ? onComplete : onNext}
              >
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  )
} 