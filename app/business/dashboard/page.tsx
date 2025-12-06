"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Star, Users, MessageSquare, TrendingUp } from "lucide-react"

export default function BusinessDashboard() {
  const ratingData = [
    { stars: 5, count: 450 },
    { stars: 4, count: 280 },
    { stars: 3, count: 120 },
    { stars: 2, count: 45 },
    { stars: 1, count: 20 },
  ]

  const viewsData = [
    { month: "Jan", views: 2400, clicks: 1240 },
    { month: "Feb", views: 2210, clicks: 1221 },
    { month: "Mar", views: 2290, clicks: 1229 },
    { month: "Apr", views: 2000, clicks: 2200 },
    { month: "May", views: 2181, clicks: 2500 },
    { month: "Jun", views: 2500, clicks: 2100 },
  ]

  const COLORS = ["#FCD34D", "#DBEAFE", "#FCA5A5", "#D1D5DB", "#9CA3AF"]

  return (
    <>
      <Navbar role="business" />
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar role="business" />
        <div className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Business Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, Excellence Healthcare</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Star, label: "Average Rating", value: "4.8", color: "text-yellow-500" },
              { icon: MessageSquare, label: "Total Reviews", value: "1.2K", color: "text-blue-500" },
              { icon: Users, label: "Profile Views", value: "4.5K", color: "text-purple-500" },
              { icon: TrendingUp, label: "Avg Response Time", value: "2h 30m", color: "text-green-500" },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Rating Distribution */}
            <Card className="p-6 lg:col-span-1">
              <h3 className="font-semibold mb-4">Rating Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Views & Clicks */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="font-semibold mb-4">Profile Views & Clicks</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                    }}
                  />
                  <Line type="monotone" dataKey="views" stroke="var(--color-primary)" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicks" stroke="var(--color-accent)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Pending Reviews", count: "3", action: "Review Now" },
              { title: "Unanswered Questions", count: "5", action: "Respond" },
              { title: "Documents to Upload", count: "1", action: "Upload" },
            ].map((item, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="font-semibold text-sm text-muted-foreground">{item.title}</h3>
                <p className="text-2xl font-bold mt-2">{item.count}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                  {item.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
