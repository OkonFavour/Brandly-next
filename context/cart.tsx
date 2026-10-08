"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Service } from "@/lib/data"

export type CartItem = {
  key: string
  service: Service
  quantity: number
  option: string
}

type CartContextValue = {
  items: CartItem[]
  add: (service: Service, quantity: number, option: string) => void
  remove: (key: string) => void
  update: (key: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error("Cart is unavailable")
  return cart
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []
    try {
      return JSON.parse(localStorage.getItem("brandly-cart") || "[]")
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("brandly-cart", JSON.stringify(items))
  }, [items])

  const value: CartContextValue = {
    items,
    add(service, quantity, option) {
      const key = `${service.id}-${option}`
      setItems((current) => {
        const match = current.find((item) => item.key === key)
        return match
          ? current.map((item) =>
              item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
            )
          : [...current, { key, service, quantity, option }]
      })
    },
    remove(key) {
      setItems((current) => current.filter((item) => item.key !== key))
    },
    update(key, quantity) {
      setItems((current) =>
        current.map((item) =>
          item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item,
        ),
      )
    },
    clear() {
      setItems([])
    },
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
