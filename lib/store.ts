'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getCartCount: () => number
  formatCartMessage: () => string
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      },
      getCartCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0)
      },
      formatCartMessage: () => {
        const items = get().items
        const total = get().getTotalPrice()
        const lines = items.map((item) => `- ${item.name} x${item.quantity} : ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA`)
        return `Bonjour ! Je souhaite commander :%0A%0A${lines.join('%0A')}%0A%0ATOTAL : ${total.toLocaleString('fr-FR')} FCFA`
      },
    }),
    {
      name: 'cart-storage',
      storage: typeof window !== 'undefined' ? sessionStorage : undefined,
    }
  )
)
