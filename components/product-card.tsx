"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import { useProductStore } from "@/lib/product-store"
import { useWishlistStore } from "@/lib/wishlist-store"
import { Heart } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  type: "upper" | "lower" | "complete"
  color: string
  bgColor?: string
}

export function ProductCard({ id, name, price, image, type, color }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { getProductById } = useProductStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()

  // Get real-time product data
  const product = getProductById(id)
  const inStock = product?.inStock || false

  const handleAddToCart = () => {
    // Redirect to pre-cart page for size selection and confirmation
    window.location.href = `/pre-cart/${id}`
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToWishlist({
      id,
      name,
      price,
      image,
      type,
      color,
      addedAt: new Date().toISOString()
    })
  }

  return (
    <div className="relative group">
      <Card
        className={`transition-all duration-300 border-0 overflow-hidden cursor-pointer min-h-[350px] sm:min-h-[400px] flex flex-col ${
          isHovered
            ? "fixed inset-4 sm:inset-0 z-50 sm:m-auto sm:w-96 sm:h-96 shadow-2xl transform scale-105 sm:scale-110"
            : "hover:shadow-lg group-hover:z-10"
        }`}
        style={{ backgroundColor: "#eaeceb" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Product Image */}
          <div className={`relative overflow-hidden bg-transparent ${isHovered ? "h-64" : "h-48 flex-shrink-0"}`}>
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className={`object-contain transition-transform duration-300 ${
                isHovered ? "scale-105 p-4" : "group-hover:scale-105 p-4"
              }`}
            />

            {/* Stock Status Badge */}
            <div className="absolute top-2 right-2">
              <Badge variant={inStock ? "default" : "destructive"} className="text-xs">
                {inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            {/* Hover Overlay with Product Info */}
            {isHovered && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h3 className="font-bold text-lg text-gray-900">
                  {color} {name}
                </h3>
                <p className="text-sm text-gray-600 capitalize">{type} Only</p>
                <p className="text-xl font-bold text-gray-900">₹{price.toLocaleString("en-IN")}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className="text-xs text-gray-600">{inStock ? "Available" : "Out of stock"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Info - Always visible when not hovered */}
          {!isHovered && (
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3 sm:mb-4 min-h-[50px] sm:min-h-[60px]">
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-tight line-clamp-2">
                    {color} {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 capitalize mt-1">{type} Only</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="text-xs text-gray-500">{inStock ? "Available" : "Out of stock"}</span>
                  </div>
                </div>
                <div className="text-right ml-3 sm:ml-4">
                  <p className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
                    ₹{price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
                disabled={!inStock}
                className={`w-full font-semibold py-2 sm:py-3 rounded-none mt-auto text-sm sm:text-base ${
                  inStock ? "bg-black hover:bg-gray-800 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          )}

          {/* Hover Action Buttons */}
          {isHovered && (
            <div className="absolute bottom-6 left-6 right-6 flex gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
                disabled={!inStock}
                className={`flex-1 font-semibold ${
                  inStock
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="px-3 bg-white border-gray-300 hover:bg-gray-50"
                title="Add to Waitlist"
              >
                <Heart className={`h-4 w-4 ${isInWishlist(id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Link href={`/product/${id}`}>
                <Button variant="outline" className="px-3 bg-gray-800 text-white border-gray-800 hover:bg-gray-700">
                  View
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backdrop overlay when hovered */}
      {isHovered && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setIsHovered(false)} />
      )}

      {/* Regular link functionality when not hovered */}
      {!isHovered && <Link href={`/product/${id}`} className="absolute inset-0 z-10" />}
    </div>
  )
}
