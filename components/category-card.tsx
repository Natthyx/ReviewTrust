import type React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  count: number
}

export function CategoryCard({ id, name, icon, description, count }: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`}>
      <Card className="p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
        <div className="flex items-start justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3">
              <div className="text-primary">{icon}</div>
            </div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <p className="text-xs text-muted-foreground mt-2">{count.toLocaleString()} services</p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </Card>
    </Link>
  )
}
