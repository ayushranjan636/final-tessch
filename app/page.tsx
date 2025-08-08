"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, ArrowRight } from 'lucide-react'
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { InteractiveReviews } from "@/components/interactive-reviews"
import { Header } from "@/components/header"

export default function TesschHomepage() {
  const bestCollections = [
    {
      id: "pink-runner",
      name: "Runner",
      price: 1299,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w5.jpg-9ChVB7GIga7PmTklCzTHgmpiMHubsI.jpeg",
      type: "complete" as const,
      color: "Pink",
    },
    {
      id: "green-sport",
      name: "Sport",
      price: 1199,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w7.jpg-OeIizG7etC57msyq6cFTD05OokRcLk.jpeg",
      type: "complete" as const,
      color: "Green",
    },
    {
      id: "gray-classic",
      name: "Classic",
      price: 999,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w6.jpg-yHFk3W2lmzDJ8B7h1HGT4ihCgva5dt.jpeg",
      type: "complete" as const,
      color: "Gray",
    },
    {
      id: "black-gold",
      name: "Gold",
      price: 1499,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w4.jpg-PthfB15fATL1wlBeo655tRO7heeT3F.jpeg",
      type: "complete" as const,
      color: "Black",
    },
  ]

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Arial, sans-serif',
        fontWeight: 600,
      }}
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          {/* Desktop/Tablet Background */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q7.jpg-L0GZtXL1n3BEtcRKILaCyGKLRfiRUQ.jpeg"
            alt="TESSCH Sneaker Background"
            fill
            className="object-cover object-center hidden md:block"
            priority
            quality={100}
          />
          {/* Mobile Background */}
          <Image
            src="/tessch-new.png"
            alt="TESSCH Mobile Background"
            fill
            className="object-cover object-center block md:hidden"
            priority
            quality={100}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 text-center flex flex-col justify-center h-full my-0 mx-auto lg:px-8">
          {/* Hero Text - Moved higher */}
          <div className="-mt-8 md:-mt-10 mt-0 md:mb-96 mb-96">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight mt-0 md:mb-14 mb-36"
              style={{
                fontFamily:
                  '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Arial, sans-serif',
                textShadow: "0 2px 4px rgba(255,255,255,0.3)",
              }}
            >
              Add an upper, add a sole.
            </h1>
            
          </div>

          {/* CTA Button - Moved lower */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 leading-7 my-2.5 tracking-tighter">
            <Link href="/customize">
              <Button
                className="relative bg-white/20 backdrop-blur-md hover:bg-white/30 text-black border border-white/30 px-12 py-5 md:py-6 rounded-2xl text-lg md:text-xl font-bold tracking-wide transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:-translate-y-2 mx-0 md:px-16 mt-0 mb-24 group overflow-hidden"
                style={{
                  fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Arial, sans-serif',
                  minWidth: "280px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Glass shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Button text */}
                <span className="relative z-10 drop-shadow-sm">
                  Customize now
                </span>
                
                {/* 3D depth effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
              </Button>
            </Link>
          </div>
        </div>

        {/* Responsive adjustments for mobile */}
        <style jsx>{`
        @media (max-width: 768px) {
          .hero-text {
            font-size: clamp(2rem, 8vw, 4rem);
          }
          .hero-subtext {
            font-size: clamp(1.2rem, 5vw, 2rem);
          }
        }
      `}</style>
      </section>

      {/* New Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Lorem content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">
                Lorem Ipsum Dolor Sit Amet
              </h2>
              <p className="text-lg text-gray-600 font-medium mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-gray-600 font-medium">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            
            {/* Right side - YouTube iframe */}
            <div className="flex justify-center">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/brKWpjHEa1c?si=aiYi2-ADBAUscchR" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full max-w-[560px] h-[315px] rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
          {/* Three Sections */}
          <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Explore Uppers */}
            <Card className="group hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q7.jpg-L0GZtXL1n3BEtcRKILaCyGKLRfiRUQ.jpeg"
                    alt="Explore Uppers"
                    width={300}
                    height={200}
                    className="w-full h-48 object-contain mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Explore Uppers</h3>
                <p className="text-gray-600 mb-6 font-medium">
                  Discover our collection of premium upper designs crafted for style and comfort.
                </p>
                <Link href="/catalogue/uppers">
                  <Button
                    variant="outline"
                    className="group-hover:bg-gray-900 group-hover:text-white transition-colors bg-transparent"
                  >
                    View Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Explore Lowers */}
            <Card className="group hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r6-oKy5fQULAR6N2nYwjNEvRRP92tVRme.png"
                    alt="Explore Lowers"
                    width={300}
                    height={200}
                    className="w-full h-48 object-contain mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Explore Lowers</h3>
                <p className="text-gray-600 mb-6 font-medium">
                  Choose from various sole designs engineered for performance and durability.
                </p>
                <Link href="/catalogue/lowers">
                  <Button
                    variant="outline"
                    className="group-hover:bg-gray-900 group-hover:text-white transition-colors bg-transparent"
                  >
                    View Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Explore Shoes */}
            <Card className="group hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q7.jpg-L0GZtXL1n3BEtcRKILaCyGKLRfiRUQ.jpeg"
                    alt="Explore Shoes"
                    width={300}
                    height={200}
                    className="w-full h-48 object-contain mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Explore Shoes</h3>
                <p className="text-gray-600 mb-6 font-medium">
                  Browse our complete shoe collection or create your own custom combination.
                </p>
                <Link href="/customize">
                  <Button
                    variant="outline"
                    className="group-hover:bg-gray-900 group-hover:text-white transition-colors bg-transparent"
                  >
                    Build your shoes <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Best Collections Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 tracking-wider">BEST COLLECTIONS</h2>
            <p className="text-lg text-gray-600 font-medium">Discover our most popular and premium shoe designs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestCollections.map((product) => (
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

          <div className="text-center mt-12">
            <Link href="/catalogue">
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold">
                View All Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Overlapping Cards Layout */}
      <InteractiveReviews />

      {/* Enhanced Footer */}
      <Footer />
    </div>
  )
}
