"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl sm:text-8xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 text-lg mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogue">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              If you think this is an error, please contact our support team.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="bg-transparent">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
