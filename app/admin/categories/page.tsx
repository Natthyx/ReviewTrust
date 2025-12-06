"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit2, Plus } from "lucide-react"
import { useState } from "react"

export default function AdminCategoriesPage() {
  const [showForm, setShowForm] = useState(false)

  const categories = [
    { id: "1", name: "Healthcare", description: "Medical services and providers", services: 2854, status: "Active" },
    { id: "2", name: "Restaurants", description: "Dining and food services", services: 5421, status: "Active" },
    { id: "3", name: "Retail", description: "Shopping and retail stores", services: 3214, status: "Active" },
    { id: "4", name: "Services", description: "Professional services", services: 4156, status: "Active" },
  ]

  return (
    <>
      <Navbar role="admin" />
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar role="admin" />
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Categories</h1>
              <p className="text-muted-foreground mt-2">Manage service categories</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Category
            </Button>
          </div>

          {/* Add Category Form */}
          {showForm && (
            <Card className="p-6 mb-8">
              <h3 className="font-semibold mb-4">Add New Category</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="catname" className="text-sm font-medium">
                    Category Name
                  </Label>
                  <Input id="catname" placeholder="e.g., Healthcare" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="catdesc" className="text-sm font-medium">
                    Description
                  </Label>
                  <Input id="catdesc" placeholder="e.g., Medical services..." className="mt-2" />
                </div>
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button size="sm">Add Category</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Categories Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{cat.description}</TableCell>
                    <TableCell>{cat.services.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge>{cat.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </>
  )
}
