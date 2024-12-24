'use client';

import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Platform } from '@/lib/platform-auth';

interface Subscriber {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  status: 'active' | 'inactive' | 'blocked';
  tier: string;
  subscribedAt: string;
  expiresAt?: string;
  metrics?: {
    totalSpent: number;
    messagesSent: number;
    contentInteractions: number;
  };
}

interface PlatformSubscribersProps {
  platform: Platform;
  subscribers?: Subscriber[];
  isLoading?: boolean;
}

export function PlatformSubscribers({
  platform,
  subscribers = [],
  isLoading = false,
}: PlatformSubscribersProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const getStatusColor = (status: Subscriber['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'inactive':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'blocked':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {platform} Subscribers
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage and track your subscriber activity
          </p>
        </div>
        <Button>
          <Icons.download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {subscribers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.users className="h-12 w-12 text-muted-foreground mb-4" />
          <h4 className="text-lg font-semibold mb-2">No Subscribers Found</h4>
          <p className="text-sm text-muted-foreground">
            Start promoting your content to gain subscribers
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={subscriber.avatarUrl} />
                  <AvatarFallback>
                    {subscriber.displayName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{subscriber.displayName}</h4>
                    <span className="text-sm text-muted-foreground">
                      @{subscriber.username}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(subscriber.status)}
                    >
                      {subscriber.status}
                    </Badge>
                    <Badge variant="outline">{subscriber.tier}</Badge>
                    <p className="text-xs text-muted-foreground">
                      Subscribed {subscriber.subscribedAt}
                    </p>
                    {subscriber.expiresAt && (
                      <p className="text-xs text-muted-foreground">
                        Expires {subscriber.expiresAt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {subscriber.metrics && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      ${subscriber.metrics.totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.messageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {subscriber.metrics.messagesSent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {subscriber.metrics.contentInteractions.toLocaleString()}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icons.moreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
} 