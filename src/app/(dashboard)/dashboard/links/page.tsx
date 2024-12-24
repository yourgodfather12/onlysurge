'use client'

import * as React from 'react'
import { Link2, Search, Filter, RefreshCcw, Plus, Copy, ExternalLink, Edit, MoreVertical, TrendingUp, DollarSign, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DashboardCard, DashboardCardHeader, DashboardCardContent } from '@/components/ui/dashboard-card'
import { usePlatform } from '@/lib/platform-context'
import { useDashboard } from '@/app/(dashboard)/layout'
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { cn } from '@/lib/utils'

interface Link {
  id: string
  title: string
  url: string
  platform: 'onlyfans' | 'fansly'
  status: 'active' | 'inactive'
  metrics: {
    clicks: string
    revenue: string
    conversion: string
  }
  createdAt: string
}

const defaultLinks: Link[] = [
  {
    id: '1',
    title: 'VIP Content Bundle',
    url: 'https://onlyfans.com/s/bundle-vip',
    platform: 'onlyfans',
    status: 'active',
    metrics: {
      clicks: '1,234',
      revenue: '$567',
      conversion: '8.5%',
    },
    createdAt: '2023-12-01',
  },
  {
    id: '2',
    title: 'Holiday Special',
    url: 'https://fansly.com/s/holiday-special',
    platform: 'fansly',
    status: 'active',
    metrics: {
      clicks: '856',
      revenue: '$234',
      conversion: '6.2%',
    },
    createdAt: '2023-12-15',
  },
  {
    id: '3',
    title: 'Exclusive Photos',
    url: 'https://onlyfans.com/s/exclusive-photos',
    platform: 'onlyfans',
    status: 'inactive',
    metrics: {
      clicks: '432',
      revenue: '$89',
      conversion: '4.1%',
    },
    createdAt: '2023-11-20',
  },
]

const InsightsPanel = React.memo(function InsightsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50">
        <div className="p-2 rounded-lg bg-emerald-500/10">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-medium">Top Performer</h3>
          <p className="text-sm text-zinc-400">VIP Bundle: 1,234 clicks</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50">
        <div className="p-2 rounded-lg bg-pink-500/10">
          <DollarSign className="h-5 w-5 text-pink-500" />
        </div>
        <div>
          <h3 className="font-medium">Revenue Growth</h3>
          <p className="text-sm text-zinc-400">+15% from last month</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Target className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="font-medium">Conversion Rate</h3>
          <p className="text-sm text-zinc-400">8.5% conversion rate</p>
        </div>
      </div>
    </div>
  )
})

const LinkCard = React.memo(function LinkCard({ link }: { link: Link }) {
  const getStatusColor = React.useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-emerald-500'
      case 'inactive':
        return 'text-zinc-400'
      default:
        return 'text-zinc-400'
    }
  }, [])

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link.url)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }, [link.url])

  return (
    <DashboardCard>
      <DashboardCardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-zinc-900">
              <Link2 className="h-5 w-5 text-pink-500" />
            </div>
            <div>
              <h3 className="font-medium">{link.title}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>{link.url}</span>
                <button onClick={handleCopy} className="hover:text-zinc-300">
                  <Copy className="h-4 w-4" />
                </button>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-sm", getStatusColor(link.status))}>
              {link.status}
            </span>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-zinc-900/50">
            <div className="text-sm text-zinc-400">Clicks</div>
            <div className="mt-1 text-lg font-semibold">{link.metrics.clicks}</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/50">
            <div className="text-sm text-zinc-400">Revenue</div>
            <div className="mt-1 text-lg font-semibold">{link.metrics.revenue}</div>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/50">
            <div className="text-sm text-zinc-400">Conversion</div>
            <div className="mt-1 text-lg font-semibold">{link.metrics.conversion}</div>
          </div>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  )
})

const QuickActions = React.memo(function QuickActions() {
  return (
    <DashboardCard>
      <DashboardCardHeader>
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <p className="text-sm text-zinc-400">Common link management tasks</p>
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            Create New Link
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh Analytics
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            Archive Old Links
          </Button>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  )
})

export default function LinksPage() {
  const { setPageProps } = useDashboard()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [links, setLinks] = React.useState<Link[]>(defaultLinks)
  const { currentPlatform } = usePlatform()

  const handleRefresh = React.useCallback(async () => {
    try {
      setIsRefreshing(true)
      setError(null)
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In a real app, you would fetch new data here
      setLinks(defaultLinks)
    } catch (err) {
      setError('Failed to refresh links')
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  const filteredLinks = React.useMemo(() => {
    if (!currentPlatform) return links
    return links.filter(link => link.platform === currentPlatform.type)
  }, [links, currentPlatform])

  const actions = React.useMemo(() => (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-pink-500/20"
        onClick={handleRefresh}
      >
        <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="gap-2 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-pink-500/20"
      >
        <Search className="h-4 w-4" />
        Search
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="gap-2 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-pink-500/20"
      >
        <Filter className="h-4 w-4" />
        Filter
      </Button>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        New Link
      </Button>
    </div>
  ), [handleRefresh, isRefreshing])

  React.useEffect(() => {
    setPageProps({
      title: "Links",
      description: "Manage your promotional links and track performance",
      showPlatformFilter: true,
      actions
    })
  }, [setPageProps, actions])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRefresh} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {filteredLinks.length === 0 ? (
            <EmptyState 
              title="No links yet"
              description="Create your first promotional link to get started"
              action={<Button>Create Link</Button>}
            />
          ) : (
            <div className="grid gap-4">
              {filteredLinks.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <DashboardCard>
            <DashboardCardHeader>
              <h2 className="text-lg font-semibold">Insights</h2>
              <p className="text-sm text-zinc-400">Performance overview of your links</p>
            </DashboardCardHeader>
            <DashboardCardContent>
              <InsightsPanel />
            </DashboardCardContent>
          </DashboardCard>
          <QuickActions />
        </div>
      </div>
    </div>
  )
} 