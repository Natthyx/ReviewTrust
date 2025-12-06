import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function ReviewCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex gap-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24 mt-2" />
          <Skeleton className="h-4 w-48 mt-4" />
          <Skeleton className="h-16 w-full mt-3" />
        </div>
      </div>
    </Card>
  )
}

export function ServiceCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  )
}

export function DashboardCardSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20 mt-4" />
    </Card>
  )
}
