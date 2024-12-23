import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Calendar, Filter, Download, RefreshCcw } from 'lucide-react'

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="outline" size="sm" disabled>
            <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 days
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="dashboard-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16">
              <Skeleton className="w-full h-full rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32 mt-2" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="dashboard-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-10 w-10 rounded-lg mb-4" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48 mt-1" />
              </div>
              <Skeleton className="h-5 w-5" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="dashboard-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </div>
                  <Skeleton className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}