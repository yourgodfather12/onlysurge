'use client';

import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Platform } from '@/lib/platform-auth';

interface Message {
  id: string;
  content: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: string;
  subscriber: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  attachments?: {
    type: 'image' | 'video' | 'file';
    url: string;
    name: string;
  }[];
  metrics?: {
    tips: number;
    purchases: number;
  };
}

interface PlatformMessagesProps {
  platform: Platform;
  messages?: Message[];
  isLoading?: boolean;
}

export function PlatformMessages({
  platform,
  messages = [],
  isLoading = false,
}: PlatformMessagesProps) {
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
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'delivered':
        return 'bg-blue-500/10 text-blue-500';
      case 'read':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return Icons.check;
      case 'delivered':
        return Icons.checkCheck;
      case 'read':
        return Icons.eye;
      default:
        return Icons.circle;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {platform} Messages
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage and track your subscriber communications
          </p>
        </div>
        <Button>
          <Icons.messageSquarePlus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.messageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h4 className="text-lg font-semibold mb-2">No Messages Found</h4>
          <p className="text-sm text-muted-foreground">
            Start engaging with your subscribers through messages
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => {
            const StatusIcon = getStatusIcon(message.status);
            return (
              <div
                key={message.id}
                className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={message.subscriber.avatarUrl} />
                    <AvatarFallback>
                      {message.subscriber.displayName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">
                        {message.subscriber.displayName}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        @{message.subscriber.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex items-center space-x-2 mt-2">
                        {message.attachments.map((attachment, index) => (
                          <Badge key={index} variant="secondary">
                            {attachment.type === 'image' && (
                              <Icons.image className="h-3 w-3 mr-1" />
                            )}
                            {attachment.type === 'video' && (
                              <Icons.video className="h-3 w-3 mr-1" />
                            )}
                            {attachment.type === 'file' && (
                              <Icons.file className="h-3 w-3 mr-1" />
                            )}
                            {attachment.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className={getStatusColor(message.status)}
                  >
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {message.status}
                  </Badge>
                  {message.metrics && (
                    <>
                      <div className="flex items-center space-x-1">
                        <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          ${message.metrics.tips.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icons.shoppingCart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {message.metrics.purchases.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                  <Button variant="ghost" size="icon">
                    <Icons.moreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
} 