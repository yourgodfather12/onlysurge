import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'X-XSS-Protection': '1; mode=block',
};

// Simple in-memory rate limiting
const rateLimit = new Map();
const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.ip ?? '127.0.0.1';
    const now = Date.now();
    
    // Clean up old entries
    for (const [key, value] of rateLimit.entries()) {
      if (now - value.timestamp > RATE_LIMIT_DURATION) {
        rateLimit.delete(key);
      }
    }
    
    // Check rate limit
    const rateLimitInfo = rateLimit.get(ip) ?? { count: 0, timestamp: now };
    
    if (now - rateLimitInfo.timestamp > RATE_LIMIT_DURATION) {
      rateLimitInfo.count = 0;
      rateLimitInfo.timestamp = now;
    }
    
    rateLimitInfo.count++;
    rateLimit.set(ip, rateLimitInfo);
    
    if (rateLimitInfo.count > MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }
  
  // Apply security headers to all routes
  const response = NextResponse.next();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

export const config = {
  matcher: [
    // Apply to all routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 