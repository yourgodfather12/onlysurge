import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PlatformProvider } from '@/lib/platform-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OnlySurge',
  description: 'Manage your creator business across platforms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlatformProvider>
          {children}
        </PlatformProvider>
      </body>
    </html>
  )
}
