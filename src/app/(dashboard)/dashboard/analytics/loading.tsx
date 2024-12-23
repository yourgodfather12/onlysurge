import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
              <div className="mt-2 h-3 w-16 bg-gray-800 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="h-5 w-32 bg-gray-800 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-800 rounded animate-pulse" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="h-5 w-32 bg-gray-800 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-800 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 