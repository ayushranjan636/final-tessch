"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Minus, Trash2, Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from "@/lib/cart-store"
import { useWishlistStore } from "@/lib/wishlist-store"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { toast } from "sonner"

// ——— Helpers ———
const asNumber = (v: unknown, fallback = 0) => {
  const n = typeof v === "number" ? v : Number(v)
  return Number.isFinite(n) ? n : fallback
}

export default function CartPage() {
  const { items = [], updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()
  const {
    items: waitlistItems = [],
    addItem: addToWaitlist,
    removeItem: removeFromWaitlist,
    clearWishlist
  } = useWishlistStore()

  const moveToWaitlist = (item: any) => {
    addToWaitlist({
      id: item.id,
      name: item.name,
      price: asNumber(item.price, 0),
      image: item.image,
      color: item.color,
      type: item.type,
      customization: item.customization
    })
    removeItem(item.id)
    toast.success(`${formatProductName(item)} moved to waitlist`)
  }

  const moveToCart = (item: any) => {
    const cartStore = useCartStore.getState()
    cartStore.addItem({
      id: item.id,
      name: item.name,
      price: asNumber(item.price, 0),
      image: item.image,
      color: item.color,
      type: item.type,
      customization: item.customization,
      quantity: asNumber(item.quantity, 1) || 1,
    })
    removeFromWaitlist(item.id)
    toast.success(`${formatProductName(item)} moved to cart`)
  }

  const formatProductName = (item: any) => {
    if (item?.customization?.upperId && item?.customization?.soleId) {
      return `Custom ${item.color || ''} Shoe`.trim()
    }
    return item?.name || "Custom Shoe"
  }

  const formatProductDetails = (item: any) => {
    if (item?.customization?.upperId && item?.customization?.soleId) {
      const upper = item.customization.upperColor || item.color || "—"
      const sole = item.customization.soleColor || item.color || "—"
      return `Upper: ${upper} • Sole: ${sole}`
    }
    return `${item?.type || 'Complete'} Only`
  }

  const dec = (item: any) => {
    const q = Math.max(1, asNumber(item.quantity, 1) - 1)
    updateQuantity(item.id, q)
  }
  const inc = (item: any) => {
    const q = Math.max(1, asNumber(item.quantity, 1) + 1)
    updateQuantity(item.id, q)
  }

  // Defensive total
  const safeTotal = () => {
    try {
      const t = getTotalPrice?.()
      const n = asNumber(t, 0)
      return n
    } catch {
      // fallback if store throws
      return items.reduce((sum: number, it: any) => {
        return sum + asNumber(it.price, 0) * Math.max(1, asNumber(it.quantity, 1))
      }, 0)
    }
  }

  if (items.length === 0 && waitlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart.</p>
            <Link href="/catalogue">
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/catalogue" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </section>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items ({items.length})</h2>
                {items.map((item: any) => {
                  const price = asNumber(item.price, 0)
                  const qty = Math.max(1, asNumber(item.quantity, 1))
                  return (
                    <Card key={item.id ?? JSON.stringify(item)} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* Product Image */}
                          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg?height=96&width=96&text=Shoe"}
                              alt={formatProductName(item)}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                              {formatProductName(item)}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {formatProductDetails(item)}
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                              Rs. {price.toLocaleString()}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="icon" onClick={() => dec(item)} className="h-10 w-10 rounded-full">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold text-lg">{qty}</span>
                            <Button variant="outline" size="icon" onClick={() => inc(item)} className="h-10 w-10 rounded-full">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" onClick={() => moveToWaitlist(item)} className="text-orange-600 border-orange-200 hover:bg-orange-50">
                              <Heart className="h-4 w-4 mr-1" />
                              Waitlist
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Waitlist Section */}
            {waitlistItems.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Waitlist ({waitlistItems.length})</h2>
                  <Button variant="outline" size="sm" onClick={clearWishlist} className="text-gray-600 hover:text-gray-800">
                    Clear Waitlist
                  </Button>
                </div>
                {waitlistItems.map((item: any) => {
                  const price = asNumber(item.price, 0)
                  return (
                    <Card key={item.id ?? JSON.stringify(item)} className="border border-orange-200 bg-orange-50/30 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg?height=80&width=80&text=Shoe"}
                              alt={formatProductName(item)}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {formatProductName(item)}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 capitalize">
                              {(item?.type || "Complete")} Only
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              Rs. {price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" onClick={() => moveToCart(item)} className="bg-black hover:bg-gray-800 text-white">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => removeFromWaitlist(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="border border-gray-200 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    {items.map((item: any) => {
                      const price = asNumber(item.price, 0)
                      const qty = Math.max(1, asNumber(item.quantity, 1))
                      return (
                        <div key={item.id ?? JSON.stringify(item)} className="flex justify-between text-sm">
                          <span className="truncate mr-2">
                            {formatProductName(item)} x {qty}
                          </span>
                          <span className="font-medium">
                            Rs. {(price * qty).toLocaleString()}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-gray-900">
                        Rs. {safeTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 mb-3 text-lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Button variant="outline" onClick={clearCart} className="w-full text-red-500 border-red-200 hover:bg-red-50 bg-transparent">
                    Clear Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
