"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { ReviewCard } from "@/components/review-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BusinessReviews() {
  return (
    <>
      <Navbar role="business" />
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar role="business" />
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Customer Reviews</h1>
            <p className="text-muted-foreground mt-2">Respond to reviews and manage feedback</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
                <SelectItem value="negative">Negative (1-3 stars)</SelectItem>
                <SelectItem value="positive">Positive (4-5 stars)</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            <ReviewCard
              author="Sarah Mitchell"
              rating={5}
              title="Exceptional Care and Professional Staff"
              content="I had an excellent experience at Excellence Healthcare. The staff was incredibly professional and caring. The facility is clean and modern."
              date="2 weeks ago"
              verified
              likes={124}
              showReplyButton
              replies={[]}
            />
            <ReviewCard
              author="John Davis"
              rating={4}
              title="Great Service, Reasonable Wait Time"
              content="Good experience overall. The doctors were knowledgeable and took time to explain everything."
              date="1 month ago"
              verified
              likes={45}
              showReplyButton
              replies={[
                {
                  author: "Excellence Healthcare",
                  content: "Thank you for your kind words! We appreciate your feedback.",
                  date: "3 weeks ago",
                },
              ]}
            />
          </div>
        </div>
      </main>
    </>
  )
}
