import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface OrderItem {
  id: string
  name: string
  color: string
  price: number
  quantity: number
  size: string
  image: string
  type: "complete" | "upper" | "lower"
}

export interface Customer {
  name: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
}

export interface Order {
  id: string
  customer: Customer
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
  updatedAt: Date
}

interface OrderStore {
  orders: Order[]

  // Actions
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => string
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getOrderById: (id: string) => Order | undefined
  getTotalRevenue: () => number
  getRecentOrders: (limit?: number) => Order[]
  getOrdersByStatus: (status: Order["status"]) => Order[]
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))

        return orderId
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status, updatedAt: new Date() } : order,
          ),
        }))
      },

      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id)
      },

      getTotalRevenue: () => {
        return get().orders.reduce((total, order) => total + order.total, 0)
      },

      getRecentOrders: (limit = 10) => {
        return get()
          .orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, limit)
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter((order) => order.status === status)
      },
    }),
    {
      name: "tessch-orders",
      version: 1,
    },
  ),
)
