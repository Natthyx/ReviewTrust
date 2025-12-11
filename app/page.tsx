"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CategoryCard } from "@/components/category-card"
import { ServiceCard } from "@/components/service-card"
import { Star, TrendingUp, Award, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const categories = [
    { id: "1", name: "Healthcare", count: 128, icon: "🏥", description: "Medical and health services" },
    { id: "2", name: "Restaurants", count: 256, icon: "🍽️", description: "Dining and culinary experiences" },
    { id: "3", name: "Automotive", count: 89, icon: "🚗", description: "Car services and repairs" },
    { id: "4", name: "Home Services", count: 142, icon: "🏠", description: "Home improvement and maintenance" },
    { id: "5", name: "Technology", count: 76, icon: "💻", description: "Tech services and support" },
    { id: "6", name: "Beauty", count: 95, icon: "💄", description: "Beauty and personal care" },
  ]

  const featuredServices = [
    {
      id: "1",
      name: "Excellence Dental Care",
      category: "Healthcare",
      rating: 4.9,
      reviewCount: 124,
      imageUrl: "/service-images/dental.jpg",
    },
    {
      id: "2",
      name: "Gourmet Bistro",
      category: "Restaurants",
      rating: 4.7,
      reviewCount: 89,
      imageUrl: "/service-images/restaurant.jpg",
    },
    {
      id: "3",
      name: "Tech Solutions Pro",
      category: "Technology",
      rating: 4.8,
      reviewCount: 67,
      imageUrl: "/service-images/technology.jpg",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="container-app">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Trusted by millions of users</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-pretty leading-tight">
                Discover Trusted <span className="gradient-text">Reviews</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
                Make informed decisions with authentic reviews from real users. Find the best services in your area.
              </p>
              <div className="flex items-center gap-3 mt-8 justify-center">
                <Button size="lg" asChild>
                  <Link href="/categories">Browse Categories</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/auth/register">Write a Review</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container-app">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, label: "Happy Users", value: "1.2M+" },
                { icon: Star, label: "Verified Reviews", value: "5.8M+" },
                { icon: Award, label: "Trusted Businesses", value: "50K+" },
                { icon: TrendingUp, label: "Monthly Growth", value: "15%" },
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <Card key={idx} className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Browse by Category</h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Explore services across various industries and find exactly what you need.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/categories">View All Categories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-16 px-4 bg-background">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Featured Services</h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Discover top-rated services based on authentic user reviews.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/explore">Explore More Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent">
          <div className="container-app">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Share Your Experience
              </h2>
              <p className="text-primary-foreground/90 mb-8">
                Help others make better decisions by sharing your honest reviews of services you've experienced.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/register">Write a Review</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}