"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Star } from "lucide-react"
import { useSearchParams } from 'next/navigation'

interface Service {
  id: string
  name: string
  imageUrl: string
  category: string
  rating: number
  reviewCount: number
  location?: string
  description?: string
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  
  // Get subcategory from URL params
  const subcategoryParam = searchParams.get('subcategory')

  useEffect(() => {
    fetchBusinesses()
  }, [searchQuery, sortBy, subcategoryParam])

  const fetchBusinesses = async () => {
    try {
      setLoading(true)
      
      // Build query parameters
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (subcategoryParam) params.append('subcategory', subcategoryParam)
      if (sortBy) params.append('sort', sortBy)
      
      const response = await fetch(`/api/explore?${params.toString()}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch businesses')
      }
      
      // Transform data to match ServiceCard expectations
      const transformedServices = data.map((business: any) => ({
        id: business.id,
        name: business.name,
        imageUrl: business.imageUrl || "/placeholder-service-image.svg", // Use real image URL
        category: "Service", // Default category
        rating: business.rating || 0,
        reviewCount: business.reviewCount || 0,
        location: business.location || "",
        description: business.description || ""
      }))
      
      setServices(transformedServices)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching businesses:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar/>
      <main className="min-h-screen">
        <div className="container-app py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Explore Services</h1>
            <p className="text-muted-foreground">Discover and review thousands of businesses</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <label key={r} className="flex items-center gap-3 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span className="flex items-center gap-2">
                            {r} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Results Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button variant="outline" disabled>
              Previous
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button key={page} variant={page === 1 ? "default" : "outline"}>
                {page}
              </Button>
            ))}
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </main>
    </>
  )
}