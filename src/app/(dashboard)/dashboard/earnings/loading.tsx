import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function EarningsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 w-24 bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 w-24 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-zinc-800 rounded animate-pulse" />
              <div className="mt-2 h-3 w-16 bg-zinc-800 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse mt-1" />
            </div>
            <div className="h-10 w-24 bg-zinc-800 rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 bg-zinc-800 rounded animate-pulse" />
                  <div>
                    <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse mt-1" />
                  </div>
                </div>
                <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse mt-1" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-zinc-800 rounded animate-pulse" />
        </CardContent>
      </Card>
    </div>
  )
} 