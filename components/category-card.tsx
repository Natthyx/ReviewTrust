import type React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  id: string
  name: string
  icon: string
  description: string
  count: number
  bg_color?: string
}

export function CategoryCard({ id, name, icon, description, count, bg_color }: CategoryCardProps) {
  return (
    <Link href={`/explore?category=${id}`}>
      <Card className="p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
        <div className="flex items-start justify-between">
          <div>
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3"
              style={{ backgroundColor: bg_color || 'var(--primary-bg)' }}
            >
              <span className="text-lg">{icon}</span>
            </div>
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="text-sm text-muted-foreground">
          {count} {count === 1 ? 'business' : 'businesses'}
        </div>
      </Card>
    </Link>
  )
}