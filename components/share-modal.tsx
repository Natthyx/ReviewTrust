"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Mail, MessageCircle, Facebook, Twitter } from "lucide-react"
import { useState } from "react"

interface ShareModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  url?: string
}

export function ShareModal({
  open = false,
  onOpenChange,
  title = "Check this out",
  url = "https://reviewtrust.com/service/1",
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    { icon: Mail, label: "Email", action: () => {} },
    { icon: MessageCircle, label: "Message", action: () => {} },
    { icon: Facebook, label: "Facebook", action: () => {} },
    { icon: Twitter, label: "Twitter", action: () => {} },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Link */}
          <div>
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2 mt-2">
              <Input value={url} readOnly className="text-sm" />
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                <Copy className="w-4 h-4" />
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div>
            <label className="text-sm font-medium block mb-3">Share Via</label>
            <div className="grid grid-cols-4 gap-2">
              {shareOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.label}
                    variant="outline"
                    className="flex flex-col gap-2 h-20 bg-transparent"
                    onClick={option.action}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{option.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
