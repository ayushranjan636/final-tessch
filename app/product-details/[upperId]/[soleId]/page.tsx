"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, ShoppingCart, Heart } from "lucide-react"
import { CartIcon } from "@/components/cart-icon"
import { useCartStore } from "@/lib/cart-store"
import { useWishlistStore } from "@/lib/wishlist-store"
import { uppersData, solesData } from "@/lib/products-data"
import { Footer } from "@/components/footer"

interface ProductDetailsPageProps {
  params: {
    upperId: string
    soleId: string
  }
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)

  const upper = uppersData.find((u) => u.id === params.upperId)
  const sole = solesData.find((s) => s.id === params.soleId)

  if (!upper || !sole) {
    return <div>Products not found</div>
  }

  const totalPrice = upper.price + sole.price

  const handleAddToCart = () => {
    const customShoe = {
      id: `custom-${upper.id}-${sole.id}-${Date.now()}`,
      name: `${upper.color} ${upper.name.split(" ")[0]} + ${sole.color} ${sole.name.split(" ")[0]}`,
      price: totalPrice,
      image: upper.image,
      type: "complete" as const,
      color: `${upper.color}/${sole.color}`,
    }
    addToCart(customShoe)
  }

  const handleAddToWishlist = () => {
    const wishlistItem = {
      id: `wishlist-${upper.id}-${sole.id}-${Date.now()}`,
      upperName: upper.name,
      upperPrice: upper.price,
      upperImage: upper.image,
      upperColor: upper.color,
      soleName: sole.name,
      solePrice: sole.price,
      soleImage: sole.image,
      soleColor: sole.color,
      totalPrice,
    }
    addToWishlist(wishlistItem)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-SaWfAgoNa2aaV6t9qYPcpX4q0zYsFt.jpeg"
                alt="TESSCH Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logotext.jpg-RwL14DoIkj5V3KkPCMI0ZyLBZcDUhJ.jpeg"
                alt="TESSCH"
                width={120}
                height={24}
                className="object-contain"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-12">
              <Link href="/" className="text-sm text-gray-900 hover:text-gray-600 font-semibold">
                Home
              </Link>
              <Link href="/about" className="text-sm text-gray-900 hover:text-gray-600 font-semibold">
                About
              </Link>
              <Link href="/catalogue" className="text-sm text-gray-900 hover:text-gray-600 font-semibold">
                Catalogue
              </Link>
              <Link href="/styles" className="text-sm text-gray-900 hover:text-gray-600 font-semibold">
                My Styles
              </Link>
              <Link href="/cart" className="text-sm text-gray-900 hover:text-gray-600 font-semibold">
                My Cart
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <CartIcon />
            </div>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Shoe Combination</h1>
          <p className="text-lg text-gray-600">Your selected upper and sole combination</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Upper Details */}
          <Card className="border-2 border-gray-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upper Component</h2>
              </div>
              <div className="relative h-64 mb-6">
                <Image src={upper.image || "/placeholder.svg"} alt={upper.name} fill className="object-contain" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{upper.name}</h3>
                <p className="text-gray-600 mb-2">Upper Only</p>
                <p className="text-2xl font-bold text-gray-900">Rs. {upper.price}</p>
              </div>
              <div className="mt-6">
                <Link href={`/product/${upper.id}`}>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Upper Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Sole Details */}
          <Card className="border-2 border-gray-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sole Component</h2>
              </div>
              <div className="relative h-64 mb-6">
                <Image src={sole.image || "/placeholder.svg"} alt={sole.name} fill className="object-contain" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{sole.name}</h3>
                <p className="text-gray-600 mb-2">Sole Only</p>
                <p className="text-2xl font-bold text-gray-900">Rs. {sole.price}</p>
              </div>
              <div className="mt-6">
                <Link href={`/product/${sole.id}`}>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Sole Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Combined Product Summary */}
        <Card className="border-2 border-blue-500 bg-blue-50">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Shoe</h2>
              <p className="text-lg text-gray-600">
                {upper.color} {upper.name.split(" ")[0]} + {sole.color} {sole.name.split(" ")[0]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
              <div className="relative h-64">
                <Image src={upper.image || "/placeholder.svg"} alt="Complete Shoe" fill className="object-contain" />
              </div>
              <div className="text-center md:text-left">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Price Breakdown:</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>{upper.name}</span>
                      <span>Rs. {upper.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{sole.name}</span>
                      <span>Rs. {sole.price}</span>
                    </div>
                    <div className="border-t pt-2 font-bold flex justify-between">
                      <span>Total</span>
                      <span>Rs. {totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleAddToCart} className="flex items-center gap-2 bg-black text-white">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleAddToWishlist}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Heart className="h-4 w-4" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/customize">
                <Button variant="outline" className="mr-4 bg-transparent">
                  Customize Again
                </Button>
              </Link>
              <Link href="/catalogue">
                <Button variant="outline">Browse More Products</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
