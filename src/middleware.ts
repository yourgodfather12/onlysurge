import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Development bypass
  if (process.env.NODE_ENV === 'development') {
    // You can still log the would-be redirects for debugging
    const { pathname } = request.nextUrl
    console.log(`[Dev Mode] Would redirect: ${pathname}`)
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has('auth_token')
  const hasCompletedOnboarding = request.cookies.has('onboarding_completed')

  // Public routes that don't require authentication
  if (pathname.startsWith('/auth') || pathname === '/') {
    if (isAuthenticated) {
      if (!hasCompletedOnboarding) {
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Protected routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Onboarding route
  if (pathname === '/onboarding') {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (hasCompletedOnboarding) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Dashboard and other protected routes
  if (!hasCompletedOnboarding) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  return NextResponse.next()
}

// Optionally exclude more paths from middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\..*|_next/webpack-hmr).*)',
  ],
} 