"use client"

import { useState } from "react"
import { WriteReviewModal } from "@/components/write-review-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ReviewCard } from "@/components/review-card"
import { RatingStars } from "@/components/rating-stars"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Globe, Clock, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"

interface Business {
  id: string
  name: string
  location: string | null
  address: string | null
  phone: string | null
  website: string | null
  latitude: number | null
  longitude: number | null
  businessHours: any | null
  description: string | null
  rating: number
  reviewCount: number
  createdAt: string | null
  updatedAt: string | null
  categories: { id: string; name: string; icon: string | null; bg_color: string | null }[]
  subcategories: { id: string; name: string }[]
}

interface Review {
  id: string
  rating: number
  comment: string | null
  reviewer_name: string | null
  created_at: string | null
  is_verified: boolean | null
}

interface ServiceClientWrapperProps {
  business: Business
  reviews: Review[]
  businessHours: { day: string; hours: string }[]
}

export function ServiceClientWrapper({ business, reviews, businessHours }: ServiceClientWrapperProps) {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [localReviews, setLocalReviews] = useState(reviews)

  // Format review date
  const formatReviewDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date'
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  const handleReviewSubmitted = () => {
    // In a real implementation, you would refetch the reviews
    // For now, we'll just show a toast
    console.log("Review submitted")
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero & Images */}
        <section className="bg-muted">
          <div className="container-app py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 relative h-96 rounded-lg overflow-hidden">
                <Image src="/placeholder-service-image.svg" alt={business.name} fill className="object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-[180px] rounded-lg overflow-hidden">
                    <Image
                      src={`/placeholder-service-image.svg?height=180&width=180&query=service-${i}`}
                      alt={`${business.name} Gallery ${i}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Details & Reviews */}
        <section className="py-12">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-bold">{business.name}</h1>
                      <div className="flex items-center gap-4 mt-3">
                        <RatingStars rating={business.rating} totalReviews={business.reviewCount} />
                        {business.categories.map((category) => (
                          <Badge key={category.id} variant="secondary">{category.name}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="lg" onClick={() => setShowReviewModal(true)}>Write a Review</Button>
                  </div>
                  
                  <p className="text-muted-foreground mt-4">
                    {business.description || `${business.name} is dedicated to providing quality service to our customers.`}
                  </p>
                </div>

                {/* Contact Info */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {business.address && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">{business.address}</p>
                        </div>
                      </div>
                    )}
                    
                    {business.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{business.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {business.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Website</p>
                          <p className="text-sm text-muted-foreground">{business.website}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Hours</p>
                        <p className="text-sm text-muted-foreground">
                          {businessHours.find(h => h.day === 'Monday')?.hours || 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Reviews Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <Button variant="outline" className="gap-2">
                      Sort by <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {localReviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        author={review.reviewer_name || 'Anonymous User'}
                        rating={review.rating}
                        title="" // Reviews don't have titles in our schema
                        content={review.comment || ''}
                        date={formatReviewDate(review.created_at)}
                        verified={!!review.is_verified}
                        likes={0} // We don't have likes in our schema
                      />
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Business Hours</h3>
                  <ul className="space-y-2 text-sm">
                    {businessHours.map((hour, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{hour.day}</span>
                        <span>{hour.hours}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Location</h3>
                  <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                    <Image 
                      src="/map-placeholder.png" 
                      alt="Location map" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <WriteReviewModal 
        open={showReviewModal} 
        onOpenChange={setShowReviewModal}
        businessName={business.name}
        businessId={business.id}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  )
}