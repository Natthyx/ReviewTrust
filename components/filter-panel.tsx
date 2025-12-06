"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useState } from "react"

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void
}

interface FilterState {
  ratings: number[]
  verified: boolean
  priceRange: [number, number]
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    ratings: [],
    verified: false,
    priceRange: [0, 500],
  })

  const handleRatingChange = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating]
    const newFilters = { ...filters, ratings: newRatings }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleVerifiedChange = (checked: boolean) => {
    const newFilters = { ...filters, verified: checked }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handlePriceChange = (value: [number, number]) => {
    const newFilters = { ...filters, priceRange: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      ratings: [],
      verified: false,
      priceRange: [0, 500],
    }
    setFilters(resetFilters)
    onFilterChange?.(resetFilters)
  }

  return (
    <Card className="p-6 space-y-6 h-fit sticky top-20">
      <div>
        <h3 className="font-semibold mb-4">Filters</h3>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium mb-3">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={filters.ratings.includes(rating)} onCheckedChange={() => handleRatingChange(rating)} />
              <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({rating})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Verified */}
      <div className="pt-4 border-t border-border">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox checked={filters.verified} onCheckedChange={handleVerifiedChange} />
          <span className="text-sm">Verified Only</span>
        </label>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium mb-4">Price Range</h4>
        <Slider
          min={0}
          max={500}
          step={10}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between mt-3 text-xs text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Reset */}
      <Button variant="outline" className="w-full bg-transparent" onClick={handleReset}>
        Reset Filters
      </Button>
    </Card>
  )
}
