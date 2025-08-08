"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "sonner"

export interface WishlistItem {
  id: string
  name?: string
  price?: number
  totalPrice?: number
  image?: string
  upperImage?: string
  soleImage?: string
  upperName?: string
  soleName?: string
  upperColor?: string
  soleColor?: string
  upperPrice?: number
  solePrice?: number
  addedAt?: string
  type?: "upper" | "sole" | "complete"
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  moveToCart: (item: WishlistItem) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
  getTotalItems: () => number
  syncWithBackend: () => Promise<void>
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)
        
        if (!existingItem) {
          set({
            items: [...items, { ...item, addedAt: new Date().toISOString() }]
          })

          const itemName = item.name || `${item.upperColor || 'Custom'} + ${item.soleColor || 'Custom'}` || "Design"
          toast.success(`${itemName} saved to My Styles`)
        } else {
          toast.info("Design already saved")
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id)
        })

        toast.success("Style removed from My Styles")
      },

      moveToCart: (item) => {
        const items = get().items
        set({
          items: items.filter((i) => i.id !== item.id)
        })

        const itemName = item.name || `${item.upperColor || 'Custom'} + ${item.soleColor || 'Custom'}` || "Design"
        toast.success(`${itemName} ready to add to cart`)
        
        // TODO: Actually add to cart store
        // This would require importing useCartStore and calling addItem
        // But we can't do that here due to circular dependencies
        // Instead, this should be handled in the component
      },

      clearWishlist: () => {
        set({ items: [] })
        toast.success("All styles cleared")
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },

      getTotalItems: () => {
        return get().items.length
      },

      syncWithBackend: async () => {
        // TODO: Implement backend sync
        console.log("TODO: Sync wishlist with backend:", {
          items: get().items,
        })
      },
    }),
    {
      name: "tessch-wishlist",
      // Removed version to avoid migration issues
      // Added partialize to only persist items
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

// ===================================================================
// BACKEND INTEGRATION FUNCTIONS - CURRENTLY COMMENTED OUT
// TODO: Implement these when backend is ready
// ===================================================================

// Load wishlist from backend when user logs in
export async function loadWishlistFromBackend(): Promise<WishlistItem[]> {
  console.log("TODO: Load wishlist from backend")
  return []
}

// Add item to wishlist on backend
export async function addToWishlistBackend(productId: string): Promise<boolean> {
  console.log("TODO: Add to wishlist backend:", { productId })
  return true
}

// Remove item from wishlist on backend
export async function removeFromWishlistBackend(productId: string): Promise<boolean> {
  console.log("TODO: Remove from wishlist backend:", { productId })
  return true
}

// Get wishlist recommendations based on user's wishlist
export async function getWishlistRecommendations(): Promise<WishlistItem[]> {
  console.log("TODO: Get wishlist recommendations")
  return []
}

// Share wishlist with others
export async function shareWishlist(): Promise<{ shareUrl: string; shareCode: string }> {
  console.log("TODO: Share wishlist")
  return {
    shareUrl: "https://tessch.com/wishlist/shared/mock-code",
    shareCode: "mock-code",
  }
}

// Get shared wishlist by code
export async function getSharedWishlist(shareCode: string): Promise<{ items: WishlistItem[]; ownerName: string }> {
  console.log("TODO: Get shared wishlist:", { shareCode })
  return {
    items: [],
    ownerName: "Mock User",
  }
}

// Helper function to get auth token (implement based on your auth system)
function getAuthToken(): string | null {
  return null // Mock - no auth token for demo
}

/*
BACKEND WISHLIST API REQUIREMENTS:

1. GET /api/wishlist
   - Get user's wishlist items
   - Return: { items: WishlistItem[] }

2. POST /api/wishlist/add
   - Add product to wishlist
   - Prevent duplicates
   - Body: { productId }

3. DELETE /api/wishlist/remove
   - Remove product from wishlist
   - Body: { productId }

4. DELETE /api/wishlist/clear
   - Clear entire wishlist

5. POST /api/wishlist/sync
   - Sync local wishlist with server
   - Merge items intelligently
   - Body: { items: WishlistItem[] }

6. GET /api/wishlist/recommendations
   - Get product recommendations based on wishlist
   - Use ML/AI for better suggestions

7. POST /api/wishlist/share
   - Create shareable wishlist link
   - Generate unique share code
   - Return: { shareUrl, shareCode }

8. GET /api/wishlist/shared/:code
   - Get shared wishlist by code
   - Public endpoint (no auth required)
   - Return: { items, ownerName }

REAL-TIME FEATURES:
- WebSocket updates for shared wishlists
- Real-time stock updates for wishlist items
- Price drop notifications
- Back-in-stock alerts

DATABASE SCHEMA:
- wishlist_items table with user_id, product_id, added_at
- wishlist_shares table for shared wishlists
- Indexes on user_id and product_id for performance
*/
