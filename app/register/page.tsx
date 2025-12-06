"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { registerUser, registerBusiness } from "@/app/auth/actions"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"user" | "business">("user")
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.target as HTMLFormElement)
    
    try {
      if (userType === "user") {
        // Register user
        const userData = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          full_name: formData.get('full_name') as string,
          role: userType
        }
        
        const result = await registerUser(userData)
        if (result?.error) {
          setError(result.error)
        }
      } else {
        // Register business
        const businessData = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          full_name: formData.get('full_name') as string,
          company_name: formData.get('company_name') as string,
          business_address: formData.get('business_address') as string || undefined,
          phone_number: formData.get('phone_number') as string || undefined,
          website: formData.get('website') as string || undefined,
          description: formData.get('description') as string || undefined,
          role: userType
        }
        
        const result = await registerBusiness(businessData)
        if (result?.error) {
          setError(result.error)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar role="guest" />
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-2">Join ReviewTrust today</p>
          </div>

          <Card className="p-8 mb-6">
            {/* User Type Selector */}
            <div className="flex gap-3 mb-6 p-1 bg-muted rounded-lg">
              {(["user", "business"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setUserType(type)
                    setStep(1)
                  }}
                  className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                    userType === type
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type === "user" ? "User" : "Business"}
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              {step === 1 ? (
                <>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="you@example.com" 
                      className="mt-2" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      className="mt-2" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <Input 
                      id="confirm-password" 
                      name="confirm-password"
                      type="password" 
                      placeholder="••••••••" 
                      className="mt-2" 
                      required 
                    />
                  </div>
                  <Button 
                    type="button" 
                    className="w-full" 
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                  >
                    Continue
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="full_name" className="text-sm font-medium">
                      {userType === "user" ? "Full Name" : "Contact Person Name"}
                    </Label>
                    <Input 
                      id="full_name" 
                      name="full_name"
                      placeholder="John Doe" 
                      className="mt-2" 
                      required 
                    />
                  </div>
                  
                  {userType === "business" && (
                    <>
                      <div>
                        <Label htmlFor="company_name" className="text-sm font-medium">
                          Company Name
                        </Label>
                        <Input 
                          id="company_name" 
                          name="company_name"
                          placeholder="Company Inc." 
                          className="mt-2" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="business_address" className="text-sm font-medium">
                          Business Address
                        </Label>
                        <Input 
                          id="business_address" 
                          name="business_address"
                          placeholder="123 Main St, City, State" 
                          className="mt-2" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone_number" className="text-sm font-medium">
                          Phone Number
                        </Label>
                        <Input 
                          id="phone_number" 
                          name="phone_number"
                          type="tel" 
                          placeholder="+1 (555) 123-4567" 
                          className="mt-2" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="website" className="text-sm font-medium">
                          Website
                        </Label>
                        <Input 
                          id="website" 
                          name="website"
                          type="url" 
                          placeholder="https://example.com" 
                          className="mt-2" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-sm font-medium">
                          Description
                        </Label>
                        <textarea
                          id="description" 
                          name="description"
                          placeholder="Tell us about your business..."
                          className="w-full mt-2 p-2 border border-input rounded-md bg-background text-sm"
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" className="mt-1" required />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="news" className="mt-1" />
                    <Label htmlFor="news" className="text-sm cursor-pointer">
                      Send me updates and special offers
                    </Label>
                  </div>
                  
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-6 pt-4 border-t border-border">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-transparent" 
                      onClick={() => setStep(1)}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}