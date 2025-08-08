"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Instagram, Linkedin, Quote } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const reviews = [
    "It feels really comfortable, hardly feels different from my shoes.",
    "Wow! The price perk is awesome!! Basically another pair for almost half the price is a great deal.",
    "According to me the best part for the shoes is the comfort with minimalist design. May prefer bold colors occasionally but light colors give me the best feeling.",
    "The vibe is fresh! Hoping to see cool drops and limited editions. Rooting for you - this could really blow up if marketed right!",
    "We girls would really love such a product. We love matching our shoes' color with our outfits.",
    "3 uppers, 3 soles, and I'm good to go with my 6-7 pairs!!",
    "This solves so many problems; less money, less clutter, and less waste in nature. I'm confident this will be a big thing soon.",
    "Modular shoes just make sense. More designs. Less cost. Less Maintenance.",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Breaking Norms</h1>
          <p className="text-xl lg:text-2xl font-medium max-w-4xl mx-auto leading-relaxed">
            Your days change, why leave the shoes behind? We're built for variants and value.
          </p>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Our Philosophy</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  "From upper to sole, it's all intentional. No fluff. No filler. Just mix, match, and move."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  "One pair feels limiting. Many feel wasteful. Tessch offers a better way."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-semibold">
                  "Tessch is built for every version of you."
                </p>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q7.jpg-L0GZtXL1n3BEtcRKILaCyGKLRfiRUQ.jpeg"
                alt="TESSCH Philosophy"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
              <p className="text-xl mb-6">
                Tessch began not with a business plan but with a simple frustration that we shared. We were tired of
                switching shoes to match different moments in our life.
              </p>

              <p className="mb-6">College. Gym. Fests. Meetings. Social Media.</p>

              <p className="mb-6">
                We kept asking, <em>Why can't one shoe just do it all?</em> Not just functionally but feel like you,
                move like you and change like your mood does.
              </p>

              <p className="mb-6">That's when Tessch was born.</p>

              <p className="mb-6">
                <strong>So what exactly is Tessch?</strong>
              </p>

              <p className="mb-6">
                A modular sneaker - a design where the upper and sole come apart, and you can mix, match or rebuild
                based on what your day, mood or outfit demands. We weren't just designing sneakers. We were solving
                something more personal.
              </p>

              <ul className="mb-6 space-y-2">
                <li>That feeling of wanting to show up in style without burning a hefty amount every time.</li>
                <li>That moment when you wish your one shoe could feel new again.</li>
                <li>That stress of juggling different pairs for every hobby, every outing, every need.</li>
              </ul>

              <p className="mb-6">
                We made Tessch to prove that being smart with your choices doesn't mean settling for less. It means
                demanding more from - from your shoe, your looks, your comfort and the brands you back.
              </p>

              <p className="text-xl font-semibold">
                We're two young IITians who want to change the way shoes are worn, made and thought about.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Meaning */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-SaWfAgoNa2aaV6t9qYPcpX4q0zYsFt.jpeg"
                alt="TESSCH Boomerang Logo"
                width={200}
                height={200}
                className="mx-auto mb-8"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Our Logo "Boomerang"</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Tessch, the boomerang stands for you. It reflects the trust, energy, and belief you bring to us. Like
                a boomerang that returns to its origin, we see our relationship as a cycle not of transactions, but of
                mutual respect and growth.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                You support us, and in return, we strive to deliver products that reflect your values, your lifestyle,
                and your trust. You are not just part of our journey, you are the journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Breaking Norms */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Why "Breaking Norms"?</h2>
            <p className="text-xl mb-8">Because that's what we're doing.</p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed mb-6">
              The norm doesn't work anymore. Not for people who live many versions of themselves everyday.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              We're building a brand that reflects the way youth in India actually lives.
            </p>
            <p className="text-xl font-semibold mb-6">
              Unpredictable. Expressive. Fast-paced. Breaking Rules. Yet Thoughtful.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              We're building for the community. Our community. And we're sticking to our roots - as IITians, as
              entrepreneurs, as problem solvers and as dreamers.
            </p>
            <p className="text-2xl font-bold">
              This isn't just a normal shoe. This is something built with brains and worn with soul.
            </p>
            <p className="text-3xl font-bold mt-4">This is TESSCH. Breaking Norms.</p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="text-center border-2 border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mihir Mandloi</h3>
                <p className="text-lg text-gray-600 font-semibold">Co-Founder</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pratham Shah</h3>
                <p className="text-lg text-gray-600 font-semibold">Co-Founder</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-gray-400 mb-4" />
                  <p className="text-gray-700 leading-relaxed italic">"{review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-8">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Tessch Instagram
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              Tessch LinkedIn
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
