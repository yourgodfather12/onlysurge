'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function MessagesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Messages List */}
        <div className="col-span-4 flex flex-col border border-zinc-800 rounded-xl overflow-hidden">
          {/* Status Filter */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <Skeleton className="h-9 w-full rounded-full" />
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-zinc-800">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-3 w-20 mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversation View */}
        <div className="col-span-8 flex flex-col border border-zinc-800 rounded-xl overflow-hidden">
          {/* Conversation Header */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-20 w-3/4 rounded-lg" />
                  <Skeleton className="h-3 w-16 mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
            <div className="flex items-end gap-4">
              <div className="flex-1 bg-zinc-800/50 rounded-lg p-2">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
                <Skeleton className="h-6 w-full rounded" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 