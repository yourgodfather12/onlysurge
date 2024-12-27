import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PlatformProvider } from '@/lib/platform-context'
import { ErrorBoundary } from '@/components/error-boundary'
import { ToastContainer } from '@/components/toast'
import { ThemeProvider } from '@/components/theme-provider'
import { TourProvider } from '@/contexts/tour-context'

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark">
            <TourProvider>
              <PlatformProvider>
                <main className="relative flex min-h-screen flex-col">
                  {children}
                </main>
                <ToastContainer position="bottom-center" />
              </PlatformProvider>
            </TourProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
