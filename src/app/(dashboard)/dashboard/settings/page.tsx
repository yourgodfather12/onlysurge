'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageContainer } from '@/components/layout/page-container';
import { PageHeader } from '@/components/layout/page-header';
import { PlatformManager } from '@/components/platform/platform-manager';
import { useToast } from '@/components/ui/use-toast';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';

// Add TypeScript interfaces
interface SettingsSection {
  title: string;
  description: string;
  component?: React.ReactNode;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Handle notifications
  useEffect(() => {
    const error = searchParams.get('error');
    const success = searchParams.get('success');

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }

    if (success) {
      toast({
        title: 'Success',
        description: success,
      });
    }
  }, [searchParams, toast]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const settingsSections: SettingsSection[] = [
    {
      title: 'Platform Connections',
      description: 'Connect and manage your content platforms.',
      component: <PlatformManager />
    },
    {
      title: 'Account Settings',
      description: 'Update your account preferences and profile information.'
    },
    // ... other sections defined similarly
  ];

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage your account settings and platform connections."
        actions={
          <Button variant="secondary">
            Reset All Settings
          </Button>
        }
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        {settingsSections.map((section, index) => (
          <DashboardCard
            key={index}
            title={section.title}
            description={section.description}
          >
            {section.component || (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                Coming soon
              </div>
            )}
          </DashboardCard>
        ))}
      </div>
    </PageContainer>
  );
} 