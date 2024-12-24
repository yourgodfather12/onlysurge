'use client';

import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { usePlatformStore } from '@/store/platform-store';
import { type Platform } from '@/lib/platform-auth';

interface PlatformMetrics {
  subscribers: number;
  revenue: number;
  engagement: number;
  growth: number;
}

interface PlatformStatsProps {
  platform: Platform;
  metrics?: PlatformMetrics;
  isLoading?: boolean;
}

const defaultMetrics: PlatformMetrics = {
  subscribers: 0,
  revenue: 0,
  engagement: 0,
  growth: 0,
};

export function PlatformStats({
  platform,
  metrics = defaultMetrics,
  isLoading = false,
}: PlatformStatsProps) {
  const { activePlatform } = usePlatformStore();
  const isActive = activePlatform === platform;
  const Icon = platform === 'onlyfans' ? Icons.onlyfans : Icons.fansly;

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-6 w-[120px]" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-full bg-background">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-lg font-semibold capitalize">{platform}</h3>
          <p className="text-sm text-muted-foreground">Platform Statistics</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
          <p className="text-2xl font-bold">
            {metrics.subscribers.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
          <p className="text-2xl font-bold">
            ${metrics.revenue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Engagement</p>
          <p className="text-2xl font-bold">{metrics.engagement}%</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Growth</p>
          <div className="flex items-baseline space-x-1">
            <p className="text-2xl font-bold">{metrics.growth}%</p>
            {metrics.growth > 0 ? (
              <Icons.trendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <Icons.trendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 