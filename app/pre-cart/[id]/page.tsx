"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Package, Palette } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProductStore } from "@/lib/product-store"
import { useCartStore } from "@/lib/cart-store"
import { universalSizes } from "@/lib/all-products-data"
import { toast } from "sonner"

export default function PreCartPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const { getProductById, updateStock } = useProductStore()
  const { addItem } = useCartStore()

  const [selectedSize, setSelectedSize] = useState("")
  const [showComplementOptions, setShowComplementOptions] = useState(false)
  const [loading, setLoading] = useState(false)

  const product = getProductById(productId)

  useEffect(() => {
    if (!product) {
      router.push("/catalogue")
    }
  }, [product, router])

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/catalogue")}>Back to Catalogue</Button>
          </div>
        </div>
      </div>
    )
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)

    // For complete shoes, show complement options
    if (product.type === "complete") {
      setShowComplementOptions(true)
    }
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size first")
      return
    }

    if (!product.inStock) {
      toast.error("This product is out of stock")
      return
    }

    setLoading(true)

    try {
      // Add to cart
      addItem({
        id: product.id,
        name: product.name,
        color: product.color || "",
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: 1,
        type: product.type || "complete",
      })

      // Update stock in real-time
      updateStock(product.id, 1)

      toast.success("Product added to cart!")
      router.push("/cart")
    } catch (error) {
      toast.error("Failed to add product to cart")
    } finally {
      setLoading(false)
    }
  }

  const handleComplementOption = (option: "complete" | "without-sole" | "without-upper") => {
    if (option === "complete") {
      handleAddToCart()
    } else if (option === "without-sole") {
      // Redirect to upper catalog with selected size
      router.push(`/catalogue?category=upper&size=${selectedSize}`)
    } else if (option === "without-upper") {
      // Redirect to sole catalog with selected size
      router.push(`/catalogue?category=lower&size=${selectedSize}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative bg-gray-50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                  />

                  {/* Stock Status */}
                  <div className="absolute top-4 right-4">
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.color} {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline" className="capitalize">
                  {product.type}
                </Badge>
                <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Size Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Select Size (Universal)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {universalSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => handleSizeSelect(size)}
                      className="aspect-square"
                      disabled={!product.inStock}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="text-sm text-gray-600 mt-3">
                    Selected size: <span className="font-semibold">{selectedSize}</span>
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Complete Shoe Options */}
            {showComplementOptions && product.type === "complete" && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Palette className="h-5 w-5" />
                    Choose Your Option
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => handleComplementOption("complete")}
                    className="w-full justify-start bg-green-600 hover:bg-green-700"
                    disabled={loading || !product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Complete Shoe (Size {selectedSize})
                  </Button>

                  <Button
                    onClick={() => handleComplementOption("without-sole")}
                    variant="outline"
                    className="w-full justify-start border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Buy Upper Only + Browse Soles
                  </Button>

                  <Button
                    onClick={() => handleComplementOption("without-upper")}
                    variant="outline"
                    className="w-full justify-start border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Buy Sole Only + Browse Uppers
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart for Individual Parts */}
            {!showComplementOptions && (product.type === "upper" || product.type === "lower") && (
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || loading || !product.inStock}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding to Cart...
                  </div>
                ) : !product.inStock ? (
                  "Out of Stock"
                ) : !selectedSize ? (
                  "Select Size First"
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart - ₹{product.price.toLocaleString("en-IN")}
                  </>
                )}
              </Button>
            )}

            {/* Product Features */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Product Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Universal sizing for perfect fit</li>
                  <li>• Premium quality materials</li>
                  <li>• Durable construction</li>
                  <li>• Comfortable all-day wear</li>
                  {product.type === "complete" && <li>• Mix and match compatible</li>}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
