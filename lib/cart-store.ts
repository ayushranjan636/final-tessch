// Comment out all API calls and add comprehensive backend integration notes

"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "sonner"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
  type?: "upper" | "lower" | "complete"
  customization?: {
    upperId?: string
    soleId?: string
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  promoCode: string | null
  discount: number
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
  setIsOpen: (open: boolean) => void
  applyPromoCode: (code: string) => Promise<boolean>
  removePromoCode: () => void
  syncWithBackend: () => Promise<void>
  moveToWishlist: (id: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      discount: 0,

      addItem: async (newItem) => {
        const items = get().items
        const existingItem = items.find(
          (item) =>
            item.id === newItem.id &&
            item.size === newItem.size &&
            item.color === newItem.color &&
            JSON.stringify(item.customization) === JSON.stringify(newItem.customization),
        )

        if (existingItem) {
          // TODO: API call to update cart item quantity on server
          /*
          try {
            await fetch("/api/cart/update", {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
              },
              body: JSON.stringify({
                itemId: existingItem.id,
                size: existingItem.size,
                color: existingItem.color,
                customization: existingItem.customization,
                quantity: existingItem.quantity + 1,
              }),
            })
          } catch (error) {
            console.error('Failed to update cart item on server:', error)
            toast.error('Failed to update cart')
            return
          }
          */

          set({
            items: items.map((item) => (item === existingItem ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          // TODO: API call to add new item to cart on server
          /*
          try {
            await fetch("/api/cart/add", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
              },
              body: JSON.stringify({ ...newItem, quantity: 1 }),
            })
          } catch (error) {
            console.error('Failed to add item to cart on server:', error)
            toast.error('Failed to add item to cart')
            return
          }
          */

          set({
            items: [...items, { ...newItem, quantity: 1 }],
          })
        }

        toast.success(`${newItem.name} added to cart`)

        // TODO: Sync with backend after successful local update
        // get().syncWithBackend()
      },

      removeItem: async (id) => {
        // TODO: API call to remove item from cart on server
        /*
        try {
          await fetch("/api/cart/remove", {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ itemId: id }),
          })
        } catch (error) {
          console.error('Failed to remove item from server cart:', error)
          toast.error('Failed to remove item')
          return
        }
        */

        set({
          items: get().items.filter((item) => item.id !== id),
        })

        toast.success("Item removed from cart")

        // TODO: Sync with backend after successful local update
        // get().syncWithBackend()
      },

      moveToWishlist: async (id: string) => {
        const item = get().items.find(item => item.id === id)
        if (!item) return

        // TODO: API call to move item to wishlist on server
        /*
        try {
          await fetch("/api/cart/move-to-wishlist", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ itemId: id }),
          })
        } catch (error) {
          console.error('Failed to move item to wishlist on server:', error)
          toast.error('Failed to move item to wishlist')
          return
        }
        */

        // Remove from cart
        set({
          items: get().items.filter((cartItem) => cartItem.id !== id),
        })

        toast.success(`${item.name} moved to waitlist`)

        // TODO: Sync with backend after successful local update
        // get().syncWithBackend()
      },

      updateQuantity: async (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        // TODO: API call to update item quantity on server
        /*
        try {
          await fetch("/api/cart/update", {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ itemId: id, quantity }),
          })
        } catch (error) {
          console.error('Failed to update quantity on server:', error)
          toast.error('Failed to update quantity')
          return
        }
        */

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })

        // TODO: Sync with backend after successful local update
        // get().syncWithBackend()
      },

      clearCart: async () => {
        // TODO: API call to clear cart on server
        /*
        try {
          await fetch("/api/cart/clear", { 
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${getAuthToken()}`
            }
          })
        } catch (error) {
          console.error('Failed to clear cart on server:', error)
          toast.error('Failed to clear cart')
          return
        }
        */

        set({ items: [], promoCode: null, discount: 0 })
        toast.success("Cart cleared")

        // TODO: Sync with backend after successful local update
        // get().syncWithBackend()
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal()
        const discount = get().discount
        return Math.max(0, subtotal - discount)
      },

      setIsOpen: (open) => {
        set({ isOpen: open })
      },

      applyPromoCode: async (code: string) => {
        // TODO: Replace with actual API call to validate promo code
        /*
        try {
          const response = await fetch('/api/cart/promo', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ 
              code, 
              cartTotal: get().getSubtotal(),
              items: get().items 
            })
          })
          
          const result = await response.json()
          
          if (result.success) {
            set({ 
              promoCode: code.toUpperCase(), 
              discount: result.data.discountAmount 
            })
            toast.success(result.data.message)
            return true
          } else {
            toast.error(result.error || 'Invalid promo code')
            return false
          }
        } catch (error) {
          console.error('Failed to apply promo code:', error)
          toast.error('Failed to apply promo code')
          return false
        }
        */

        // Mock validation for demo purposes
        const validCodes = {
          SAVE10: { discount: 0.1, message: "10% discount applied!" },
          WELCOME20: { discount: 0.2, message: "20% welcome discount applied!" },
          STUDENT15: { discount: 0.15, message: "15% student discount applied!" },
          FIRST50: { discount: 50, message: "₹50 off applied!" },
        }

        const promo = validCodes[code.toUpperCase() as keyof typeof validCodes]
        if (promo) {
          const subtotal = get().getSubtotal()
          const discountAmount = promo.discount < 1 ? subtotal * promo.discount : promo.discount

          set({
            promoCode: code.toUpperCase(),
            discount: discountAmount,
          })
          toast.success(promo.message)
          return true
        } else {
          toast.error("Invalid promo code")
          return false
        }
      },

      removePromoCode: () => {
        set({ promoCode: null, discount: 0 })
        toast.success("Promo code removed")
      },

      syncWithBackend: async () => {
        // TODO: Replace with actual API call to sync cart with backend
        /*
        const items = get().items

        try {
          const token = getAuthToken()
          if (!token) {
            // For guest users, store cart in session/localStorage only
            console.log('Guest user - cart stored locally only')
            return
          }

          // Sync cart items with backend for authenticated users
          await fetch('/api/cart/sync', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              items,
              promoCode: get().promoCode,
              discount: get().discount
            })
          })

          console.log('Cart synced with backend successfully')
        } catch (error) {
          console.error("Failed to sync cart with backend:", error)
          // Don't show error to user for sync failures
        }
        */

        console.log("TODO: Sync cart with backend:", {
          items: get().items,
          promoCode: get().promoCode,
          discount: get().discount,
        })
      },
    }),
    {
      name: "cart-storage",
      // TODO: Consider moving cart storage to backend for authenticated users
      // For now, we persist in localStorage for guest users
      // When user logs in, merge localStorage cart with backend cart
    },
  ),
)

// ===================================================================
// BACKEND INTEGRATION FUNCTIONS - CURRENTLY COMMENTED OUT
// TODO: Implement these when backend is ready
// ===================================================================

// Load cart from backend when user logs in
export async function loadCartFromBackend(): Promise<CartItem[]> {
  // TODO: Replace with actual API call
  /*
  try {
    const token = getAuthToken()
    if (!token) return []

    const response = await fetch('/api/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (!response.ok) {
      console.error('Failed to load cart from backend')
      return []
    }
    
    const data = await response.json()
    return data.data.items || []
  } catch (error) {
    console.error('Error loading cart from backend:', error)
    return []
  }
  */

  console.log("TODO: Load cart from backend")
  return []
}

// Merge guest cart with user cart when logging in
export async function mergeGuestCartWithUserCart(guestItems: CartItem[]): Promise<CartItem[]> {
  // TODO: Replace with actual API call
  /*
  try {
    const token = getAuthToken()
    if (!token) return guestItems

    const response = await fetch('/api/cart/merge', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guestItems })
    })
    
    if (!response.ok) {
      console.error('Failed to merge guest cart')
      return guestItems
    }
    
    const data = await response.json()
    return data.data.items || guestItems
  } catch (error) {
    console.error('Error merging guest cart:', error)
    return guestItems
  }
  */

  console.log("TODO: Merge guest cart with user cart:", guestItems)
  return guestItems
}

// Calculate shipping cost based on address and cart items
export async function calculateShipping(address: any): Promise<{ cost: number; methods: any[] }> {
  // TODO: Replace with actual API call
  /*
  try {
    const response = await fetch('/api/cart/shipping', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ 
        address, 
        items: useCartStore.getState().items 
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to calculate shipping')
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error calculating shipping:', error)
    throw error
  }
  */

  console.log("TODO: Calculate shipping for address:", address)

  // Mock shipping calculation
  return {
    cost: 99, // ₹99 flat rate
    methods: [
      { id: "standard", name: "Standard Delivery", cost: 99, days: "5-7" },
      { id: "express", name: "Express Delivery", cost: 199, days: "2-3" },
      { id: "overnight", name: "Overnight Delivery", cost: 399, days: "1" },
    ],
  }
}

// Validate promo code
export async function validatePromoCode(
  code: string,
  cartTotal: number,
): Promise<{
  valid: boolean
  discount: number
  message: string
  type: "percentage" | "fixed"
}> {
  // TODO: Replace with actual API call
  /*
  try {
    const response = await fetch('/api/cart/promo/validate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ code, cartTotal })
    })
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error validating promo code:', error)
    return { valid: false, discount: 0, message: 'Failed to validate code', type: 'fixed' }
  }
  */

  console.log("TODO: Validate promo code:", { code, cartTotal })

  // Mock promo code validation
  const validCodes = {
    SAVE10: { discount: 0.1, message: "10% discount applied!", type: "percentage" as const },
    WELCOME20: { discount: 0.2, message: "20% welcome discount applied!", type: "percentage" as const },
    STUDENT15: { discount: 0.15, message: "15% student discount applied!", type: "percentage" as const },
    FIRST50: { discount: 50, message: "₹50 off applied!", type: "fixed" as const },
  }

  const promo = validCodes[code.toUpperCase() as keyof typeof validCodes]
  if (promo) {
    return { valid: true, ...promo }
  }

  return { valid: false, discount: 0, message: "Invalid promo code", type: "fixed" }
}

// Helper function to get auth token (implement based on your auth system)
function getAuthToken(): string | null {
  // TODO: Implement based on your authentication system
  // This could be from localStorage, cookies, or auth context
  /*
  try {
    return localStorage.getItem('authToken') || 
           document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1] ||
           null
  } catch {
    return null
  }
  */

  return null // Mock - no auth token for demo
}

/*
BACKEND CART API REQUIREMENTS:

1. GET /api/cart
   - Get user's cart items
   - Include promo codes and discounts
   - Return: { items: CartItem[], promoCode: string, discount: number }

2. POST /api/cart/add
   - Add item to cart
   - Handle duplicate items (same product, size, color)
   - Update stock count
   - Body: { productId, quantity, size, color, customization }

3. PUT /api/cart/update
   - Update item quantity
   - Validate stock availability
   - Body: { itemId, quantity }

4. DELETE /api/cart/remove
   - Remove specific item from cart
   - Body: { itemId }

5. DELETE /api/cart/clear
   - Clear entire cart
   - Remove associated promo codes

6. POST /api/cart/sync
   - Sync local cart with server cart
   - Merge items intelligently
   - Body: { items: CartItem[], promoCode, discount }

7. POST /api/cart/merge
   - Merge guest cart with user cart on login
   - Handle duplicate items
   - Body: { guestItems: CartItem[] }

8. POST /api/cart/promo
   - Apply promo code to cart
   - Validate code and calculate discount
   - Body: { code, cartTotal, items }

9. POST /api/cart/shipping
   - Calculate shipping cost
   - Based on address and cart items
   - Body: { address, items }

REAL-TIME FEATURES:
- WebSocket updates for stock changes
- Real-time cart sync across devices
- Live promo code validation
- Instant shipping calculations
*/
