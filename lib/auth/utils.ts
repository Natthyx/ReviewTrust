import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { AuthUser, UserRole } from './types'

/**
 * Get the current authenticated user
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const supabase = createSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  // Get user profile to determine role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, email, role')
    .eq('id', user.id)
    .single()
  
  if (profileError || !profile) {
    return null
  }
  
  return {
    id: user.id,
    email: user.email!,
    role: profile.role as UserRole,
    name: profile.name,
    avatar_url: null
  }
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Check user role
 */
export const hasRole = async (role: UserRole): Promise<boolean> => {
  const user = await getCurrentUser()
  return user?.role === role || false
}

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  const supabase = createSupabaseClient()
  await supabase.auth.signOut()
}