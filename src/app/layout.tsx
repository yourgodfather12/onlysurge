import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PlatformProvider } from '@/lib/platform-context'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'OnlySurge',
  description: 'Your app description here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <PlatformProvider>
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
        </PlatformProvider>
      </body>
    </html>
  )
}
