// Product data and API functions
// TODO: Replace with actual API calls to your backend

export interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[] // Multiple images support
  category: "complete" | "upper" | "lower" | "sole"
  description: string
  sizes?: string[]
  colors: string[]
  inStock?: boolean
  stockCount: number
  rating?: number
  reviews?: number
  type?: "complete" | "upper" | "lower" | "sole"
  color?: string
  bgColor?: string
  isLatest?: boolean // For latest collections
  createdAt?: Date
  // TODO: Add backend fields
  // isActive: boolean,
  // updatedAt: Date,
  // categoryId: string,
  // brandId: string,
  // tags: string[],
  // variants: ProductVariant[],
  // averageRating: number,
  // totalReviews: number,
}

// TODO: Replace this static data with API calls to backend
// This should be fetched from: GET /api/products

export const allProducts: Product[] = [
  // Complete Shoes
  {
    id: "pink-runner",
    name: "Runner",
    price: 1299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w5.jpg-9ChVB7GIga7PmTklCzTHgmpiMHubsI.jpeg",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w5.jpg-9ChVB7GIga7PmTklCzTHgmpiMHubsI.jpeg"],
    type: "complete" as const,
    color: "Pink",
    category: "complete",
    bgColor: "#ec4899",
    colors: ["#ec4899", "#f472b6", "#fbbf24"],
    description:
      "Premium running shoe with advanced cushioning and breathable mesh upper. Perfect for daily runs and athletic activities.",
    stockCount: 25,
    inStock: true,
    isLatest: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "green-sport",
    name: "Sport",
    price: 1199,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w7.jpg-OeIizG7etC57msyq6cFTD05OokRcLk.jpeg",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w7.jpg-OeIizG7etC57msyq6cFTD05OokRcLk.jpeg"],
    type: "complete" as const,
    color: "Green",
    category: "complete",
    bgColor: "#16a34a",
    colors: ["#16a34a", "#22c55e", "#4ade80"],
    description:
      "Versatile sport shoe designed for multiple activities. Features durable construction and superior grip.",
    stockCount: 18,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "gray-classic",
    name: "Classic",
    price: 999,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w6.jpg-yHFk3W2lmzDJ8B7h1HGT4ihCgva5dt.jpeg",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w6.jpg-yHFk3W2lmzDJ8B7h1HGT4ihCgva5dt.jpeg"],
    type: "complete" as const,
    color: "Gray",
    category: "complete",
    bgColor: "#6b7280",
    colors: ["#6b7280", "#9ca3af", "#d1d5db"],
    description: "Timeless classic design that pairs well with any outfit. Comfortable for all-day wear.",
    stockCount: 32,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "black-gold",
    name: "Gold",
    price: 1499,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w4.jpg-PthfB15fATL1wlBeo655tRO7heeT3F.jpeg",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w4.jpg-PthfB15fATL1wlBeo655tRO7heeT3F.jpeg"],
    type: "complete" as const,
    color: "Black",
    category: "complete",
    bgColor: "#000000",
    colors: ["#000000", "#374151", "#6b7280"],
    description: "Premium luxury shoe with gold accents. Perfect for special occasions and professional settings.",
    stockCount: 12,
    inStock: true,
    isLatest: true,
    createdAt: new Date("2024-01-20"),
  },
  // Uppers
  {
    id: "white-upper",
    name: "White Upper",
    price: 1099,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-upper-Tv4yvS95U2VbbaiHBVJR8FHDqmHoOh.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-upper-Tv4yvS95U2VbbaiHBVJR8FHDqmHoOh.png"],
    type: "upper" as const,
    color: "White",
    category: "upper",
    bgColor: "#ffffff",
    colors: ["#ffffff", "#f5f5f5", "#e8e8e8"],
    description: "Clean and minimalist white upper with premium materials. Perfect for creating custom combinations.",
    stockCount: 45,
    inStock: true,
    isLatest: true,
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "orange-upper",
    name: "Red Upper",
    price: 999,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orange-upper-0BYWK7hl9nf1eVEpz9Jx6mOuK7vTVV.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orange-upper-0BYWK7hl9nf1eVEpz9Jx6mOuK7vTVV.png"],
    type: "upper" as const,
    color: "Red",
    category: "upper",
    bgColor: "#dc2626",
    colors: ["#dc2626", "#ef4444", "#f87171"],
    description: "Bold red upper that makes a statement. High-quality construction with attention to detail.",
    stockCount: 28,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "blue-upper",
    name: "Blue Upper",
    price: 1199,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-upper-BassFtvSokaes7dVYdukFC121DP2fH.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-upper-BassFtvSokaes7dVYdukFC121DP2fH.png"],
    type: "upper" as const,
    color: "Blue",
    category: "upper",
    bgColor: "#2563eb",
    colors: ["#2563eb", "#3b82f6", "#60a5fa"],
    description: "Vibrant blue upper with modern design elements. Excellent for both casual and athletic wear.",
    stockCount: 35,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "pink-upper",
    name: "Pink Upper",
    price: 1299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w5.jpg-9ChVB7GIga7PmTklCzTHgmpiMHubsI.jpeg",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w5.jpg-9ChVB7GIga7PmTklCzTHgmpiMHubsI.jpeg"],
    type: "upper" as const,
    color: "Pink",
    category: "upper",
    bgColor: "#ec4899",
    colors: ["#ec4899", "#f472b6", "#fbbf24"],
    description: "Trendy pink upper with contemporary styling. Perfect for making a fashion statement.",
    stockCount: 22,
    inStock: true,
    isLatest: true,
    createdAt: new Date("2024-01-22"),
  },
  {
    id: "green-upper",
    name: "Green Upper",
    price: 1199,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w7.jpg-OeIizG7etC57msyq6cFTD05OokRcLk.jpeg",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w7.jpg-OeIizG7etC57msyq6cFTD05OokRcLk.jpeg"],
    type: "upper" as const,
    color: "Green",
    category: "upper",
    bgColor: "#16a34a",
    colors: ["#16a34a", "#22c55e", "#4ade80"],
    description: "Fresh green upper with eco-friendly materials. Combines style with sustainability.",
    stockCount: 30,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "gray-upper",
    name: "Gray Upper",
    price: 999,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w6.jpg-yHFk3W2lmzDJ8B7h1HGT4ihCgva5dt.jpeg",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w6.jpg-yHFk3W2lmzDJ8B7h1HGT4ihCgva5dt.jpeg"],
    type: "upper" as const,
    color: "Gray",
    category: "upper",
    bgColor: "#6b7280",
    colors: ["#6b7280", "#9ca3af", "#d1d5db"],
    description: "Versatile gray upper that complements any sole. Classic design with modern comfort.",
    stockCount: 40,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-06"),
  },
  // Soles
  {
    id: "white-sole",
    name: "White Sole",
    price: 850,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-sole-4wI0THXtyXmXLgnaj3p2enktBmQIn1.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-sole-4wI0THXtyXmXLgnaj3p2enktBmQIn1.png"],
    type: "lower" as const,
    color: "White",
    category: "lower",
    bgColor: "#ffffff",
    colors: ["#ffffff", "#f5f5f5", "#e8e8e8"],
    description: "Premium white sole with advanced cushioning technology. Provides excellent comfort and support.",
    stockCount: 50,
    inStock: true,
    isLatest: true,
    createdAt: new Date("2024-01-19"),
  },
  {
    id: "light-green-sole",
    name: "Light Green Sole",
    price: 820,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-green-sole-pOkhpyYrjqgAH9KmWiDElEpd5N4Eeu.png",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-green-sole-pOkhpyYrjqgAH9KmWiDElEpd5N4Eeu.png",
    ],
    type: "lower" as const,
    color: "Light Green",
    category: "lower",
    bgColor: "#84cc16",
    colors: ["#84cc16", "#a3e635", "#bef264"],
    description:
      "Eco-friendly light green sole made from sustainable materials. Perfect for environmentally conscious customers.",
    stockCount: 38,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-11"),
  },
  {
    id: "ochre-sole",
    name: "Ochre Sole",
    price: 900,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ochre-sole-gZElMfw1fH9SF4fmsJThdbDHyqQkkW.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ochre-sole-gZElMfw1fH9SF4fmsJThdbDHyqQkkW.png"],
    type: "lower" as const,
    color: "Ochre",
    category: "lower",
    bgColor: "#d97706",
    colors: ["#d97706", "#f59e0b", "#fbbf24"],
    description: "Unique ochre-colored sole with distinctive texture. Offers superior grip and durability.",
    stockCount: 26,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-09"),
  },
  {
    id: "yellow-sole",
    name: "Performance Sole",
    price: 599,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r1-pfN1cROlc5ZPxcwg9YySAz9NedgzzD.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r1-pfN1cROlc5ZPxcwg9YySAz9NedgzzD.png"],
    type: "lower" as const,
    color: "Yellow",
    category: "lower",
    bgColor: "#eab308",
    colors: ["#eab308", "#facc15", "#fde047"],
    description: "High-performance yellow sole designed for athletes. Features advanced shock absorption technology.",
    stockCount: 42,
    inStock: true,
    isLatest: true,
    createdAt: new Date("2024-01-21"),
  },
  {
    id: "blue-sole",
    name: "Comfort Sole",
    price: 549,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r2-gNE5T0hxnYKFcJXZlD5tl16lOBqTNQ.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r2-gNE5T0hxnYKFcJXZlD5tl16lOBqTNQ.png"],
    type: "lower" as const,
    color: "Blue",
    category: "lower",
    bgColor: "#3b82f6",
    colors: ["#3b82f6", "#60a5fa", "#93c5fd"],
    description: "Ultra-comfortable blue sole with memory foam technology. Perfect for all-day wear.",
    stockCount: 33,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-13"),
  },
  {
    id: "black-sole",
    name: "Premium Sole",
    price: 649,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r5-vM584TnyMQDFuDkasZhbRoZhISZwDy.png",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r5-vM584TnyMQDFuDkasZhbRoZhISZwDy.png"],
    type: "lower" as const,
    color: "Black",
    category: "lower",
    bgColor: "#000000",
    colors: ["#000000", "#374151", "#6b7280"],
    description: "Premium black sole with luxury finish. Combines elegance with superior performance.",
    stockCount: 29,
    inStock: true,
    isLatest: false,
    createdAt: new Date("2024-01-07"),
  },
]

// Universal shoe sizes
export const universalSizes = ["6", "7", "8", "9", "10", "11", "12", "13", "14"]

// Helper function to update stock when order is placed
export function updateProductStock(productId: string, quantity = 1): boolean {
  const product = allProducts.find((p) => p.id === productId)
  if (product && product.stockCount >= quantity) {
    product.stockCount -= quantity
    product.inStock = product.stockCount > 0
    return true
  }
  return false
}

// Helper function to get latest products
export function getLatestProducts(): Product[] {
  return allProducts
    .filter((product) => product.isLatest)
    .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
}

// TODO: Replace with API functions
export async function getAllProducts(): Promise<Product[]> {
  // TODO: Replace with actual API call
  // const response = await fetch("/api/products")
  // return response.json()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return allProducts
}

export async function getProductsByCategory(category: "complete" | "upper" | "lower" | "sole"): Promise<Product[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/products?category=${category}`)
  // return response.json()

  await new Promise((resolve) => setTimeout(resolve, 300))
  return allProducts.filter((product) => product.category === category)
}

export async function getProductById(id: string): Promise<Product | null> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/products/${id}`)
  // if (!response.ok) return null
  // return response.json()

  await new Promise((resolve) => setTimeout(resolve, 200))
  return allProducts.find((product) => product.id === id) || null
}

export async function searchProducts(query: string): Promise<Product[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
  // return response.json()

  await new Promise((resolve) => setTimeout(resolve, 400))
  const lowercaseQuery = query.toLowerCase()
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.color.toLowerCase().includes(lowercaseQuery),
  )
}

export async function getProductsByPriceRange(min: number, max: number): Promise<Product[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/products?minPrice=${min}&maxPrice=${max}`)
  // return response.json()

  await new Promise((resolve) => setTimeout(resolve, 300))
  return allProducts.filter((product) => product.price >= min && product.price <= max)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // TODO: Replace with actual API call
  // const response = await fetch("/api/products/featured")
  // return response.json()

  await new Promise((resolve) => setTimeout(resolve, 300))
  return allProducts.filter((product) => product.rating && product.rating >= 4.5).slice(0, 4)
}

export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
  // TODO: Replace with actual API call
  // const response = await fetch("/api/products", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(product),
  // })
  // return response.json()

  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}`,
    createdAt: new Date(),
    isLatest: true,
  }

  allProducts.unshift(newProduct) // Add to beginning for latest
  console.log("TODO: Add new product:", newProduct)
  return newProduct
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/products/${id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(updates),
  // })
  // return response.json()

  const productIndex = allProducts.findIndex((p) => p.id === id)
  if (productIndex !== -1) {
    allProducts[productIndex] = { ...allProducts[productIndex], ...updates }
    return allProducts[productIndex]
  }
  return null
}

export async function deleteProduct(id: string): Promise<boolean> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/products/${id}`, {
  //   method: "DELETE",
  // })
  // return response.ok

  const productIndex = allProducts.findIndex((p) => p.id === id)
  if (productIndex !== -1) {
    allProducts.splice(productIndex, 1)
    return true
  }
  return false
}
