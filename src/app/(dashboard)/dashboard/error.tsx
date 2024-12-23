'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-gray-400 mt-2">We&apos;re sorry for the inconvenience.</p>
      </div>
      <Button
        onClick={reset}
        className="mt-4"
      >
        Try again
      </Button>
    </div>
  )
} 