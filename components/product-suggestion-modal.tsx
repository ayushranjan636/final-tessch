"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { allProducts } from "@/lib/all-products-data"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart, Wrench, Plus } from 'lucide-react'

interface ProductSuggestionModalProps {
  isOpen: boolean
  onClose: () => void
  productType: "upper" | "lower"
  addedProduct: {
    id: string
    name: string
    color: string
    size: string
  }
}

export function ProductSuggestionModal({ isOpen, onClose, productType, addedProduct }: ProductSuggestionModalProps) {
  const addItem = useCartStore((state) => state.addItem)

  const suggestedType = productType === "upper" ? "lower" : "upper"
  const suggestedProducts = allProducts.filter((product) => product.type === suggestedType).slice(0, 3)

  const handleAddSuggestion = (product: any) => {
    addItem({
      id: `${product.id}-${addedProduct.size}`,
      name: product.name,
      price: product.price,
      image: product.image,
      type: product.type,
      color: product.color,
      size: addedProduct.size,
    })
    onClose()
  }

  const handleCustomizeNow = () => {
    const searchParams = new URLSearchParams({
      [productType === "upper" ? "preloadUpper" : "preloadSole"]: addedProduct.id,
      size: addedProduct.size,
    })
    window.location.href = `/customize?${searchParams.toString()}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Complete Your Shoe! 👟</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg mb-2">
              You added a{" "}
              <span className="font-semibold">
                {addedProduct.color} {productType}
              </span>{" "}
              to your cart.
            </p>
            <p className="text-gray-600">Why not complete your shoe with a matching {suggestedType}?</p>
          </div>

          {/* Visual Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-lg border-2 border-orange-500 mb-2 flex items-center justify-center">
                  <div className="text-xs font-medium">Added {productType}</div>
                </div>
                <p className="text-sm font-medium">{addedProduct.color}</p>
                <p className="text-xs text-gray-600">Size {addedProduct.size}</p>
              </div>
              <Plus className="h-6 w-6 text-gray-400" />
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-lg border-2 border-dashed border-gray-300 mb-2 flex items-center justify-center">
                  <div className="text-xs text-gray-400">Choose {suggestedType}</div>
                </div>
                <p className="text-sm font-medium">Perfect Match</p>
                <p className="text-xs text-gray-600">Many options</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {suggestedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square mb-3 bg-gray-100 rounded">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">
                    {product.color} {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 capitalize">{product.type} Only</p>
                  <p className="font-bold text-lg mb-3">₹{product.price}</p>
                  <Button
                    onClick={() => handleAddSuggestion(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add {suggestedType}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleCustomizeNow}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Wrench className="h-4 w-4 mr-2" />
              Customize Complete Shoe
            </Button>
            <Button onClick={onClose} variant="outline">
              Skip for now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
