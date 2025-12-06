"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Star } from "lucide-react"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const services = [
    {
      id: "1",
      name: "Excellence Healthcare Center",
      image: "/modern-hospital-exterior.png",
      category: "Healthcare",
      rating: 4.8,
      reviewCount: 1243,
      location: "New York, NY",
    },
    {
      id: "2",
      name: "Gourmet Kitchen Restaurant",
      image: "/cozy-italian-restaurant.png",
      category: "Restaurant",
      rating: 4.6,
      reviewCount: 892,
      location: "San Francisco, CA",
    },
    {
      id: "3",
      name: "Premium Tech Services",
      image: "/interconnected-tech.png",
      category: "Technology",
      rating: 4.7,
      reviewCount: 654,
      location: "Austin, TX",
    },
    {
      id: "4",
      name: "Urban Salon & Spa",
      image: "/hair-salon-interior.png",
      category: "Beauty",
      rating: 4.5,
      reviewCount: 1156,
      location: "Los Angeles, CA",
    },
    {
      id: "5",
      name: "Smart Electric Solutions",
      image: "/electrical-components.png",
      category: "Services",
      rating: 4.4,
      reviewCount: 523,
      location: "Chicago, IL",
    },
    {
      id: "6",
      name: "Fresh Market Grocery",
      image: "/busy-grocery-aisle.png",
      category: "Retail",
      rating: 4.3,
      reviewCount: 789,
      location: "Seattle, WA",
    },
  ]

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

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

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
