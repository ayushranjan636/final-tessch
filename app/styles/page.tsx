"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ShoppingCart, Heart, Plus } from 'lucide-react'
import { useWishlistStore } from "@/lib/wishlist-store"
import { useCartStore } from "@/lib/cart-store"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function StylesPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()
  const [isClearing, setIsClearing] = useState(false)

  const handleAddToCart = (style: any) => {
    try {
      const cartItem = {
        id: style.id,
        name: style.name || `${style.upperColor || 'Custom'} + ${style.soleColor || 'Custom'}`,
        price: style.totalPrice || style.price || 0,
        image: style.image || style.upperImage || "/placeholder.svg?height=300&width=300",
        type: "complete" as const,
        customization: {
          upperId: style.upperName,
          soleId: style.soleName,
        },
      }
      addItem(cartItem)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const handleRemoveStyle = (id: string) => {
    try {
      removeItem(id)
    } catch (error) {
      console.error("Error removing style:", error)
    }
  }

  const handleClearAll = async () => {
    try {
      setIsClearing(true)
      await clearWishlist()
    } catch (error) {
      console.error("Error clearing styles:", error)
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">My Styles</h1>
            <p className="text-xl mb-8">Your personalized shoe designs and saved combinations</p>
            <Link href="/customize">
              <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold">
                Create New Style
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!items || items.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Plus className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved styles yet</h3>
                <p className="text-gray-600 mb-6">
                  Start customizing shoes to save your favorite combinations here.
                </p>
                <Link href="/customize">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                    Create Your First Style
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Header with Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Saved Styles ({items.length})
                  </h2>
                  <p className="text-gray-600">Manage your custom shoe designs</p>
                </div>
                <div className="flex gap-3">
                  <Link href="/customize">
                    <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      New Design
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    disabled={isClearing}
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isClearing ? "Clearing..." : "Clear All"}
                  </Button>
                </div>
              </div>

              {/* Styles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((style) => (
                  <Card key={style.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      {/* Style Preview */}
                      <div className="relative bg-gray-50 p-6">
                        <div className="flex justify-center items-center gap-4 mb-4">
                          {/* Upper */}
                          <div className="relative">
                            <Image
                              src={style.upperImage || style.image || "/placeholder.svg?height=80&width=80"}
                              alt={style.upperName || style.name || "Upper"}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          </div>
                          {/* Plus Icon */}
                          <Plus className="h-6 w-6 text-gray-400" />
                          {/* Sole */}
                          <div className="relative">
                            <Image
                              src={style.soleImage || "/placeholder.svg?height=80&width=80"}
                              alt={style.soleName || "Sole"}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        
                        {/* Custom Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-white/90 text-gray-900">
                            Custom
                          </Badge>
                        </div>
                      </div>

                      {/* Style Info */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {style.name || `${style.upperColor || 'Custom'} + ${style.soleColor || 'Custom'}`}
                          </h3>
                          <p className="text-lg font-bold text-orange-600">
                            ₹{(style.totalPrice || style.price || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {style.upperName && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Upper:</span>
                              <span className="font-medium">
                                {style.upperName} ({style.upperColor || 'N/A'})
                              </span>
                            </div>
                          )}
                          {style.soleName && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Sole:</span>
                              <span className="font-medium">
                                {style.soleName} ({style.soleColor || 'N/A'})
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Created:</span>
                            <span className="font-medium">
                              {style.addedAt ? new Date(style.addedAt).toLocaleDateString() : 'Recently'}
                            </span>
                          </div>
                        </div>

                        {/* Color Info */}
                        {(style.upperColor || style.soleColor) && (
                          <div className="flex gap-2 mb-4">
                            {style.upperColor && (
                              <Badge variant="outline" className="text-xs">
                                {style.upperColor}
                              </Badge>
                            )}
                            {style.soleColor && (
                              <Badge variant="outline" className="text-xs">
                                {style.soleColor}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddToCart(style)}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            onClick={() => handleRemoveStyle(style.id)}
                            variant="outline"
                            size="sm"
                            className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create Something New?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Mix and match from our collection to create your perfect shoe combination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customize">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Start Customizing
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button variant="outline" className="px-8 py-3">
                Browse Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
