import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Clock, Share2, Heart } from "lucide-react"
import Image from "next/image"

export default function BlogPostPage() {
  return (
    <>
      <Navbar role="guest" />
      <main className="min-h-screen py-12">
        <article className="container-app max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">Guide</Badge>
            <h1 className="text-4xl font-bold mb-4">How to Choose the Right Service Provider</h1>
            <p className="text-lg text-muted-foreground">
              Learn what factors to consider when selecting a service for your needs.
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              By Sarah Chen
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />2 days ago
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />5 min read
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-12">
            <Image src="/placeholder.svg?key=blog_featured" alt="Article" fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <p>
              Choosing the right service provider is one of the most important decisions you can make. Whether you're
              looking for healthcare, dining, technology support, or any other service, the process can feel
              overwhelming. In this comprehensive guide, we'll walk you through the key factors to consider.
            </p>

            <h2>1. Check Reviews and Ratings</h2>
            <p>
              Start by researching what others have said about the service. Look for patterns in reviews rather than
              focusing on individual opinions. Multiple 4-5 star reviews indicate consistency, while varied ratings
              suggest potential inconsistency.
            </p>

            <h2>2. Verify Credentials and Certifications</h2>
            <p>
              Ensure the provider has all necessary licenses, certifications, and credentials relevant to their field.
              Don't hesitate to ask for proof of qualification. Many providers display this information on their
              verified profiles.
            </p>

            <h2>3. Compare Pricing</h2>
            <p>
              While price shouldn't be your only factor, it's important to understand the market rate. Compare multiple
              providers to ensure you're getting fair value for the service. Remember that the cheapest option isn't
              always the best.
            </p>

            <h2>4. Assess Communication</h2>
            <p>
              Notice how quickly the provider responds to inquiries and how clearly they communicate. Good service
              providers are typically responsive and transparent about their processes and pricing.
            </p>
          </div>

          {/* Author Card */}
          <Card className="p-6 mb-12 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg?key=author" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground">
                  Content writer at ReviewTrust. Passionate about helping users make informed decisions.
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-border">
            <Button variant="outline" gap-2 className="gap-2 bg-transparent">
              <Heart className="w-4 h-4" />
              Save Article
            </Button>
            <Button variant="outline" gap-2 className="gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Related Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Tips for Writing Helpful Reviews",
                  category: "Tutorial",
                  author: "Mike Johnson",
                },
                {
                  title: "The Importance of Customer Reviews",
                  category: "Insights",
                  author: "John Smith",
                },
              ].map((article, idx) => (
                <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                  <Badge variant="outline" className="mb-2">
                    {article.category}
                  </Badge>
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-xs text-muted-foreground">By {article.author}</p>
                </Card>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
