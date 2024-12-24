import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CookieOptions } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  try {
    // Create response and Supabase client
    const res = NextResponse.next()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            res.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            res.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    // Security headers
    res.headers.set('X-Frame-Options', 'DENY')
    res.headers.set('X-Content-Type-Options', 'nosniff')
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    )
    
    // Remove powered by header
    res.headers.delete('x-powered-by')

    // Rate limiting (basic implementation)
    const clientIp = req.ip ?? 'unknown'
    const rateLimit = await getRateLimit(clientIp)
    if (rateLimit.exceeded) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }

    // Refresh session if expired
    const { data: { session } } = await supabase.auth.getSession()

    // Add user context to headers if authenticated
    if (session) {
      res.headers.set('x-user-id', session.user.id)
      res.headers.set('x-user-role', session.user.role)
    }

    // Handle maintenance mode
    if (process.env.MAINTENANCE_MODE === 'true' && !isMaintenanceExempt(req.url)) {
      return NextResponse.rewrite(new URL('/maintenance', req.url))
    }

    return res
  } catch (error) {
    // Log error (implement proper error logging in production)
    console.error('Middleware error:', error)

    // Return graceful error response
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Rate limiting helper
async function getRateLimit(ip: string) {
  // Implement proper rate limiting with Redis or similar
  return { exceeded: false }
}

// Maintenance mode helper
function isMaintenanceExempt(url: string): boolean {
  // Add logic to exempt certain paths
  return url.includes('/api/health')
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api/health (health check endpoint)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/health).*)',
  ],
} 