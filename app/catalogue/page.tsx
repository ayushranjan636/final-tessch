"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from "@/components/product-card"
import { useState, useEffect } from "react"
import { useProductStore } from "@/lib/product-store"
import { Footer } from "@/components/footer"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "latest" | "best-sellers" | "">("")
  const [showFilters, setShowFilters] = useState(false)

  const searchParams = useSearchParams()
  const { getFilteredProducts, products, loading } = useProductStore()

  // Handle URL parameters for filtering
  useEffect(() => {
    const category = searchParams.get("category")
    const size = searchParams.get("size")
    const complement = searchParams.get("complement")

    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const filteredProducts = getFilteredProducts({
    category: selectedCategory,
    search: searchTerm,
    sortBy: sortBy || undefined,
  })

  const getSortLabel = (value: string) => {
    switch (value) {
      case "price-low":
        return "Price: Low to High"
      case "price-high":
        return "Price: High to Low"
      case "latest":
        return "Latest Collections"
      case "best-sellers":
        return "Best Sellers"
      default:
        return "Sort By"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "all":
        return "All Products"
      case "complete":
        return "Complete Shoes"
      case "upper":
        return "Uppers"
      case "lower":
        return "Soles"
      default:
        return "Products"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Catalogue</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Discover our complete collection of premium shoes, uppers, and soles. Mix, match, and create your perfect
            style.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products, colors, styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Category Filter */}
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="font-semibold"
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === "complete" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("complete")}
                  className="font-semibold"
                >
                  Complete Shoes
                </Button>
                <Button
                  variant={selectedCategory === "upper" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("upper")}
                  className="font-semibold"
                >
                  Uppers
                </Button>
                <Button
                  variant={selectedCategory === "lower" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("lower")}
                  className="font-semibold"
                >
                  Soles
                </Button>
              </div>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="best-sellers">Best Sellers</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="latest">Latest Collections</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              {/* Mobile Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    className="text-sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedCategory === "complete" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("complete")}
                    className="text-sm"
                  >
                    Complete
                  </Button>
                  <Button
                    variant={selectedCategory === "upper" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("upper")}
                    className="text-sm"
                  >
                    Uppers
                  </Button>
                  <Button
                    variant={selectedCategory === "lower" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("lower")}
                    className="text-sm"
                  >
                    Soles
                  </Button>
                </div>
              </div>

              {/* Mobile Sort Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-sellers">Best Sellers</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="latest">Latest Collections</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4">
                <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSortBy("")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{getCategoryLabel(selectedCategory)}</h2>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                    {sortBy && ` • Sorted by ${getSortLabel(sortBy).toLowerCase()}`}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>In Stock: {filteredProducts.filter((p) => p.inStock).length}</span>
                  <span>•</span>
                  <span>
                    Price Range: ₹{Math.min(...filteredProducts.map((p) => p.price))} - ₹
                    {Math.max(...filteredProducts.map((p) => p.price))}
                  </span>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    type={product.type}
                    color={product.color}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
