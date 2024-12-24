'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Something went wrong</h2>
            <p className="mb-4 text-gray-600">We apologize for the inconvenience. Please try refreshing the page.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
} 