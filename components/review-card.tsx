"use client"

import { ThumbsUp, Reply } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RatingStars } from "./rating-stars"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReviewCardProps {
  author: string
  avatar?: string
  rating: number
  title: string
  content: string
  date: string
  verified?: boolean
  likes?: number
  replies?: Array<{ author: string; content: string; date: string }>
  showReplyButton?: boolean
  onReply?: () => void
}

export function ReviewCard({
  author,
  avatar,
  rating,
  title,
  content,
  date,
  verified = false,
  likes = 0,
  replies = [],
  showReplyButton = false,
  onReply,
}: ReviewCardProps) {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar || "/placeholder.svg"} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{author}</h3>
                  {verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Verified</span>}
                </div>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
              <RatingStars rating={rating} size="sm" />
            </div>

            <h4 className="font-medium mt-3 text-sm">{title}</h4>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{content}</p>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="gap-2 h-8">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className="text-xs">{likes}</span>
              </Button>
              {showReplyButton && (
                <Button variant="ghost" size="sm" onClick={onReply} className="gap-2 h-8">
                  <Reply className="w-3.5 h-3.5" />
                  <span className="text-xs">Reply</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="ml-12 space-y-3">
          {replies.map((reply, idx) => (
            <Card key={idx} className="p-4 bg-muted/30">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{reply.author}</h4>
                    <span className="text-xs text-muted-foreground">{reply.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{reply.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
