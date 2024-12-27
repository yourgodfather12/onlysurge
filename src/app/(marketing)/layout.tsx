'use client'

import { ReactNode } from 'react';
import { Background } from '@/components/ui/background';
import Navbar from '@/components/layout/Navbar';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <Background>
      <Navbar />
      <main>{children}</main>
    </Background>
  );
} 