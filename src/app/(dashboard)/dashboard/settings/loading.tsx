'use client'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32 bg-gray-800" />
        <Skeleton className="h-4 w-64 mt-2 bg-gray-800" />
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <Skeleton className="h-6 w-32 mb-4 bg-gray-700" />
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-700" />
                <Skeleton className="h-10 w-full bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-gray-700" />
                <Skeleton className="h-10 w-full bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 bg-gray-700" />
                <Skeleton className="h-24 w-full bg-gray-700" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <Skeleton className="h-6 w-40 mb-4 bg-gray-700" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-48 bg-gray-700" />
                  <Skeleton className="h-3 w-64 bg-gray-700" />
                </div>
                <Skeleton className="h-6 w-12 bg-gray-700" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40 bg-gray-700" />
                  <Skeleton className="h-3 w-56 bg-gray-700" />
                </div>
                <Skeleton className="h-6 w-12 bg-gray-700" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36 bg-gray-700" />
                  <Skeleton className="h-3 w-52 bg-gray-700" />
                </div>
                <Skeleton className="h-6 w-12 bg-gray-700" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <Skeleton className="h-6 w-48 mb-4 bg-gray-700" />
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                  <Skeleton className="h-3 w-48 mt-1 bg-gray-700" />
                </div>
                <Skeleton className="h-10 w-24 bg-gray-700" />
              </div>
              <Skeleton className="h-px w-full bg-gray-700" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-32 bg-gray-700" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 