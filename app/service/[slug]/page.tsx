import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ReviewCard } from "@/components/review-card"
import { RatingStars } from "@/components/rating-stars"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Globe, Clock, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function ServiceDetailPage() {
  return (
    <>
      <Navbar role="guest" />
      <main className="min-h-screen">
        {/* Hero & Images */}
        <section className="bg-muted">
          <div className="container-app py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 relative h-96 rounded-lg overflow-hidden">
                <Image src="/hospital-professional.jpg" alt="Service" fill className="object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-[180px] rounded-lg overflow-hidden">
                    <Image
                      src={`/helpful-service.png?height=180&width=180&query=service ${i}`}
                      alt={`Gallery ${i}`}
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
                      <h1 className="text-3xl font-bold">Excellence Healthcare Center</h1>
                      <div className="flex items-center gap-4 mt-3">
                        <RatingStars rating={4.8} totalReviews={1243} />
                        <Badge variant="outline">Verified Business</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    A leading healthcare provider with state-of-the-art facilities and compassionate medical
                    professionals dedicated to your wellness.
                  </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: MapPin, label: "Address", value: "123 Medical Blvd, NY 10001" },
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: Globe, label: "Website", value: "excellencehc.com" },
                    { icon: Clock, label: "Hours", value: "8:00 AM - 8:00 PM" },
                  ].map((info, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <info.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{info.label}</p>
                          <p className="text-sm font-medium">{info.value}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Reviews */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Reviews</h2>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      Sort <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-6">
                    <ReviewCard
                      author="Sarah Mitchell"
                      avatar="/diverse-group.png"
                      rating={5}
                      title="Exceptional Care and Professional Staff"
                      content="I had an excellent experience at Excellence Healthcare. The staff was incredibly professional and caring. The facility is clean and modern. Highly recommended!"
                      date="2 weeks ago"
                      verified
                      likes={124}
                      replies={[
                        {
                          author: "Excellence Healthcare",
                          content: "Thank you for your kind words! We are committed to providing the best care.",
                          date: "1 week ago",
                        },
                      ]}
                    />
                    <ReviewCard
                      author="John Davis"
                      avatar="/person-male.png"
                      rating={4}
                      title="Great Service, Reasonable Wait Time"
                      content="Good experience overall. The doctors were knowledgeable and took time to explain everything. Could improve the check-in process."
                      date="1 month ago"
                      verified
                      likes={45}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Rating Summary</h3>
                  <div className="space-y-3">
                    {[
                      { stars: 5, count: 980, percentage: 79 },
                      { stars: 4, count: 186, percentage: 15 },
                      { stars: 3, count: 52, percentage: 4 },
                      { stars: 2, count: 20, percentage: 2 },
                      { stars: 1, count: 5, percentage: 0 },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-3">{row.stars}</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all"
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-12 text-right">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Button className="w-full" size="lg">
                  Write a Review
                </Button>

                <Card className="p-6">
                  <h3 className="font-semibold mb-3">Business Highlights</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "24/7 Emergency Service",
                      "Board Certified Doctors",
                      "Modern Equipment",
                      "Insurance Accepted",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
