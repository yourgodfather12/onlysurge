'use client'

import { ReactNode } from 'react';
import BackgroundParticles from '@/components/ui/BackgroundParticles';
import Navbar from '@/components/layout/Navbar';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen bg-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/10 via-primary-blue/10 to-dark animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Animated Particles */}
      <BackgroundParticles />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
} 