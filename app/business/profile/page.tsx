"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RatingStars } from "@/components/rating-stars"

export default function BusinessProfile() {
  return (
    <>
      <Navbar role="business" />
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar role="business" />
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Business Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your business information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Summary */}
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Profile Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <RatingStars rating={4.8} totalReviews={1243} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge className="mt-1">Verified</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium mt-1">January 2023</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Edit Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="font-semibold mb-6">Edit Business Details</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Business Name
                    </Label>
                    <Input id="name" defaultValue="Excellence Healthcare Center" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category
                    </Label>
                    <Input id="category" defaultValue="Healthcare" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tell customers about your business..."
                      className="mt-2 h-24"
                      defaultValue="A leading healthcare provider with state-of-the-art facilities and compassionate medical professionals."
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-sm font-medium">
                      Website
                    </Label>
                    <Input id="website" defaultValue="excellencehc.com" className="mt-2" />
                  </div>
                  <div className="pt-4 border-t border-border flex gap-3">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
