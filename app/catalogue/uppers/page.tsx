"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, ArrowLeft } from "lucide-react"
import { CartIcon } from "@/components/cart-icon"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/all-products-data"
import { Footer } from "@/components/footer"

export default function UppersPage() {
  const uppers = allProducts.filter((product) => product.type === "upper")

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
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <CartIcon />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/catalogue" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Catalogue
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Upper Collection</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Premium upper designs crafted for style and comfort. Mix and match with our sole collection.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {uppers.map((product) => (
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
        </div>
      </section>
      <Footer />
    </div>
  )
}
