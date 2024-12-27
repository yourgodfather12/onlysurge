"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Tour } from '@/components/ui/tour'

interface TourContextType {
  startTour: (tourId: string) => void
  endTour: () => void
  isTourActive: boolean
}

const TourContext = createContext<TourContextType | undefined>(undefined)

// Define tour steps for different pages
const tours = {
  dashboard: [
    {
      target: '[data-tour="metrics"]',
      title: 'Performance Metrics',
      description: 'Track your key metrics and performance indicators at a glance.',
      position: 'bottom' as const,
      highlight: true
    },
    {
      target: '[data-tour="quick-actions"]',
      title: 'Quick Actions',
      description: 'Access commonly used features and tools from here.',
      position: 'bottom' as const,
      highlight: true
    },
    {
      target: '[data-tour="ai-tools"]',
      title: 'AI Tools',
      description: 'Explore AI-powered features to automate your workflow.',
      position: 'right' as const,
      highlight: true
    }
  ],
  'content-vault': [
    {
      target: '[data-tour="upload"]',
      title: 'Content Upload',
      description: 'Drag and drop or click to upload your content here.',
      position: 'bottom' as const,
      highlight: true
    },
    {
      target: '[data-tour="schedule"]',
      title: 'Content Schedule',
      description: 'Plan and schedule your content for optimal engagement.',
      position: 'right' as const,
      highlight: true
    }
  ],
  messages: [
    {
      target: '[data-tour="auto-reply"]',
      title: 'Smart Auto-Reply',
      description: 'Set up AI-powered automated responses to common messages.',
      position: 'right' as const,
      highlight: true
    },
    {
      target: '[data-tour="inbox"]',
      title: 'Unified Inbox',
      description: 'Manage all your conversations in one place.',
      position: 'bottom' as const,
      highlight: true
    }
  ],
  settings: [
    {
      target: '[data-tour="quick-settings"]',
      title: 'Quick Settings',
      description: 'Quickly toggle common settings and preferences.',
      position: 'bottom' as const,
      highlight: true
    },
    {
      target: '[data-tour="security"]',
      title: 'Security Settings',
      description: 'Enhance your account security with additional features.',
      position: 'right' as const,
      highlight: true
    }
  ]
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [activeTour, setActiveTour] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTour, setHasSeenTour] = useState<Record<string, boolean>>({})

  // Load tour history from localStorage
  useEffect(() => {
    const savedTourHistory = localStorage.getItem('tourHistory')
    if (savedTourHistory) {
      setHasSeenTour(JSON.parse(savedTourHistory))
    }
  }, [])

  // Save tour history to localStorage
  useEffect(() => {
    if (Object.keys(hasSeenTour).length > 0) {
      localStorage.setItem('tourHistory', JSON.stringify(hasSeenTour))
    }
  }, [hasSeenTour])

  const startTour = (tourId: string) => {
    // Only start the tour if it hasn't been seen before
    if (!hasSeenTour[tourId]) {
      setActiveTour(tourId)
      setCurrentStep(0)
    }
  }

  const endTour = () => {
    if (activeTour) {
      setHasSeenTour(prev => ({ ...prev, [activeTour]: true }))
    }
    setActiveTour(null)
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (activeTour && currentStep < tours[activeTour as keyof typeof tours].length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <TourContext.Provider value={{ startTour, endTour, isTourActive: !!activeTour }}>
      {children}
      {activeTour && (
        <Tour
          steps={tours[activeTour as keyof typeof tours]}
          isOpen={true}
          currentStep={currentStep}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={endTour}
          onComplete={endTour}
        />
      )}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider')
  }
  return context
} 