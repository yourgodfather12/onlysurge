'use client';

import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Platform } from '@/lib/platform-auth';

interface ContentItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'text';
  status: 'draft' | 'scheduled' | 'published';
  scheduledFor?: string;
  publishedAt?: string;
  metrics?: {
    views: number;
    likes: number;
    comments: number;
    revenue: number;
  };
}

interface PlatformContentProps {
  platform: Platform;
  content?: ContentItem[];
  isLoading?: boolean;
}

export function PlatformContent({
  platform,
  content = [],
  isLoading = false,
}: PlatformContentProps) {
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

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-500';
      case 'published':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'image':
        return Icons.image;
      case 'video':
        return Icons.video;
      case 'text':
        return Icons.text;
      default:
        return Icons.file;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {platform} Content
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage and track your content performance
          </p>
        </div>
        <Button>
          <Icons.plus className="h-4 w-4 mr-2" />
          New Content
        </Button>
      </div>

      {content.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.empty className="h-12 w-12 text-muted-foreground mb-4" />
          <h4 className="text-lg font-semibold mb-2">No Content Found</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get started by creating your first piece of content
          </p>
          <Button>
            <Icons.plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {content.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-background">
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                      {item.scheduledFor && (
                        <p className="text-xs text-muted-foreground">
                          Scheduled for {item.scheduledFor}
                        </p>
                      )}
                      {item.publishedAt && (
                        <p className="text-xs text-muted-foreground">
                          Published on {item.publishedAt}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {item.metrics && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icons.eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {item.metrics.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {item.metrics.likes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.messageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {item.metrics.comments.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        ${item.metrics.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
} 