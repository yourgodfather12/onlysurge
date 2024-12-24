'use client';

import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Platform } from '@/lib/platform-auth';

interface Promotion {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled';
  startDate?: string;
  endDate?: string;
  metrics?: {
    clicks: number;
    conversions: number;
    revenue: number;
    roi: number;
  };
  settings: {
    discount?: number;
    type: 'percentage' | 'fixed' | 'trial';
    platforms: Platform[];
  };
}

interface PlatformPromotionsProps {
  platform: Platform;
  promotions?: Promotion[];
  isLoading?: boolean;
}

export function PlatformPromotions({
  platform,
  promotions = [],
  isLoading = false,
}: PlatformPromotionsProps) {
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

  const getStatusColor = (status: Promotion['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-500';
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'completed':
        return 'bg-purple-500/10 text-purple-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getPromotionTypeIcon = (type: Promotion['settings']['type']) => {
    switch (type) {
      case 'percentage':
        return Icons.rocket;
      case 'fixed':
        return Icons.dollarSign;
      case 'trial':
        return Icons.sparkles;
      default:
        return Icons.rocket;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {platform} Promotions
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage and track your promotional campaigns
          </p>
        </div>
        <Button>
          <Icons.plus className="h-4 w-4 mr-2" />
          New Promotion
        </Button>
      </div>

      {promotions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.rocket className="h-12 w-12 text-muted-foreground mb-4" />
          <h4 className="text-lg font-semibold mb-2">No Promotions Found</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first promotion to boost your content visibility
          </p>
          <Button>
            <Icons.plus className="h-4 w-4 mr-2" />
            Create Promotion
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {promotions.map((promotion) => {
            const TypeIcon = getPromotionTypeIcon(promotion.settings.type);
            return (
              <div
                key={promotion.id}
                className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-background">
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{promotion.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {promotion.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(promotion.status)}
                      >
                        {promotion.status}
                      </Badge>
                      {promotion.settings.discount && (
                        <Badge variant="outline">
                          {promotion.settings.type === 'percentage'
                            ? `${promotion.settings.discount}% OFF`
                            : promotion.settings.type === 'fixed'
                            ? `$${promotion.settings.discount} OFF`
                            : `${promotion.settings.discount} Days Trial`}
                        </Badge>
                      )}
                      {promotion.startDate && promotion.endDate && (
                        <span className="text-xs text-muted-foreground">
                          {promotion.startDate} - {promotion.endDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {promotion.metrics && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icons.link className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {promotion.metrics.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {promotion.metrics.conversions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        ${promotion.metrics.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.trendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{promotion.metrics.roi}%</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icons.moreHorizontal className="h-4 w-4" />
                    </Button>
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