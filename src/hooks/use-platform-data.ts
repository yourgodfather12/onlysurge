import useSWR from 'swr'
import { fetchAPI } from '@/lib/api-error'
import { Platform } from '@/lib/platform-context'

interface PlatformData {
  stats: {
    subscribers: number
    revenue: number
    engagement: number
    growth: number
  }
  content: {
    total: number
    published: number
    scheduled: number
    draft: number
  }
  recentActivity: {
    id: string
    type: 'subscription' | 'message' | 'purchase' | 'comment'
    user: string
    timestamp: string
    details: string
  }[]
}

interface UsePlatformDataOptions {
  refreshInterval?: number
  shouldFetch?: boolean
}

export function usePlatformData(
  platformId: string | null,
  options: UsePlatformDataOptions = {}
) {
  const { refreshInterval = 0, shouldFetch = true } = options

  const { data, error, mutate, isLoading } = useSWR<PlatformData>(
    shouldFetch && platformId ? `/api/platforms/${platformId}/data` : null,
    fetchAPI,
    {
      refreshInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  const refresh = () => {
    return mutate()
  }

  return {
    data,
    error,
    refresh,
    isLoading,
  }
}

export function useAllPlatformsData(options: UsePlatformDataOptions = {}) {
  const { refreshInterval = 0, shouldFetch = true } = options

  const { data, error, mutate, isLoading } = useSWR<Record<string, PlatformData>>(
    shouldFetch ? '/api/platforms/data' : null,
    fetchAPI,
    {
      refreshInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  const refresh = () => {
    return mutate()
  }

  return {
    data,
    error,
    refresh,
    isLoading,
  }
}

export function usePlatformStats(platformId: string | null) {
  const { data, error, refresh, isLoading } = usePlatformData(platformId, {
    refreshInterval: 60000, // Refresh every minute
  })

  return {
    stats: data?.stats,
    error,
    refresh,
    isLoading,
  }
}

export function usePlatformContent(platformId: string | null) {
  const { data, error, refresh, isLoading } = usePlatformData(platformId)

  return {
    content: data?.content,
    error,
    refresh,
    isLoading,
  }
}

export function usePlatformActivity(platformId: string | null) {
  const { data, error, refresh, isLoading } = usePlatformData(platformId, {
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  return {
    activity: data?.recentActivity,
    error,
    refresh,
    isLoading,
  }
} 