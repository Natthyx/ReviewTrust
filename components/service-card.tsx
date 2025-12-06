import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { RatingStars } from "./rating-stars"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface ServiceCardProps {
  id: string
  name: string
  image: string
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
  image,
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
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {badge && <Badge className="absolute top-3 right-3 bg-primary">{badge}</Badge>}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{category}</p>

          {location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{location}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
              <RatingStars rating={rating} size="sm" />
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
