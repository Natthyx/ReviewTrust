"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { createClient } from '@/lib/supabase/client'
import { getRedirectPath } from '@/lib/auth/redirects'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        setError(error.message)
        return
      }
      
      // Get user data to check role
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('Failed to get user data')
        return
      }
      
      // Get user profile to check role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      
      if (profileError || !profile) {
        setError('User profile not found')
        return
      }
      
      // Check if user is admin
      if (profile.role !== 'admin') {
        setError('Access denied. Admin access required.')
        await supabase.auth.signOut()
        return
      }
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Sign in to the admin panel</p>
          </div>

          <Card className="p-8 mb-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {/* Form */}
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Admin Email
                </Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="admin@example.com" 
                  className="mt-2" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Card>

          <div className="text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}