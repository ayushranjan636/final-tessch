"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart, Save } from 'lucide-react'
import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { useWishlistStore } from "@/lib/wishlist-store"
import { uppersData, solesData } from "@/lib/products-data"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function CustomizePage() {
const [currentUpperIndex, setCurrentUpperIndex] = useState(0)
const [currentSoleIndex, setCurrentSoleIndex] = useState(0)

const addToCart = useCartStore((state) => state.addItem)
const addToWishlist = useWishlistStore((state) => state.addItem)

const currentUpper = uppersData[currentUpperIndex]
const currentSole = solesData[currentSoleIndex]
const totalPrice = currentUpper.price + currentSole.price

const handlePreviousUpper = () => {
  setCurrentUpperIndex((prev) => (prev === 0 ? uppersData.length - 1 : prev - 1))
}

const handleNextUpper = () => {
  setCurrentUpperIndex((prev) => (prev === uppersData.length - 1 ? 0 : prev + 1))
}

const handlePreviousSole = () => {
  setCurrentSoleIndex((prev) => (prev === 0 ? solesData.length - 1 : prev - 1))
}

const handleNextSole = () => {
  setCurrentSoleIndex((prev) => (prev === solesData.length - 1 ? 0 : prev + 1))
}

const handleAddToCart = () => {
  const customShoe = {
    id: `custom-${currentUpper.id}-${currentSole.id}-${Date.now()}`,
    name: `${currentUpper.color} ${currentUpper.name.split(" ")[0]} + ${currentSole.color} ${currentSole.name.split(" ")[0]}`,
    price: totalPrice,
    image: currentUpper.image,
    type: "complete" as const,
    color: `${currentUpper.color}/${currentSole.color}`,
  }
  addToCart(customShoe)
}

const handleSaveDesign = () => {
  const designItem = {
    id: `design-${currentUpper.id}-${currentSole.id}-${Date.now()}`,
    upperName: currentUpper.name,
    upperPrice: currentUpper.price,
    upperImage: currentUpper.image,
    upperColor: currentUpper.color,
    soleName: currentSole.name,
    solePrice: currentSole.price,
    soleImage: currentSole.image,
    soleColor: currentSole.color,
    totalPrice,
  }
  addToWishlist(designItem)
  // You can add a toast notification here
  console.log("Design saved!")
}

return (
  <div className="min-h-screen bg-white">
    <Header />

    {/* Customization Interface */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Product Display */}
        <div className="space-y-4">
          {/* Upper Section */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousUpper}
                className="rounded-full bg-gray-800 text-white hover:bg-gray-700 w-10 h-10 md:w-12 md:h-12"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </Button>

              <div className="flex-1 text-center">
                <div className="relative h-48 md:h-64 lg:h-72 mb-2">
                  <Image
                    src={currentUpper.image || "/placeholder.svg"}
                    alt={currentUpper.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextUpper}
                className="rounded-full bg-gray-800 text-white hover:bg-gray-700 w-10 h-10 md:w-12 md:h-12"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>

          {/* Sole Section */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousSole}
                className="rounded-full bg-gray-800 text-white hover:bg-gray-700 w-10 h-10 md:w-12 md:h-12"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </Button>

              <div className="flex-1 text-center">
                <div className="relative h-24 md:h-32 lg:h-40 mb-2">
                  <Image
                    src={currentSole.image || "/placeholder.svg"}
                    alt={currentSole.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextSole}
                className="rounded-full bg-gray-800 text-white hover:bg-gray-700 w-10 h-10 md:w-12 md:h-12"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Billing and Actions */}
        <div className="space-y-6 lg:space-y-8">
          {/* Billing Section */}
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h2>
            
            {/* Upper Details */}
            <div className="flex justify-between items-start pb-3 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{currentUpper.color} Upper</h3>
                <p className="text-gray-600 text-xs md:text-sm">Upper Only</p>
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base">Rs. {currentUpper.price}</p>
            </div>

            {/* Sole Details */}
            <div className="flex justify-between items-start pb-3 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{currentSole.color} Sole</h3>
                <p className="text-gray-600 text-xs md:text-sm">Sole Only</p>
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base">Rs. {currentSole.price}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Total:</h3>
              <p className="text-lg md:text-xl font-bold text-gray-900">Rs. {totalPrice}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 md:space-y-4">
            <Button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-700 py-3 md:py-4 text-sm md:text-base"
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
              Add to Cart
            </Button>

            <Button
              onClick={handleSaveDesign}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-900 hover:bg-gray-50 py-3 md:py-4 text-sm md:text-base"
            >
              <Save className="h-4 w-4 md:h-5 md:w-5" />
              Save My Design
            </Button>

            <Link
              href={`/product-details/${currentUpper.id}/${currentSole.id}`}
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 py-3 md:py-4 text-sm md:text-base"
              >
                View Product Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)
}
