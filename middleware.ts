import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set() {
          // We don't need to set cookies in middleware
        },
        remove() {
          // We don't need to remove cookies in middleware
        },
      },
    }
  )
  
  // Get user session
  const { data: { session } } = await supabase.auth.getSession()
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/user',
    '/business',
    '/admin',
  ]
  
  // Auth routes that should not be accessed by authenticated users
  const authRoutes = [
    '/auth/login',
    '/auth/register',
  ]
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  // If accessing a protected route without being authenticated
  if (isProtectedRoute && !session) {
    // Redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(url)
  }
  
  // If accessing auth routes while authenticated
  if (isAuthRoute && session) {
    // Get user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    // Redirect based on role
    if (profile?.role === 'user') {
      const url = request.nextUrl.clone()
      url.pathname = '/categories'
      return NextResponse.redirect(url)
    } else if (profile?.role === 'business') {
      const url = request.nextUrl.clone()
      url.pathname = '/business/dashboard'
      return NextResponse.redirect(url)
    } else if (profile?.role === 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/dashboard'
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}