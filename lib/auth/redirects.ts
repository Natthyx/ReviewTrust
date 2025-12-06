import { AuthUser } from './types'

/**
 * Get redirect path based on user role
 */
export const getRedirectPath = (user: AuthUser): string => {
  switch (user.role) {
    case 'user':
      // Users are redirected to the public categories page
      return '/categories'
    case 'business':
      // Businesses go to their dashboard
      return '/business/dashboard'
    case 'admin':
      // Admins go to admin dashboard
      return '/admin/dashboard'
    default:
      // Fallback to home page
      return '/'
  }
}

/**
 * Get redirect path for email verification
 */
export const getEmailVerificationRedirectPath = (): string => {
  // After email verification, redirect to login page
  return '/auth/login?message=email_verified'
}