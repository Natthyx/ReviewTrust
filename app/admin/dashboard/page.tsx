"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, Building2, Star, MessageSquare, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const chartData = [
    { day: "Mon", reviews: 120, businesses: 24 },
    { day: "Tue", reviews: 200, businesses: 32 },
    { day: "Wed", reviews: 150, businesses: 20 },
    { day: "Thu", reviews: 220, businesses: 35 },
    { day: "Fri", reviews: 280, businesses: 45 },
    { day: "Sat", reviews: 190, businesses: 28 },
    { day: "Sun", reviews: 140, businesses: 18 },
  ]

  const recentReviews = [
    { id: "1", business: "Excellence Healthcare", author: "Sarah M.", rating: 5, status: "Published" },
    { id: "2", business: "Gourmet Kitchen", author: "John D.", rating: 4, status: "Pending" },
    { id: "3", business: "Tech Services", author: "Mike L.", rating: 3, status: "Flagged" },
  ]

  const pendingBusinesses = [
    { id: "1", name: "New Medical Clinic", category: "Healthcare", applicant: "Dr. Smith" },
    { id: "2", name: "Urban Boutique", category: "Retail", applicant: "Jane Brown" },
  ]

  return (
    <>
      <Navbar role="admin" />
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar role="admin" />
        <div className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Platform overview and management</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: "Total Users", value: "1.2M", trend: "+12%" },
              { icon: Building2, label: "Verified Businesses", value: "50K", trend: "+8%" },
              { icon: MessageSquare, label: "Reviews This Week", value: "1.5K", trend: "+24%" },
              { icon: TrendingUp, label: "Platform Growth", value: "23%", trend: "+5%" },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-2">{stat.trend}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Activity Chart */}
          <Card className="p-6 mb-8">
            <h3 className="font-semibold mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                />
                <Bar dataKey="reviews" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Reviews */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Reviews</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="text-sm">{review.business}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {review.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            review.status === "Published"
                              ? "default"
                              : review.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {review.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Pending Businesses */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Pending Approvals</h3>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingBusinesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="text-sm">{business.name}</TableCell>
                      <TableCell className="text-sm">{business.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
