'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  color: string
}

const PARTICLE_COUNT = 20
const COLORS = ['bg-neon-pink', 'bg-neon-purple', 'bg-neon-blue']

// Seed-based random number generator for stable positions
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1) * 100,
      y: seededRandom(i * 2) * 100,
      color: COLORS[i % COLORS.length],
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `particle-float ${10 + seededRandom(particle.id) * 10}s linear infinite`,
            animationDelay: `${seededRandom(particle.id * 3) * 5}s`,
          }}
        />
      ))}
    </div>
  )
} 