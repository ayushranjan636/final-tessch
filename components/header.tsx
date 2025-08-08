"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User, Menu } from "lucide-react"
import { CartIcon } from "@/components/cart-icon"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/styles", label: "My Style" },
    { href: "/about", label: "About Us" },
  ]

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Links to homepage */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-SaWfAgoNa2aaV6t9qYPcpX4q0zYsFt.jpeg"
              alt="TESSCH Logo"
              width={32}
              height={32}
              className="object-contain sm:w-8 sm:h-8"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logotext.jpg-RwL14DoIkj5V3KkPCMI0ZyLBZcDUhJ.jpeg"
              alt="TESSCH"
              width={120}
              height={24}
              className="object-contain sm:w-[140px] sm:h-7"
            />
          </Link>

          {/* Desktop Navigation - Clean and Justified */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-gray-100 transition-colors" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <CartIcon />

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-gray-100">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-center mb-8 pt-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-SaWfAgoNa2aaV6t9qYPcpX4q0zYsFt.jpeg"
                        alt="TESSCH Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logotext.jpg-RwL14DoIkj5V3KkPCMI0ZyLBZcDUhJ.jpeg"
                        alt="TESSCH"
                        width={100}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/profile"
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-3 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="mt-auto pt-8 pb-4">
                    <Link href="/customize">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        Customize Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
