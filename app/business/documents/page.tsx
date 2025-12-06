"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileUploader } from "@/components/file-uploader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Trash2, CheckCircle, Clock } from "lucide-react"

export default function BusinessDocuments() {
  const documents = [
    {
      id: "1",
      name: "Business License.pdf",
      uploadedAt: "1 week ago",
      status: "Verified",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Insurance Certificate.pdf",
      uploadedAt: "2 days ago",
      status: "Pending",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Tax ID Verification.pdf",
      uploadedAt: "3 days ago",
      status: "Verified",
      size: "1.2 MB",
    },
  ]

  return (
    <>
      <Navbar role="business" />
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar role="business" />
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground mt-2">Upload and manage business documents</p>
          </div>

          {/* Upload Section */}
          <Card className="p-6 mb-8">
            <h3 className="font-semibold mb-4">Upload Document</h3>
            <FileUploader acceptedFormats={["pdf", "jpg", "png", "doc", "docx"]} multiple={true} />
          </Card>

          {/* Documents List */}
          <Card>
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold">Your Documents</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{doc.size}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{doc.uploadedAt}</TableCell>
                    <TableCell>
                      <Badge variant={doc.status === "Verified" ? "default" : "secondary"} className="gap-1">
                        {doc.status === "Verified" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 text-destructive">
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
