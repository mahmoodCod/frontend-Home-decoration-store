"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface Address {
  id: string
  title: string
  fullName: string
  phone: string
  province: string
  city: string
  postalCode: string
  fullAddress: string
  isDefault: boolean
}

interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface User {
  phone: string
  name?: string
  email?: string
  address?: string
  addresses?: Address[]
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  user: User | null
  login: (phone: string) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  favorites: FavoriteItem[]
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (id: string) => void
  isFavorite: (id: string) => boolean
  addAddress: (address: Omit<Address, "id">) => void
  removeAddress: (id: string) => void
  updateAddress: (id: string, address: Partial<Address>) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart, user, and favorites from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedUser = localStorage.getItem("user")
    const savedFavorites = localStorage.getItem("favorites")

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse user from localStorage", e)
      }
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e)
      }
    }

    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isInitialized])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }, [user, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isInitialized])

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const login = (phone: string) => {
    setUser({ phone, addresses: [] })
  }

  const logout = () => {
    setUser(null)
    clearCart()
  }

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null))
  }

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    }
    setUser((prev) => {
      if (!prev) return null
      const addresses = prev.addresses || []
      // اگر این اولین آدرس است، به عنوان پیش‌فرض تنظیم شود
      if (addresses.length === 0) {
        newAddress.isDefault = true
      }
      return {
        ...prev,
        addresses: [...addresses, newAddress],
      }
    })
  }

  const removeAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        addresses: (prev.addresses || []).filter((addr) => addr.id !== id),
      }
    })
  }

  const updateAddress = (id: string, address: Partial<Address>) => {
    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        addresses: (prev.addresses || []).map((addr) => (addr.id === id ? { ...addr, ...address } : addr)),
      }
    })
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        user,
        login,
        logout,
        updateUser,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addAddress,
        removeAddress,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
