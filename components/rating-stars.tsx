"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  totalReviews?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
}

export function RatingStars({ rating, totalReviews, interactive = false, onChange, size = "md" }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onChange?.(star)}
            disabled={!interactive}
            className={cn(
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
              "transition-transform",
            )}
          >
            <Star
              className={cn(
                sizeMap[size],
                star <= Math.round(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : star - rating < 1 && star - rating > 0
                    ? "fill-yellow-200 text-yellow-400"
                    : "text-muted",
              )}
            />
          </button>
        ))}
      </div>
      {totalReviews !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">({totalReviews.toLocaleString()})</span>
      )}
    </div>
  )
}
