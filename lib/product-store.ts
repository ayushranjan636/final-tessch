// Create a new product store with real-time synchronization capabilities

"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/all-products-data"
import { allProducts } from "@/lib/all-products-data"

interface ProductStore {
  products: Product[]
  loading: boolean
  lastUpdated: Date
  filters: {
    category?: string
    priceRange?: [number, number]
    search?: string
    sortBy?: "name" | "price-low" | "price-high" | "rating" | "latest" | "best-sellers"
  }

  // Actions
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  updateStock: (id: string, quantity: number) => void
  setLoading: (loading: boolean) => void
  setFilters: (filters: Partial<ProductStore["filters"]>) => void

  // Getters
  getProductById: (id: string) => Product | undefined
  getFilteredProducts: () => Product[]
  getBestSellers: () => Product[]
  getLatestProducts: () => Product[]
  getLowStockProducts: () => Product[]

  // Backend sync
  syncWithBackend: () => Promise<void>
  loadFromBackend: () => Promise<void>
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: allProducts,
      loading: false,
      lastUpdated: new Date(),
      filters: {},

      setProducts: (products) => {
        set({ products, lastUpdated: new Date() })
      },

      addProduct: (product) => {
        // TODO: API call to create product on server
        /*
        try {
          await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(product)
          })
        } catch (error) {
          console.error('Failed to create product on server:', error)
          return
        }
        */

        set((state) => ({
          products: [product, ...state.products],
          lastUpdated: new Date(),
        }))

        // TODO: Sync with backend
        // get().syncWithBackend()
      },

      updateProduct: (id, updates) => {
        // TODO: API call to update product on server
        /*
        try {
          await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(updates)
          })
        } catch (error) {
          console.error('Failed to update product on server:', error)
          return
        }
        */

        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates, updatedAt: new Date() } : product,
          ),
          lastUpdated: new Date(),
        }))

        // TODO: Sync with backend
        // get().syncWithBackend()
      },

      deleteProduct: (id) => {
        // TODO: API call to delete product on server
        /*
        try {
          await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${getAuthToken()}`
            }
          })
        } catch (error) {
          console.error('Failed to delete product on server:', error)
          return
        }
        */

        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          lastUpdated: new Date(),
        }))

        // TODO: Sync with backend
        // get().syncWithBackend()
      },

      updateStock: (id, quantity) => {
        // TODO: API call to update stock on server
        /*
        try {
          await fetch(`/api/products/${id}/stock`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ quantity })
          })
        } catch (error) {
          console.error('Failed to update stock on server:', error)
          return
        }
        */

        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? {
                  ...product,
                  stockCount: Math.max(0, product.stockCount - quantity),
                  inStock: product.stockCount - quantity > 0,
                  updatedAt: new Date(),
                }
              : product,
          ),
          lastUpdated: new Date(),
        }))

        console.log(`TODO: Update stock for product ${id}, quantity: ${quantity}`)
      },

      setLoading: (loading) => {
        set({ loading })
      },

      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }))
      },

      getProductById: (id) => {
        return get().products.find((product) => product.id === id)
      },

      getFilteredProducts: () => {
        const { products, filters } = get()
        let filtered = [...products]

        // Category filter
        if (filters.category) {
          filtered = filtered.filter((product) => product.category === filters.category)
        }

        // Price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange
          filtered = filtered.filter((product) => product.price >= min && product.price <= max)
        }

        // Search filter
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          filtered = filtered.filter(
            (product) =>
              product.name.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm) ||
              product.color?.toLowerCase().includes(searchTerm),
          )
        }

        // Sort products
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case "name":
              filtered.sort((a, b) => a.name.localeCompare(b.name))
              break
            case "price-low":
              filtered.sort((a, b) => a.price - b.price)
              break
            case "price-high":
              filtered.sort((a, b) => b.price - a.price)
              break
            case "rating":
              filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
              break
            case "latest":
              filtered.sort((a, b) => {
                if (a.isLatest && !b.isLatest) return -1
                if (!a.isLatest && b.isLatest) return 1
                return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
              })
              break
            case "best-sellers":
              filtered.sort((a, b) => (b.rating || 0) * (b.reviews || 0) - (a.rating || 0) * (a.reviews || 0))
              break
          }
        }

        return filtered
      },

      getBestSellers: () => {
        const products = get().products
        return products
          .filter((product) => product.rating && product.rating >= 4.0)
          .sort((a, b) => (b.rating || 0) * (b.reviews || 0) - (a.rating || 0) * (a.reviews || 0))
          .slice(0, 10)
      },

      getLatestProducts: () => {
        const products = get().products
        return products
          .filter((product) => product.isLatest)
          .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      },

      getLowStockProducts: () => {
        const products = get().products
        return products.filter((product) => product.stockCount < 10)
      },

      syncWithBackend: async () => {
        // TODO: Replace with actual API call to sync products with backend
        /*
        try {
          const token = getAuthToken()
          if (!token) return

          const products = get().products

          await fetch('/api/products/sync', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ products })
          })

          console.log('Products synced with backend successfully')
        } catch (error) {
          console.error('Failed to sync products with backend:', error)
        }
        */

        console.log("TODO: Sync products with backend:", {
          productCount: get().products.length,
          lastUpdated: get().lastUpdated,
        })
      },

      loadFromBackend: async () => {
        // TODO: Replace with actual API call to load products from backend
        /*
        try {
          set({ loading: true })

          const response = await fetch('/api/products', {
            headers: {
              'Authorization': `Bearer ${getAuthToken()}`
            }
          })

          if (!response.ok) {
            throw new Error('Failed to load products')
          }

          const data = await response.json()
          set({ 
            products: data.data || [],
            lastUpdated: new Date(),
            loading: false
          })
        } catch (error) {
          console.error('Failed to load products from backend:', error)
          set({ loading: false })
        }
        */

        console.log("TODO: Load products from backend")
        set({ loading: false })
      },
    }),
    {
      name: "product-storage",
      // TODO: Consider not persisting products locally for real-time sync
      // Products should be loaded fresh from backend on app start
    },
  ),
)

// Helper function to get auth token
function getAuthToken(): string | null {
  // TODO: Implement based on your authentication system
  return null
}

/*
BACKEND PRODUCT API REQUIREMENTS:

1. GET /api/products
   - Get all products with filtering and pagination
   - Query params: category, minPrice, maxPrice, search, page, limit, sortBy
   - Return: { products: Product[], pagination: {...} }

2. GET /api/products/:id
   - Get single product by ID
   - Include related products
   - Return: { product: Product }

3. POST /api/products (Admin only)
   - Create new product
   - Handle image uploads
   - Body: Product data
   - Return: { product: Product }

4. PUT /api/products/:id (Admin only)
   - Update existing product
   - Handle image updates
   - Body: Partial product data
   - Return: { product: Product }

5. DELETE /api/products/:id (Admin only)
   - Delete product
   - Handle image cleanup
   - Return: { success: boolean }

6. PUT /api/products/:id/stock (Admin only)
   - Update product stock
   - Handle stock validation
   - Body: { quantity: number }
   - Return: { product: Product }

7. POST /api/products/sync (Admin only)
   - Sync products with client state
   - Handle bulk updates
   - Body: { products: Product[] }

8. GET /api/products/search
   - Search products with advanced filters
   - Full-text search capability
   - Query params: q, filters
   - Return: { products: Product[] }

REAL-TIME FEATURES:
- WebSocket updates for stock changes
- Real-time product updates across admin and client
- Live inventory management
- Instant product availability updates

DATABASE OPTIMIZATIONS:
- Indexes on category, price, name for fast filtering
- Full-text search indexes for product search
- Image optimization and CDN integration
- Stock tracking with audit logs
*/
