'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image:string
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateCartItem: (updatedItem: CartItem) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    console.log(item)
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const updateCartItem = (updatedItem: CartItem) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === updatedItem.id ? { ...cartItem, quantity: updatedItem.quantity } : cartItem
      )
    );
  };

  const contextValue: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
