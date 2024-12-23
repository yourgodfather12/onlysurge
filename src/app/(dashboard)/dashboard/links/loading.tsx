import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LinksLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
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

      {/* Links List */}
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-800 rounded animate-pulse mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50"
              >
                <div className="h-8 w-8 bg-gray-800 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-64 bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="h-8 w-24 bg-gray-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 