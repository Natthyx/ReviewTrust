"use client"

import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

interface Subcategory {
  id: string
  name: string
  parentCategory: string
}

interface Category {
  id: string
  name: string
  icon: string
  bgColor: string
  subcategories: Subcategory[]
}

const CATEGORIES: Category[] = [
  {
    id: "animals-pets",
    name: "Animals & Pets",
    icon: "🐾",
    bgColor: "bg-yellow-100",
    subcategories: [
      { id: "animal-health", name: "Animal Health", parentCategory: "Animals & Pets" },
      { id: "animal-parks", name: "Animal Parks & Zoo", parentCategory: "Animals & Pets" },
      { id: "cats-dogs", name: "Cats & Dogs", parentCategory: "Animals & Pets" },
      { id: "horses-riding", name: "Horses & Riding", parentCategory: "Animals & Pets" },
      { id: "pet-services", name: "Pet Services", parentCategory: "Animals & Pets" },
      { id: "pet-stores", name: "Pet Stores", parentCategory: "Animals & Pets" },
    ],
  },
  {
    id: "events-entertainment",
    name: "Events & Entertainment",
    icon: "🎤",
    bgColor: "bg-pink-100",
    subcategories: [
      { id: "adult-entertainment", name: "Adult Entertainment", parentCategory: "Events & Entertainment" },
      { id: "children-entertainment", name: "Children's Entertainment", parentCategory: "Events & Entertainment" },
      { id: "clubbing-nightlife", name: "Clubbing & Nightlife", parentCategory: "Events & Entertainment" },
      { id: "events-venues", name: "Events & Venues", parentCategory: "Events & Entertainment" },
      { id: "gambling", name: "Gambling", parentCategory: "Events & Entertainment" },
      { id: "gaming", name: "Gaming", parentCategory: "Events & Entertainment" },
    ],
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    icon: "🏠",
    bgColor: "bg-green-100",
    subcategories: [
      { id: "bathroom-kitchen", name: "Bathroom & Kitchen", parentCategory: "Home & Garden" },
      { id: "cultural-goods", name: "Cultural Goods", parentCategory: "Home & Garden" },
      { id: "decoration-interior", name: "Decoration & Interior", parentCategory: "Home & Garden" },
      { id: "energy-heating", name: "Energy & Heating", parentCategory: "Home & Garden" },
      { id: "fabric-stationery", name: "Fabric & Stationery", parentCategory: "Home & Garden" },
      { id: "furniture-stores", name: "Furniture Stores", parentCategory: "Home & Garden" },
    ],
  },
  {
    id: "restaurants-bars",
    name: "Restaurants & Bars",
    icon: "🍴",
    bgColor: "bg-red-100",
    subcategories: [
      { id: "african-pacific", name: "African & Pacific Cuisine", parentCategory: "Restaurants & Bars" },
      { id: "bars-cafes", name: "Bars & Cafes", parentCategory: "Restaurants & Bars" },
      { id: "chinese-korean", name: "Chinese & Korean Cuisine", parentCategory: "Restaurants & Bars" },
      { id: "european-cuisine", name: "European Cuisine", parentCategory: "Restaurants & Bars" },
      { id: "general-restaurants", name: "General Restaurants", parentCategory: "Restaurants & Bars" },
      { id: "japanese-cuisine", name: "Japanese Cuisine", parentCategory: "Restaurants & Bars" },
    ],
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = CATEGORIES.map((category) => ({
    ...category,
    subcategories: category.subcategories.filter(
      (sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((cat) => cat.subcategories.length > 0 || cat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <Navbar role="guest" />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-slate-50 dark:bg-slate-900/50 py-12">
          <div className="container-app">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">What are you looking for?</h1>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="container-app py-16">
          <h2 className="text-2xl font-bold mb-8">Explore companies by category</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Category Header */}
                <div className={`${category.bgColor} dark:bg-slate-800 px-6 py-8 text-center`}>
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{category.name}</h3>
                </div>

                {/* Subcategories List */}
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/categories/${subcategory.id}`}
                      className="block px-6 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
