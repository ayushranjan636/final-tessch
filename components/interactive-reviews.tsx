"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { useState } from "react"

interface Review {
  id: number
  name: string
  rating: number
  review: string
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
    rotate: string
    zIndex: number
  }
}

const reviews: Review[] = [
  {
    id: 1,
    name: "CUSTOMER NAME",
    rating: 5,
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    position: { top: "0", left: "25%", rotate: "-15deg", zIndex: 10 },
  },
  {
    id: 2,
    name: "CUSTOMER NAME",
    rating: 4,
    review: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    position: { top: "2rem", left: "50%", rotate: "8deg", zIndex: 20 },
  },
  {
    id: 3,
    name: "CUSTOMER NAME",
    rating: 5,
    review: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    position: { top: "1rem", right: "25%", rotate: "18deg", zIndex: 15 },
  },
  {
    id: 4,
    name: "CUSTOMER NAME",
    rating: 4,
    review: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    position: { bottom: "2rem", left: "33.333333%", rotate: "-8deg", zIndex: 30 },
  },
  {
    id: 5,
    name: "CUSTOMER NAME",
    rating: 5,
    review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    position: { bottom: "1rem", right: "33.333333%", rotate: "12deg", zIndex: 30 },
  },
]

export function InteractiveReviews() {
  const [hoveredReview, setHoveredReview] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 tracking-wider">CUSTOMER REVIEWS</h2>
          <p className="text-lg text-gray-600 font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </div>

        {/* Desktop/Laptop Layout - Interactive Overlapping Cards */}
        <div className="hidden md:block">
          <div className="relative h-96 md:h-[500px] flex items-center justify-center">
            {reviews.map((review) => {
              const isHovered = hoveredReview === review.id
              const isOtherHovered = hoveredReview !== null && hoveredReview !== review.id

              return (
                <div
                  key={review.id}
                  className="absolute transition-all duration-300 ease-in-out"
                  style={{
                    top: review.position.top,
                    bottom: review.position.bottom,
                    left: review.position.left,
                    right: review.position.right,
                    transform: `${review.position.right ? "translateX(50%)" : "translateX(-50%)"} rotate(${review.position.rotate}) ${
                      isHovered ? "scale(1.1)" : "scale(1)"
                    }`,
                    zIndex: isHovered ? 100 : review.position.zIndex,
                    opacity: isOtherHovered ? 0.7 : 1,
                    filter: isOtherHovered ? "blur(1px)" : "blur(0px)",
                  }}
                  onMouseEnter={() => setHoveredReview(review.id)}
                  onMouseLeave={() => setHoveredReview(null)}
                >
                  <Card
                    className={`w-64 h-80 shadow-2xl border border-white/20 overflow-hidden cursor-pointer transition-all duration-300 backdrop-blur-md ${
                      isHovered ? "shadow-3xl ring-4 ring-white/30" : ""
                    }`}
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.85) 0%, 
                        rgba(255, 255, 255, 0.75) 50%, 
                        rgba(255, 255, 255, 0.65) 100%
                      )`,
                    }}
                  >
                    <CardContent className="p-6 h-full text-gray-800 flex flex-col justify-between relative overflow-hidden">
                      {/* Glass effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none" />
                      
                      {/* Animated background pattern when hovered */}
                      {isHovered && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-50 animate-pulse" />
                      )}

                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-all duration-200 ${
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                              } ${isHovered ? "animate-pulse" : ""}`}
                            />
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-3 text-sm tracking-wide">{review.name}</h4>
                        <p
                          className={`text-sm text-gray-700 leading-relaxed font-medium transition-all duration-300 ${
                            isHovered ? "text-gray-900" : ""
                          }`}
                        >
                          {review.review}
                        </p>
                      </div>

                      <div
                        className={`text-center text-gray-500 font-medium text-lg mt-4 transition-all duration-300 ${
                          isHovered ? "text-gray-700 text-xl" : ""
                        }`}
                      >
                        review
                      </div>

                      {/* Hover indicator */}
                      {isHovered && <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-ping" />}

                      {/* Glass reflection effect */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Layout - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {reviews.map((review) => {
              const isHovered = hoveredReview === review.id

              return (
                <div
                  key={review.id}
                  className="flex-none w-80 snap-center"
                  onTouchStart={() => setHoveredReview(review.id)}
                  onTouchEnd={() => setHoveredReview(null)}
                >
                  <Card
                    className="h-80 shadow-lg border border-white/20 overflow-hidden backdrop-blur-md"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.25) 0%, 
                        rgba(255, 255, 255, 0.15) 50%, 
                        rgba(255, 255, 255, 0.05) 100%
                      )`,
                    }}
                  >
                    <CardContent className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
                      {/* Glass effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-all duration-200 ${
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-3 text-sm tracking-wide">{review.name}</h4>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                          {review.review}
                        </p>
                      </div>

                      <div className="text-center text-gray-500 font-medium text-sm mt-4 uppercase tracking-wider relative z-10">
                        Review
                      </div>

                      {/* Glass reflection effect */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4">
            <p className="text-gray-400 text-sm">← Swipe to see more reviews →</p>
          </div>
        </div>

        {/* Additional interaction hint for desktop */}
        <div className="text-center mt-8 hidden md:block">
          <p className="text-gray-500 text-sm italic">Hover over reviews to see them in detail</p>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
