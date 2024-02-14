
'use client'

import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; 
import { CartItem, useCart } from '@/context/cartContext';
import Image from 'next/image';
import { useRouter } from '@/navigation';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItem } = useCart();
  const router = useRouter() 
  const handleRemoveFromCart = (item: CartItem) => {
    removeFromCart(item);
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    const updatedQuantity = item.quantity + 1;
    updateCartItem({ ...item, quantity: updatedQuantity });
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      updateCartItem({ ...item, quantity: updatedQuantity });
    }
  };
  const handleCheckoutClicked = () => {
      router.push('/checkout')
  };

  const calculateTotalPrice = (): number => {
    return cartItems.reduce(
      (total, { price, quantity }) => total + parseFloat(price) * quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Explore our products!</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map(({ id, name, price, quantity, image }) => (
              <li key={id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-4">
                  <Image
                    src={image}
                    alt={name}
                    width={100}
                    height={100}
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <p className="font-bold text-lg">{name}</p>
                    <p className="text-gray-500">${price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => handleDecreaseQuantity({ id, name, price, quantity, image })}
                    >
                      <FaMinus />
                    </button>
                    <p className="text-gray-700 text-2xl">{quantity}</p>
                    <button
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => handleIncreaseQuantity({ id, name, price, quantity, image })}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleRemoveFromCart({ id, name, price, quantity, image })}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-xl font-bold">
                Total: ${calculateTotalPrice().toFixed(2)}
              </p>
              <p className="text-gray-600">Free Shipping!</p>
            </div>
            
            <button 
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            onClick={() => handleCheckoutClicked()}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
