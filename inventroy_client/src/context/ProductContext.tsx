'use client'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

type Product = {
  id: string
  name: string
  price: number
}

type CartData = {
  product: Product
  quantity: number
}

const defaultcartData: CartData[] = []

const ProductContext = createContext<{
  setCart: (product: Product) => void
  cartData: CartData[]
  setCartData: Dispatch<SetStateAction<CartData[]>>
} | null>(null)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<CartData[]>(defaultcartData)

  const setCart = (product: Product) => {
    setCartData((prevCartData) => [...prevCartData, { product, quantity: 1 }])
  }

  const value = {
    setCart,
    cartData,
    setCartData,
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}
