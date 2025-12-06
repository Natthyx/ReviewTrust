import type React from "react"
import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon = <Inbox className="w-12 h-12" />, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-muted-foreground mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <p className="text-sm text-muted-foreground text-center mt-2 max-w-sm">{description}</p>
      {action && (
        <Button asChild className="mt-6">
          <a href={action.href}>{action.label}</a>
        </Button>
      )}
    </div>
  )
}
