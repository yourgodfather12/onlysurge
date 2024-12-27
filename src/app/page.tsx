'use client'

import Hero from '@/components/landing/Hero'
import { Background } from '@/components/ui/background'
import Navbar from '@/components/layout/Navbar'

export default function HomePage() {
  return (
    <Background>
      <Navbar />
      <Hero />
    </Background>
  )
}
