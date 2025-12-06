import { Tables } from '@/lib/supabase/database.types'

export type UserRole = 'user' | 'business' | 'admin'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  name?: string | null
  avatar_url?: string | null
}

export interface UserProfile extends Tables<'profiles'> {}
// Remove BusinessProfile since we're not using business_profiles table
// export interface BusinessProfile extends Tables<'business_profiles'> {}

export interface RegisterUserData {
  email: string
  password: string
  name: string
  role: UserRole
}

// Simplify business registration to match user registration
export interface RegisterBusinessData extends RegisterUserData {}

export interface LoginCredentials {
  email: string
  password: string
}