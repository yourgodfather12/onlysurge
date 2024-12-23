import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileBuilderLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Profile Preview */}
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-800 rounded animate-pulse mt-1" />
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-800 animate-pulse" />
            <div className="flex-1 space-y-4">
              <div>
                <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-800 rounded animate-pulse mt-1" />
              </div>
              <div>
                <div className="h-4 w-16 bg-gray-800 rounded animate-pulse" />
                <div className="h-24 w-full bg-gray-800 rounded animate-pulse mt-1" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-800 rounded animate-pulse mt-1" />
                </div>
                <div className="flex-1">
                  <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-800 rounded animate-pulse mt-1" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-800 rounded animate-pulse mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gray-800/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-800 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
                  <div className="h-16 w-full bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
                  <div className="h-16 w-full bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-20 bg-gray-800 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-800 rounded animate-pulse mt-1" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-gray-800 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-800 rounded animate-pulse mt-1" />
                  </div>
                  <div className="h-4 w-4 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 