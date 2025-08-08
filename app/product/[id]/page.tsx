"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Heart, Plus, Minus, Palette, Wrench, ExternalLink } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/lib/cart-store"
import { useWishlistStore } from "@/lib/wishlist-store"
import { useState } from "react"
import { allProducts, universalSizes } from "@/lib/all-products-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SizeChartModal } from "@/components/size-chart-modal"
import { toast } from "sonner"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showUpperDialog, setShowUpperDialog] = useState(false)
  const [showSoleDialog, setShowSoleDialog] = useState(false)
  const [selectedSole, setSelectedSole] = useState<any>(null)
  const [selectedUpper, setSelectedUpper] = useState<any>(null)

  const addToCart = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)

  // Find product
  const product = allProducts.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
            <Link href="/catalogue">
              <Button>Back to Catalogue</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const productImages = product.images || [product.image]
  const relatedProducts = allProducts.filter((p) => p.id !== product.id && p.type === product.type).slice(0, 4)

  // Get suggested complementary products
  const suggestedSoles = allProducts.filter((p) => p.type === "lower").slice(0, 3)
  const suggestedUppers = allProducts.filter((p) => p.type === "upper").slice(0, 3)

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first")
      return
    }

    // Smart behavior based on product type
    if (product.type === "complete") {
      // Complete shoe: Direct add to cart
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          type: product.type as "upper" | "lower" | "complete",
          color: product.color || product.name,
          size: selectedSize,
        })
      }
      toast.success(`Added ${quantity} ${product.name}(s) to cart!`)
    } else if (product.type === "upper") {
      // Upper only: Show upper dialog
      setSelectedSole(null) // Reset selection
      setShowUpperDialog(true)
    } else if (product.type === "lower") {
      // Sole only: Show sole dialog
      setSelectedUpper(null) // Reset selection
      setShowSoleDialog(true)
    }
  }

  const handleBuyUpperOnly = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type as "upper" | "lower" | "complete",
        color: product.color || product.name,
        size: selectedSize,
      })
    }
    toast.success(`Added ${quantity} ${product.name}(s) to cart!`)
    setShowUpperDialog(false)
  }

  const handleBuySoleOnly = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type as "upper" | "lower" | "complete",
        color: product.color || product.name,
        size: selectedSize,
      })
    }
    toast.success(`Added ${quantity} ${product.name}(s) to cart!`)
    setShowSoleDialog(false)
  }

  const handleAddCompleteShoeWithSole = () => {
    if (!selectedSole) {
      toast.error("Please select a sole first")
      return
    }

    // Add both upper and selected sole to cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type as "upper" | "lower" | "complete",
        color: product.color || product.name,
        size: selectedSize,
      })
      addToCart({
        id: selectedSole.id,
        name: selectedSole.name,
        price: selectedSole.price,
        image: selectedSole.image,
        type: selectedSole.type as "upper" | "lower" | "complete",
        color: selectedSole.color || selectedSole.name,
        size: selectedSize,
      })
    }
    
    toast.success(`Added complete shoe to cart!`)
    setShowUpperDialog(false)
  }

  const handleAddCompleteShoeWithUpper = () => {
    if (!selectedUpper) {
      toast.error("Please select an upper first")
      return
    }

    // Add both sole and selected upper to cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type as "upper" | "lower" | "complete",
        color: product.color || product.name,
        size: selectedSize,
      })
      addToCart({
        id: selectedUpper.id,
        name: selectedUpper.name,
        price: selectedUpper.price,
        image: selectedUpper.image,
        type: selectedUpper.type as "upper" | "lower" | "complete",
        color: selectedUpper.color || selectedUpper.name,
        size: selectedSize,
      })
    }
    
    toast.success(`Added complete shoe to cart!`)
    setShowSoleDialog(false)
  }

  const handleCustomizeWithUpper = () => {
    // Navigate to customize page with preloaded upper
    const searchParams = new URLSearchParams({
      preloadUpper: product.id,
      size: selectedSize,
    })
    window.location.href = `/customize?${searchParams.toString()}`
  }

  const handleCustomizeWithSole = () => {
    // Navigate to customize page with preloaded sole
    const searchParams = new URLSearchParams({
      preloadSole: product.id,
      size: selectedSize,
    })
    window.location.href = `/customize?${searchParams.toString()}`
  }

  const productFeatures = [
    "Premium materials and construction",
    "Advanced cushioning technology",
    "Breathable and comfortable design",
    "Durable and long-lasting",
    "Perfect for daily wear",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Product Name - Mobile */}
        <section className="py-4 px-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        </section>

        {/* Main Product Image - Mobile */}
        <section className="px-4 py-4">
          <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Thumbnail Images - Mobile */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {productImages.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-orange-500" : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>

          {/* Price and Actions - Mobile */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-orange-600">₹{product.price.toLocaleString("en-IN")}</p>
            
            {/* Size Selection with Size Chart - Mobile */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <SizeChartModal />
              </div>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {universalSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add to Cart Button - Mobile */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
              disabled={!selectedSize || !product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>

            {/* Product Badges - Mobile */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {product.type}
              </Badge>
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
              {product.isLatest && <Badge className="bg-green-100 text-green-800">Latest</Badge>}
            </div>
          </div>
        </section>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden lg:block">
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Product Images */}
              <div>
                {/* Main Product Image */}
                <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={productImages[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain p-8"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-3 gap-4">
                  {productImages.slice(0, 3).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-orange-500" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-contain p-4"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Product Info */}
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-2xl font-bold text-orange-600 mb-4">₹{product.price.toLocaleString("en-IN")}</p>
                  
                  {/* Product Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="capitalize">
                      {product.type}
                    </Badge>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    {product.isLatest && <Badge className="bg-green-100 text-green-800">Latest</Badge>}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Size</h3>
                    <SizeChartModal />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {universalSizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => handleSizeSelection(size)}
                        className="aspect-square"
                        disabled={!product.inStock}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="text-sm text-red-500 mt-2">* Please select a size</p>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={!selectedSize || !product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      addToWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        type: product.type as "upper" | "lower",
                        color: product.color || "",
                        addedAt: new Date().toISOString()
                      })
                    }
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Product Details Section */}
      <section className="py-8 lg:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Product Details</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-600 leading-relaxed">
                  This premium {product.type} is crafted with attention to detail and designed for both comfort and style. 
                  Perfect for everyday wear, it combines modern aesthetics with functional design elements.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Product Features</h2>
              <ul className="space-y-3">
                {productFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Reviews */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Product Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Mihir Mandloi",
                rating: 4,
                review: "The vibe is fresh! Hoping to get cool drops and limited edition shoes. The quality is good and I could really show up if matched right!",
                date: "2024-01-15"
              },
              {
                name: "Ayush Jain",
                rating: 4,
                review: "Wow! The price point is awesome! Exactly what I was looking for should feel the price is a steal deal.",
                date: "2024-01-12"
              },
              {
                name: "Pratham Shah",
                rating: 5,
                review: "5 stars, 5 stars, and I'm good to go! The quality is perfect!",
                date: "2024-01-10"
              },
            ].map((review, index) => (
              <Card key={index}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{review.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{review.review}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Similar Products / Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="py-8 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Similar Products / Recommendations</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-100">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={250}
                        height={250}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-3 lg:p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{relatedProduct.color}</h3>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm lg:text-base">{relatedProduct.name}</h4>
                      <p className="text-xs lg:text-sm text-gray-600 mb-2 capitalize">{relatedProduct.type} Only</p>
                      <p className="font-bold text-gray-900 mb-3 text-sm lg:text-base">₹{relatedProduct.price.toLocaleString("en-IN")}</p>
                      <Link href={`/product/${relatedProduct.id}`}>
                        <Button className="w-full text-xs lg:text-sm" variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6 lg:mt-8">
              <Link href="/catalogue">
                <Button variant="outline">See All Products</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Upper Only Dialog - Made Smaller */}
      <Dialog open={showUpperDialog} onOpenChange={setShowUpperDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader className="relative">
            <DialogTitle className="text-center text-lg">Complete Your Shoe! 👟</DialogTitle>
            <Link 
              href={`/customize?preloadUpper=${product.id}&size=${selectedSize}`}
              className="absolute top-0 right-0 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Wrench className="h-3 w-3" />
              Customize
              <ExternalLink className="h-3 w-3" />
            </Link>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm mb-1">
                You selected a <span className="font-semibold">{product.color} {product.name}</span> in size {selectedSize}.
              </p>
              <p className="text-xs text-gray-600">Why not complete your shoe with a matching sole?</p>
            </div>

            {/* Visual Preview - Smaller */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg border-2 border-orange-500 mb-1 flex items-center justify-center">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium">Selected Upper</p>
                  <p className="text-xs text-gray-600">{product.color}</p>
                </div>
                <Plus className="h-4 w-4 text-gray-400" />
                <div className="text-center">
                  <div className={`w-16 h-16 bg-white rounded-lg border-2 mb-1 flex items-center justify-center ${
                    selectedSole ? 'border-orange-500' : 'border-dashed border-gray-300'
                  }`}>
                    {selectedSole ? (
                      <Image
                        src={selectedSole.image || "/placeholder.svg"}
                        alt={selectedSole.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    ) : (
                      <Palette className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs font-medium">
                    {selectedSole ? 'Selected Sole' : 'Choose Sole'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedSole ? selectedSole.color : 'Many options'}
                  </p>
                </div>
              </div>
            </div>

            {/* Suggested Soles - Smaller */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Suggested Matching Soles:</h4>
              <div className="grid grid-cols-3 gap-2">
                {suggestedSoles.map((sole) => (
                  <button
                    key={sole.id}
                    onClick={() => setSelectedSole(sole)}
                    className={`text-center p-2 rounded-lg border-2 transition-colors ${
                      selectedSole?.id === sole.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-1 p-1">
                      <Image
                        src={sole.image || "/placeholder.svg"}
                        alt={sole.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium">{sole.color}</p>
                    <p className="text-xs text-gray-600">₹{sole.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Total Price Display - Smaller */}
            {selectedSole && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Complete Shoe Total:</p>
                  <p className="text-lg font-bold text-green-700">
                    ₹{(product.price + selectedSole.price).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-500">
                    Upper (₹{product.price}) + Sole (₹{selectedSole.price})
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons - Smaller */}
            <div className="space-y-2">
              <Button
                onClick={handleBuyUpperOnly}
                variant="outline"
                className="w-full justify-start text-sm"
                size="sm"
              >
                <ShoppingCart className="h-3 w-3 mr-2" />
                Buy Only Upper (₹{product.price.toLocaleString("en-IN")})
              </Button>
              
              {selectedSole ? (
                <Button
                  onClick={handleAddCompleteShoeWithSole}
                  className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white text-sm"
                  size="sm"
                >
                  <ShoppingCart className="h-3 w-3 mr-2" />
                  Add Complete Shoe to Cart (₹{(product.price + selectedSole.price).toLocaleString("en-IN")})
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full justify-start bg-gray-300 text-gray-500 cursor-not-allowed text-sm"
                  size="sm"
                >
                  <ShoppingCart className="h-3 w-3 mr-2" />
                  Select a sole to continue
                </Button>
              )}

              <Link href="/catalogue/lowers" className="block">
                <Button variant="ghost" className="w-full text-xs" size="sm">
                  👁 View All Soles
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Sole Only Dialog - Made Smaller */}
      <Dialog open={showSoleDialog} onOpenChange={setShowSoleDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader className="relative">
            <DialogTitle className="text-center text-lg">Complete Your Shoe! 👟</DialogTitle>
            <Link 
              href={`/customize?preloadSole=${product.id}&size=${selectedSize}`}
              className="absolute top-0 right-0 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Wrench className="h-3 w-3" />
              Customize
              <ExternalLink className="h-3 w-3" />
            </Link>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm mb-1">
                You selected a <span className="font-semibold">{product.color} {product.name}</span> in size {selectedSize}.
              </p>
              <p className="text-xs text-gray-600">Why not complete your shoe with a matching upper?</p>
            </div>

            {/* Visual Preview - Smaller */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-white rounded-lg border-2 mb-1 flex items-center justify-center ${
                    selectedUpper ? 'border-orange-500' : 'border-dashed border-gray-300'
                  }`}>
                    {selectedUpper ? (
                      <Image
                        src={selectedUpper.image || "/placeholder.svg"}
                        alt={selectedUpper.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    ) : (
                      <Palette className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs font-medium">
                    {selectedUpper ? 'Selected Upper' : 'Choose Upper'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedUpper ? selectedUpper.color : 'Many options'}
                  </p>
                </div>
                <Plus className="h-4 w-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg border-2 border-orange-500 mb-1 flex items-center justify-center">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium">Selected Sole</p>
                  <p className="text-xs text-gray-600">{product.color}</p>
                </div>
              </div>
            </div>

            {/* Suggested Uppers - Smaller */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Suggested Matching Uppers:</h4>
              <div className="grid grid-cols-3 gap-2">
                {suggestedUppers.map((upper) => (
                  <button
                    key={upper.id}
                    onClick={() => setSelectedUpper(upper)}
                    className={`text-center p-2 rounded-lg border-2 transition-colors ${
                      selectedUpper?.id === upper.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-1 p-1">
                      <Image
                        src={upper.image || "/placeholder.svg"}
                        alt={upper.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium">{upper.color}</p>
                    <p className="text-xs text-gray-600">₹{upper.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Total Price Display - Smaller */}
            {selectedUpper && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Complete Shoe Total:</p>
                  <p className="text-lg font-bold text-green-700">
                    ₹{(product.price + selectedUpper.price).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-500">
                    Sole (₹{product.price}) + Upper (₹{selectedUpper.price})
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons - Smaller */}
            <div className="space-y-2">
              <Button
                onClick={handleBuySoleOnly}
                variant="outline"
                className="w-full justify-start text-sm"
                size="sm"
              >
                <ShoppingCart className="h-3 w-3 mr-2" />
                Buy Only Sole (₹{product.price.toLocaleString("en-IN")})
              </Button>
              
              {selectedUpper ? (
                <Button
                  onClick={handleAddCompleteShoeWithUpper}
                  className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white text-sm"
                  size="sm"
                >
                  <ShoppingCart className="h-3 w-3 mr-2" />
                  Add Complete Shoe to Cart (₹{(product.price + selectedUpper.price).toLocaleString("en-IN")})
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full justify-start bg-gray-300 text-gray-500 cursor-not-allowed text-sm"
                  size="sm"
                >
                  <ShoppingCart className="h-3 w-3 mr-2" />
                  Select an upper to continue
                </Button>
              )}

              <Link href="/catalogue/uppers" className="block">
                <Button variant="ghost" className="w-full text-xs" size="sm">
                  👁 View All Uppers
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
