import Link from "next/link"
import { Card } from "@/components/ui/card"
import { RatingStars } from "./rating-stars"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface ServiceCardProps {
  id: string
  name: string
  imageUrl: string
  category: string
  rating: number
  reviewCount: number
  location?: string
  badge?: string
  featured?: boolean
}

export function ServiceCard({
  id,
  name,
  imageUrl,
  category,
  rating,
  reviewCount,
  location,
  badge,
  featured = false,
}: ServiceCardProps) {
  return (
    <Link href={`/service/${id}`}>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${featured ? "ring-2 ring-primary" : ""}`}>
        <div className="relative h-40 bg-muted overflow-hidden">
          <img
            src={imageUrl || "/placeholder-service-image.svg"}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold line-clamp-1">{name}</h3>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </div>
          
          {location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{location}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
              {rating > 0 ? rating.toFixed(1) : "No ratings"}
            </span>
            <RatingStars rating={rating} />
            </div>
            <span className="text-sm text-muted-foreground">
              {reviewCount} {reviewCount === 1 || reviewCount === 0 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}