'use client'

import Navbar from '@/components/layout/Navbar'
import { Background } from '@/components/ui/background'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Background>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </Background>
  )
} 