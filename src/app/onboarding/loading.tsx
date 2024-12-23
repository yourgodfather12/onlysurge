import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function OnboardingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="w-full max-w-3xl p-4">
        <div className="flex justify-between mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="relative">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-4 h-4 rounded-full absolute -bottom-1 -right-1" />
              </div>
              {i < 4 && <Skeleton className="w-full h-1 mx-4" />}
            </div>
          ))}
        </div>

        <Card className="backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Profile Image Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <Skeleton className="w-32 h-32 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full absolute bottom-0 right-0" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Platform Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-800 bg-gray-800/50">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex gap-2 mt-3">
                          <Skeleton className="h-6 w-20 rounded-full" />
                          <Skeleton className="h-6 w-24 rounded-full" />
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Info */}
              <div className="rounded-lg border border-gray-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 