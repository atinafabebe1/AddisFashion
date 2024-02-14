'use client'
import React, { useState } from 'react';
import { useCart } from '@/context/cartContext';
import CustomButton from '../CustomButton';
import Image from 'next/image';

const Checkout: React.FC = () => {
  const { cartItems } = useCart();
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryAddressChange = (field: string, value: string) => {
    setDeliveryAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryMethod(value);
  };

  const calculateTotalPrice = (): number => {
    return cartItems.reduce(
      (total, { price, quantity }) => total + parseFloat(price) * quantity,
      0
    );
  };

  const handleCheckout = () => {
    // Implement your checkout logic using the collected information
    console.log('Proceeding with checkout...');
    console.log('Contact Information:', contactInfo);
    console.log('Delivery Address:', deliveryAddress);
    console.log('Delivery Method:', deliveryMethod);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between bg-white p-8 rounded-md shadow-md">
        {/* Checkout Information */}
        <div className="w-2/3">
          <h1 className="font-bold text-md mb-6 text-gray-500 text-center">Checkout</h1>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-xl font-extrabold mb-4 text-black uppercase">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 focus:outline-none"
                value={contactInfo.firstName}
                onChange={(e) => handleContactInfoChange('firstName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 focus:outline-none"
                value={contactInfo.lastName}
                onChange={(e) => handleContactInfoChange('lastName', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 focus:outline-none"
                value={contactInfo.email}
                onChange={(e) => handleContactInfoChange('email', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="border p-2 focus:outline-none"
                value={contactInfo.phone}
                onChange={(e) => handleContactInfoChange('phone', e.target.value)}
              />
            </div>
          </section>

          {/* Delivery Address */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Delivery Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Street"
                className="border p-2 focus:outline-none"
                value={deliveryAddress.street}
                onChange={(e) => handleDeliveryAddressChange('street', e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 focus:outline-none"
                value={deliveryAddress.city}
                onChange={(e) => handleDeliveryAddressChange('city', e.target.value)}
              />
              <input
                type="text"
                placeholder="State"
                className="border p-2 focus:outline-none"
                value={deliveryAddress.state}
                onChange={(e) => handleDeliveryAddressChange('state', e.target.value)}
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="border p-2 focus:outline-none"
                value={deliveryAddress.zipCode}
                onChange={(e) => handleDeliveryAddressChange('zipCode', e.target.value)}
              />
            </div>
          </section>

          {/* Additional Fields */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Additional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Add more input fields as needed */}
            </div>
          </section>

          {/* Delivery Method */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Delivery Method</h2>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  value="standard"
                  checked={deliveryMethod === 'standard'}
                  onChange={() => handleDeliveryMethodChange('standard')}
                />
                Standard
              </label>
              <label>
                <input
                  type="radio"
                  value="express"
                  checked={deliveryMethod === 'express'}
                  onChange={() => handleDeliveryMethodChange('express')}
                />
                Express
              </label>
            </div>
          </section>
        </div>

        {/* Cart Summary */}
        <div className="w-1/3 ml-8 p-6">
          <ul className="space-y-4">
            {cartItems.map(({ id, name, price, quantity, image }) => (
              <li key={id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={image}
                      alt={name}
                      width={100}
                      height={100}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <span className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 rounded-full">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">{name}</p>
                    <p className="text-gray-500">Price: ${price}</p>
                    <p className="text-gray-500">Total: ${(parseInt(price) * quantity).toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-xl font-bold text-gray-800">
              Total: ${calculateTotalPrice().toFixed(2)}
            </p>
            <p className="text-gray-600">Free Shipping!</p>
          </div>
        </div>
      </div>
      {/* Checkout Button */}
      <div className="mt-8 flex justify-end">
        <CustomButton
          title="Place Order"
          containerStyles="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-700"
          handleClick={handleCheckout}
          btnType="button"
        />
      </div>
    </div>
  );
};

export default Checkout;
