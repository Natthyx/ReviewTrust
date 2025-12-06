"use client"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const blogPosts = [
    {
      id: "1",
      title: "How to Choose the Right Service Provider",
      excerpt: "Learn what factors to consider when selecting a service for your needs.",
      category: "Guide",
      author: "Sarah Chen",
      date: "2 days ago",
      image: "/placeholder.svg?key=blog1",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "The Importance of Customer Reviews",
      excerpt: "Discover why honest reviews matter and how they help businesses improve.",
      category: "Insights",
      author: "John Smith",
      date: "5 days ago",
      image: "/placeholder.svg?key=blog2",
      readTime: "4 min read",
    },
    {
      id: "3",
      title: "Tips for Writing Helpful Reviews",
      excerpt: "Master the art of writing reviews that truly help other users.",
      category: "Tutorial",
      author: "Mike Johnson",
      date: "1 week ago",
      image: "/placeholder.svg?key=blog3",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "Verifying Your Business: A Complete Guide",
      excerpt: "Step-by-step instructions to verify and claim your business profile.",
      category: "Guide",
      author: "Emma Williams",
      date: "1 week ago",
      image: "/placeholder.svg?key=blog4",
      readTime: "8 min read",
    },
  ]

  return (
    <>
      <Navbar role="guest" />
      <main className="min-h-screen">
        {/* Header */}
        <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="container-app">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Insights, tips, and guides to help you make the most of ReviewTrust
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 px-4 border-b border-border">
          <div className="container-app">
            <div className="max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 px-4">
          <div className="container-app">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg?key=featured_blog" alt="Featured" fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <Badge className="mb-4">Featured</Badge>
                    <h2 className="text-2xl font-bold mb-3">How to Choose the Right Service Provider</h2>
                    <p className="text-muted-foreground mb-4">
                      Learn what factors to consider when selecting a service for your needs. From price to quality, we
                      break down everything you need to know.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      Sarah Chen
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />2 days ago
                    </div>
                    <Button asChild className="ml-auto gap-2">
                      <Link href="/blog/1">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 px-4">
          <div className="container-app">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative h-40 bg-muted overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <Badge variant="outline" className="w-fit mb-2">
                        {post.category}
                      </Badge>
                      <h3 className="font-semibold line-clamp-2 mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
