"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RatingStars } from "./rating-stars"
import { createClient } from '@/lib/supabase/client'
import { toast } from "sonner"

interface WriteReviewModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  businessName?: string
  businessId?: string
  onReviewSubmitted?: () => void
}

export function WriteReviewModal({ 
  open = false, 
  onOpenChange, 
  businessName = "Service",
  businessId,
  onReviewSubmitted
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!businessId) {
      toast.error("Business information is missing")
      return
    }

    setSubmitting(true)
    
    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        toast.error("You must be logged in to submit a review")
        setSubmitting(false)
        return
      }
      
      // Submit review
      const { error } = await supabase
        .from('reviews')
        .insert({
          rating,
          comment: content,
          reviewee_id: businessId,
          reviewer_id: user.id,
          is_verified: false // Could be set to true for verified users
        })
      
      if (error) {
        console.error('Error submitting review:', error)
        // Check if it's a duplicate review error
        if (error.code === '23505' || 
            (error.message && error.message.includes('duplicate key value')) ||
            (error.message && error.message.includes('reviews_reviewer_id_reviewee_id_key'))) {
          toast.error("You have already submitted a review for this business. Only one review per business is allowed.")
        } else {
          toast.error("Failed to submit review. Please try again.")
        }
      } else {
        toast.success("Review submitted successfully!")
        onReviewSubmitted?.()
        onOpenChange?.(false)
        
        // Reset form
        setRating(0)
        setContent("")
        setStep(1)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Share your experience with {businessName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 1 && (
            <>
              <div>
                <Label className="text-base font-medium mb-3 block">How would you rate your experience?</Label>
                <div className="flex justify-center py-4">
                  <RatingStars rating={rating} interactive onChange={setRating} size="lg" />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange?.(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" disabled={rating === 0} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label htmlFor="content" className="text-sm font-medium">
                  Your Review
                </Label>
                <Textarea
                  id="content"
                  placeholder="Share details about your experience..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-2 h-32"
                />
                <p className="text-xs text-muted-foreground mt-2">{content.length}/500 characters</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  className="flex-1" 
                  disabled={!content || submitting} 
                  onClick={handleSubmit}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}