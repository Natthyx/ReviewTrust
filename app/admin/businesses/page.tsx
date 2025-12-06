"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

export default function AdminBusinessesPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)

  const businesses = [
    {
      id: "1",
      name: "Excellence Healthcare",
      category: "Healthcare",
      applicant: "Dr. Smith",
      status: "Pending",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Gourmet Kitchen",
      category: "Restaurant",
      applicant: "Jane Brown",
      status: "Verified",
      date: "2024-01-10",
    },
    {
      id: "3",
      name: "Tech Services",
      category: "Technology",
      applicant: "Mike Johnson",
      status: "Pending",
      date: "2024-01-18",
    },
    {
      id: "4",
      name: "Urban Salon",
      category: "Beauty",
      applicant: "Lisa Anderson",
      status: "Rejected",
      date: "2024-01-12",
    },
  ]

  const handleApprove = () => {
    setOpenDialog(false)
    setSelectedBusiness(null)
  }

  const handleReject = () => {
    setOpenDialog(false)
    setSelectedBusiness(null)
  }

  return (
    <>
      <Navbar role="admin" />
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar role="admin" />
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Businesses</h1>
            <p className="text-muted-foreground mt-2">Manage and verify business listings</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search businesses..." className="pl-10" />
            </div>
          </div>

          {/* Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell className="font-medium">{business.name}</TableCell>
                    <TableCell>{business.category}</TableCell>
                    <TableCell className="text-sm">{business.applicant}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          business.status === "Verified"
                            ? "default"
                            : business.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {business.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{business.date}</TableCell>
                    <TableCell className="text-right">
                      {business.status === "Pending" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedBusiness(business)
                            setOpenDialog(true)
                          }}
                        >
                          Review
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Approval Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Review Business Application</DialogTitle>
                <DialogDescription>
                  {selectedBusiness?.name} - {selectedBusiness?.category}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="font-semibold mb-2">Application Details</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Business:</span> {selectedBusiness?.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Category:</span> {selectedBusiness?.category}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Applicant:</span> {selectedBusiness?.applicant}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleReject} className="gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                  <Button className="flex-1" onClick={handleApprove} className="gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </>
  )
}
