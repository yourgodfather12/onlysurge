'use client';

import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Platform } from '@/lib/platform-auth';

interface AnalyticsMetrics {
  revenue: {
    total: number;
    growth: number;
    history: { date: string; value: number }[];
  };
  subscribers: {
    total: number;
    growth: number;
    history: { date: string; value: number }[];
  };
  engagement: {
    total: number;
    growth: number;
    history: { date: string; value: number }[];
  };
  content: {
    total: number;
    growth: number;
    history: { date: string; value: number }[];
  };
}

interface PlatformAnalyticsProps {
  platform: Platform;
  metrics?: AnalyticsMetrics;
  isLoading?: boolean;
}

export function PlatformAnalytics({
  platform,
  metrics,
  isLoading = false,
}: PlatformAnalyticsProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px]" />
          ))}
        </div>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.barChart className="h-12 w-12 text-muted-foreground mb-4" />
          <h4 className="text-lg font-semibold mb-2">No Analytics Available</h4>
          <p className="text-sm text-muted-foreground">
            Start creating content to see your performance metrics
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {platform} Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            Track your platform performance and growth
          </p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icons.download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Revenue</h4>
            <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">
              ${metrics.revenue.total.toLocaleString()}
            </p>
            <div
              className={`flex items-center text-sm ${
                metrics.revenue.growth >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {metrics.revenue.growth >= 0 ? (
                <Icons.trendingUp className="h-4 w-4 mr-1" />
              ) : (
                <Icons.trendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(metrics.revenue.growth)}%
            </div>
          </div>
          {/* Add revenue chart here */}
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Subscribers
            </h4>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">
              {metrics.subscribers.total.toLocaleString()}
            </p>
            <div
              className={`flex items-center text-sm ${
                metrics.subscribers.growth >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {metrics.subscribers.growth >= 0 ? (
                <Icons.trendingUp className="h-4 w-4 mr-1" />
              ) : (
                <Icons.trendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(metrics.subscribers.growth)}%
            </div>
          </div>
          {/* Add subscribers chart here */}
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Engagement
            </h4>
            <Icons.activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">
              {metrics.engagement.total.toLocaleString()}%
            </p>
            <div
              className={`flex items-center text-sm ${
                metrics.engagement.growth >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {metrics.engagement.growth >= 0 ? (
                <Icons.trendingUp className="h-4 w-4 mr-1" />
              ) : (
                <Icons.trendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(metrics.engagement.growth)}%
            </div>
          </div>
          {/* Add engagement chart here */}
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Content</h4>
            <Icons.layers className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">
              {metrics.content.total.toLocaleString()}
            </p>
            <div
              className={`flex items-center text-sm ${
                metrics.content.growth >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {metrics.content.growth >= 0 ? (
                <Icons.trendingUp className="h-4 w-4 mr-1" />
              ) : (
                <Icons.trendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(metrics.content.growth)}%
            </div>
          </div>
          {/* Add content chart here */}
        </Card>
      </div>
    </Card>
  );
} 