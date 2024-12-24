'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { usePlatformStore } from '@/store/platform-store';
import {
  connectPlatform,
  disconnectPlatform,
  getPlatformAuthUrl,
  getPlatformStatus,
  type Platform,
} from '@/lib/platform-auth';
import { useToast } from '@/components/ui/use-toast';

const platforms: { id: Platform; name: string; icon: keyof typeof Icons }[] = [
  { id: 'onlyfans', name: 'OnlyFans', icon: 'onlyfans' },
  { id: 'fansly', name: 'Fansly', icon: 'fansly' },
];

export function PlatformManager() {
  const { toast } = useToast();
  const {
    connectedPlatforms,
    isConnecting,
    error,
    setConnectedPlatforms,
    setIsConnecting,
    setError,
    addPlatform,
    removePlatform,
  } = usePlatformStore();

  useEffect(() => {
    const checkPlatformStatus = async () => {
      const statuses = await Promise.all(
        platforms.map(async (platform) => {
          const isConnected = await getPlatformStatus(platform.id);
          return isConnected ? platform.id : null;
        })
      );

      const connected = statuses.filter(
        (status): status is Platform => status !== null
      );
      setConnectedPlatforms(connected);
    };

    checkPlatformStatus();
  }, [setConnectedPlatforms]);

  const handleConnect = async (platform: Platform) => {
    setIsConnecting(true);
    setError(null);

    try {
      const authUrl = getPlatformAuthUrl(platform);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting platform:', error);
      setError('Failed to connect platform');
      toast({
        title: 'Error',
        description: 'Failed to connect platform. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async (platform: Platform) => {
    setIsConnecting(true);
    setError(null);

    try {
      const success = await disconnectPlatform(platform);
      if (success) {
        removePlatform(platform);
        toast({
          title: 'Success',
          description: `Successfully disconnected ${platform}`,
        });
      } else {
        throw new Error('Failed to disconnect platform');
      }
    } catch (error) {
      console.error('Error disconnecting platform:', error);
      setError('Failed to disconnect platform');
      toast({
        title: 'Error',
        description: 'Failed to disconnect platform. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {platforms.map((platform) => {
        const Icon = Icons[platform.icon];
        const isConnected = connectedPlatforms.includes(platform.id);

        return (
          <Card
            key={platform.id}
            className="flex flex-col items-center justify-between p-6 space-y-4"
          >
            <div className="flex flex-col items-center space-y-2">
              <Icon className="w-12 h-12" />
              <h3 className="text-lg font-semibold">{platform.name}</h3>
            </div>
            <Button
              variant={isConnected ? 'destructive' : 'default'}
              disabled={isConnecting}
              onClick={() =>
                isConnected
                  ? handleDisconnect(platform.id)
                  : handleConnect(platform.id)
              }
              className="w-full"
            >
              {isConnecting ? (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              ) : isConnected ? (
                'Disconnect'
              ) : (
                'Connect'
              )}
            </Button>
          </Card>
        );
      })}
    </div>
  );
} 