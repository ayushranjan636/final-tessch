"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const handleNewsletterSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    // TODO: Replace with actual newsletter signup API call
    // try {
    //   const response = await fetch('/api/notifications/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    //   })
    //
    //   const result = await response.json()
    //
    //   if (result.success) {
    //     toast.success('Successfully subscribed to newsletter!')
    //     e.currentTarget.reset()
    //   } else {
    //     toast.error(result.message || 'Failed to subscribe')
    //   }
    // } catch (error) {
    //   console.error('Newsletter signup error:', error)
    //   toast.error('Failed to subscribe. Please try again.')
    // }

    // Mock implementation for demo
    console.log("TODO: Subscribe email to newsletter:", email)
    toast.success("Successfully subscribed to newsletter!")
    e.currentTarget.reset()
  }

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
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
            </div>
            <p className="text-sm text-gray-600">
              Crafting premium footwear with customizable uppers and soles. Build your perfect shoe, your way.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalogue" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/catalogue/uppers" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Uppers
                </Link>
              </li>
              <li>
                <Link href="/catalogue/lowers" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Soles
                </Link>
              </li>
              <li>
                <Link href="/customize" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Customize
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-gray-600">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-2">
              <Input type="email" name="email" placeholder="Enter your email" className="w-full" required />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">© 2024 TESSCH. All rights reserved.</div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
