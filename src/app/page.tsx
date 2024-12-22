'use client'

import Hero from '@/components/landing/Hero'
import BackgroundParticles from '@/components/ui/BackgroundParticles'
import Navbar from '@/components/layout/Navbar'

export default function HomePage() {
  return (
    <main>
      <BackgroundParticles />
      <Navbar />
      <Hero />
    </main>
  )
}
