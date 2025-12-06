"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ReplyReviewModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  reviewAuthor?: string
  reviewContent?: string
}

export function ReplyReviewModal({
  open = false,
  onOpenChange,
  reviewAuthor = "Customer",
  reviewContent = "",
}: ReplyReviewModalProps) {
  const [reply, setReply] = useState("")

  const handleSubmit = () => {
    // Handle reply submission
    onOpenChange?.(false)
    setReply("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reply to Review</DialogTitle>
          <DialogDescription>Respond to {reviewAuthor}'s review</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Original Review */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground font-medium mb-2">Original Review</p>
            <p className="text-sm text-foreground">{reviewContent}</p>
          </div>

          {/* Reply Form */}
          <div>
            <Label htmlFor="reply" className="text-sm font-medium">
              Your Response
            </Label>
            <Textarea
              id="reply"
              placeholder="Thank you for your feedback! We appreciate your business..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="mt-2 h-32"
            />
            <p className="text-xs text-muted-foreground mt-2">{reply.length}/500 characters</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange?.(false)}>
              Cancel
            </Button>
            <Button className="flex-1" disabled={!reply.trim()} onClick={handleSubmit}>
              Send Reply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
