import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MessagesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="h-9 w-24 bg-gray-800 rounded animate-pulse" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-800 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-32 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-800 rounded animate-pulse" />
                <div className="h-3 w-4/5 bg-gray-800 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-800 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 